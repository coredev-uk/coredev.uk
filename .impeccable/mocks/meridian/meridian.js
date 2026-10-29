// The day at Greenwich: sunrise, sunset and now on a 24-hour track, kept in UK time.
document.documentElement.classList.add('js');

const GREENWICH = { lat: 51.4769, lon: -0.0005 };
const ZONE = 'Europe/London';
const DAY_MS = 86400000;

const partsOf = (date, options) =>
  Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', { timeZone: ZONE, ...options })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  );

/** Minutes since midnight, UK time. */
function ukMinutes(date) {
  const p = partsOf(date, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  return Number(p.hour) * 60 + Number(p.minute);
}

const ukTime = (date) =>
  new Intl.DateTimeFormat('en-GB', { timeZone: ZONE, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(date);

const ukDayKey = (date) => {
  const p = partsOf(date, { year: 'numeric', month: '2-digit', day: '2-digit' });
  return `${p.year}-${p.month}-${p.day}`;
};

/** Sunrise and sunset for the UK calendar day containing `date` (SunCalc's method, -0.833° horizon). */
function sunTimes(date) {
  const p = partsOf(date, { year: 'numeric', month: '2-digit', day: '2-digit' });
  const noon = Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day), 12);
  const rad = Math.PI / 180;
  const J1970 = 2440588;
  const J2000 = 2451545;
  const J0 = 0.0009;
  const d = noon / DAY_MS - 0.5 + J1970 - J2000;
  const lw = rad * -GREENWICH.lon;
  const phi = rad * GREENWICH.lat;
  const n = Math.round(d - J0 - lw / (2 * Math.PI));
  const ds = J0 + lw / (2 * Math.PI) + n;
  const M = rad * (357.5291 + 0.98560028 * ds);
  const C = rad * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M));
  const L = M + C + rad * 102.9372 + Math.PI;
  const dec = Math.asin(Math.sin(rad * 23.4397) * Math.sin(L));
  const transit = (x) => J2000 + x + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L);
  const w = Math.acos((Math.sin(rad * -0.833) - Math.sin(phi) * Math.sin(dec)) / (Math.cos(phi) * Math.cos(dec)));
  const jNoon = transit(ds);
  const jSet = transit(J0 + (w + lw) / (2 * Math.PI) + n);
  const fromJulian = (j) => new Date((j + 0.5 - J1970) * DAY_MS);
  return { rise: fromJulian(jNoon - (jSet - jNoon)), set: fromJulian(jSet) };
}

const pct = (minutes) => ((minutes / 1440) * 100).toFixed(3);

function span(ms) {
  const total = Math.max(1, Math.round(ms / 60000));
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h ? `${h} h ${m} min` : `${m} min`;
}

function tick() {
  const now = new Date();
  const { rise, set } = sunTimes(now);
  const longDate = new Intl.DateTimeFormat('en-GB', { timeZone: ZONE, weekday: 'long', day: 'numeric', month: 'long' }).format(now);
  const shortDate = new Intl.DateTimeFormat('en-GB', { timeZone: ZONE, weekday: 'short', day: 'numeric', month: 'short' }).format(now);
  const zone = partsOf(now, { timeZoneName: 'short' }).timeZoneName;

  let next;
  if (now < rise) next = `Sunrise in ${span(rise - now)}`;
  else if (now < set) next = `Sunset in ${span(set - now)}`;
  else next = `Sunrise tomorrow at ${ukTime(sunTimes(new Date(now.getTime() + DAY_MS)).rise)}`;

  for (const arc of document.querySelectorAll('[data-arc]')) {
    arc.style.setProperty('--rise', pct(ukMinutes(rise)));
    arc.style.setProperty('--set', pct(ukMinutes(set)));
    arc.style.setProperty('--now', pct(ukMinutes(now)));
    const at = ukMinutes(now) / 1440;
    arc.dataset.nowEdge = at < 0.04 ? 'start' : at > 0.96 ? 'end' : '';
    arc.setAttribute(
      'aria-label',
      `${longDate} at Greenwich: sunrise ${ukTime(rise)}, sunset ${ukTime(set)}, now ${ukTime(now)} ${zone}.`,
    );
  }
  const set_ = (sel, text) => document.querySelectorAll(sel).forEach((el) => (el.textContent = text));
  set_('[data-rise]', ukTime(rise));
  set_('[data-set]', ukTime(set));
  set_('[data-now]', `${ukTime(now)} ${zone}`);
  set_('[data-clock-time]', ukTime(now));
  set_('[data-clock-date]', shortDate.replace(',', ''));
  set_('[data-long-date]', longDate.replace(',', ''));
  set_('[data-next]', next);
}

