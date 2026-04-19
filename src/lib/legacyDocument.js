const STYLE_RE = /<style[^>]*>([\s\S]*?)<\/style>/gi;
const BODY_RE = /<body[^>]*>([\s\S]*?)<\/body>/i;
const SCRIPT_RE = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;

export function parseLegacyDocument(source) {
  const styles = [];
  const externalScripts = [];
  const inlineScripts = [];

  source.replace(STYLE_RE, (_, css) => {
    styles.push(css.trim());
    return '';
  });

  source.replace(SCRIPT_RE, (_, attrs = '', code = '') => {
    const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
    if (srcMatch) {
      externalScripts.push(srcMatch[1]);
    } else if (code.trim()) {
      inlineScripts.push(code.trim());
    }
    return '';
  });

  const bodyMatch = source.match(BODY_RE);
  const html = bodyMatch ? bodyMatch[1].replace(SCRIPT_RE, '').trim() : '';

  return {
    html,
    styles,
    externalScripts,
    inlineScripts
  };
}
