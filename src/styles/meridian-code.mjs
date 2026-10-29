/**
 * Code in Meridian: the syntax colours the atlas desktop gives Neovim (`meridian.syntax` in
 * ~/.dotfiles/lib/theme/default.nix), on the inset ground. Comments take text2 so they stay readable.
 */
const c = {
  inset: '#191d24',
  text: '#ece5d3',
  text2: '#a9a493',
  fill: '#bdb9a9',
  keyword: '#b69cf2',
  string: '#8ccf8a',
  function: '#79b3f0',
  type: '#56c7c2',
  constant: '#f0a060',
  special: '#e8917f',
};

export const meridianCode = {
  name: 'meridian',
  type: 'dark',
  colors: {
    'editor.background': c.inset,
    'editor.foreground': c.text,
  },
  tokenColors: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: c.text2, fontStyle: 'italic' } },
    { scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.control'], settings: { foreground: c.keyword } },
    { scope: ['keyword.operator', 'punctuation'], settings: { foreground: c.fill } },
    { scope: ['string', 'string.template', 'punctuation.definition.string'], settings: { foreground: c.string } },
    { scope: ['entity.name.function', 'support.function', 'meta.function-call entity.name.function'], settings: { foreground: c.function } },
    { scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class', 'entity.other.inherited-class'], settings: { foreground: c.type } },
    { scope: ['constant', 'constant.numeric', 'constant.language', 'support.constant', 'variable.other.constant'], settings: { foreground: c.constant } },
    { scope: ['variable.parameter', 'entity.other.attribute-name', 'meta.object-literal.key', 'support.type.property-name'], settings: { foreground: c.special } },
    { scope: ['variable', 'meta.definition.variable'], settings: { foreground: c.text } },
    { scope: ['punctuation.definition.template-expression', 'punctuation.section.embedded'], settings: { foreground: c.special } },
  ],
};