tick();
setTimeout(function every() {
  tick();
  setTimeout(every, 60000 - (Date.now() % 60000));
}, 60000 - (Date.now() % 60000));

// The newest public push for the line under the arc, and every push made today as ticks on it.
// Asked of GitHub at most once every ten minutes per browser, as on the live site.
const CACHE_KEY = 'meridian:pushes';
const CACHE_MS = 10 * 60 * 1000;

async function loadPushes() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) ?? 'null');
    if (cached && Date.now() - cached.fetchedAt < CACHE_MS) return cached;
  } catch {}
  const res = await fetch('https://api.github.com/users/coredev-uk/events/public?per_page=30');
  if (!res.ok) throw new Error(String(res.status));
  const events = (await res.json()).filter((e) => e.type === 'PushEvent' && e.payload.head);
  if (!events.length) throw new Error('no pushes');
  const latest = events[0];
  const commit = await fetch(`https://api.github.com/repos/${latest.repo.name}/commits/${latest.payload.head}`);
  if (!commit.ok) throw new Error(String(commit.status));
  const data = await commit.json();
  const result = {
    fetchedAt: Date.now(),
    times: events.map((e) => e.created_at),
    latest: {
      repo: latest.repo.name,
      at: latest.created_at,
      message: data.commit.message.split('\n')[0],
      url: data.html_url,
    },
  };
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(result));
  } catch {}
  return result;
}

function when(iso) {
  const at = new Date(iso);
  const today = ukDayKey(new Date());
  const yesterday = ukDayKey(new Date(Date.now() - DAY_MS));
  const day = ukDayKey(at);
  const prefix =
    day === today
      ? 'today'
      : day === yesterday
        ? 'yesterday'
        : `on ${new Intl.DateTimeFormat('en-GB', { timeZone: ZONE, day: 'numeric', month: 'long' }).format(at)}`;
  return `${prefix} at ${ukTime(at)}`;
}

loadPushes()
  .then(({ times, latest }) => {
    const line = document.querySelector('[data-push]');
    if (line) {
      const repo = Object.assign(document.createElement('a'), {
        className: 'text-link',
        href: `https://github.com/${latest.repo}`,
        textContent: latest.repo.split('/')[1],
      });
      const time = Object.assign(document.createElement('time'), { dateTime: latest.at, textContent: when(latest.at) });
      const message = Object.assign(document.createElement('a'), {
        className: 'text-link',
        href: latest.url,
        textContent: `“${latest.message}”`,
      });
      line.replaceChildren('Last pushed to ', repo, ' ', time, ': ', message);
    }

    const today = ukDayKey(new Date());
    const todays = times.filter((t) => ukDayKey(new Date(t)) === today);
    const ticks = document.querySelector('[data-arc-pushes]');
    if (ticks && todays.length) {
      ticks.replaceChildren(
        ...todays.map((t) => {
          const el = document.createElement('span');
          el.className = 'arc__push';
          el.style.left = `${pct(ukMinutes(new Date(t)))}%`;
          el.title = `A push at ${ukTime(new Date(t))}`;
          return el;
        }),
      );
      const key = document.querySelector('[data-push-key]');
      if (key) {
        key.hidden = false;
        key.querySelector('[data-push-count]').textContent =
          todays.length === 1 ? 'one push today' : `${todays.length} pushes today`;
      }
    }
  })
  .catch(() => {
    // GitHub didn't answer: the static line stays.
  });
