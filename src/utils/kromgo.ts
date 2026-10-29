/** A cluster readout from a kromgo badge endpoint, read at build time and set in the shell's grammar. */
export interface Readout {
  label: string;
  value: string;
  /** "ok" for a check that passes, "alert" for firing alerts; otherwise the value reports no state. */
  state?: 'ok' | 'alert';
  /** 0–100 for usage readouts, drawn as a level track. */
  level?: number;
}

interface KromgoBadge {
  id: string;
  value: string;
  result: number;
}

/** "228d" reads as "228 days". */
const spelled = (value: string) => value.replace(/^(\d+)d$/, (_, n) => `${n} ${n === '1' ? 'day' : 'days'}`);

/**
 * kromgo serves each badge as JSON with `?format=json`. It sends no CORS headers, so this runs at build time.
 * Returns null when any badge can't be read, so the page can fall back to the badge images.
 */
export async function getReadouts(badges: { src: string; alt: string }[]): Promise<Readout[] | null> {
  try {
    return await Promise.all(
      badges.map(async ({ src, alt }) => {
        const res = await fetch(`${src}?format=json`);
        if (!res.ok) throw new Error(`${src}: ${res.status}`);
        const badge = (await res.json()) as KromgoBadge;
        const readout: Readout = { label: alt, value: spelled(badge.value) };
        if (badge.value === 'up') readout.state = 'ok';
        if (badge.id.endsWith('_alert_count') && badge.result > 0) readout.state = 'alert';
        if (badge.id.endsWith('_usage')) readout.level = Math.max(0, Math.min(100, badge.result));
        return readout;
      }),
    );
  } catch {
    return null;
  }
}
