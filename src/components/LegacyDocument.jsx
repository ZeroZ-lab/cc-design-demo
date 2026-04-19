import { useEffect, useMemo } from 'react';
import { parseLegacyDocument } from '../lib/legacyDocument';

export default function LegacyDocument({ routeKey, source, prependScripts = [] }) {
  const parsed = useMemo(() => parseLegacyDocument(source), [source]);

  useEffect(() => {
    let cancelled = false;
    const styleNodes = [];
    const scriptNodes = [];

    async function mount() {
      document.body.classList.add('legacy-page-body');

      parsed.styles.forEach((cssText, index) => {
        const node = document.createElement('style');
        node.dataset.legacyStyle = `${routeKey}-${index}`;
        node.textContent = cssText;
        document.head.appendChild(node);
        styleNodes.push(node);
      });

      for (const [index, code] of prependScripts.entries()) {
        const node = document.createElement('script');
        node.dataset.legacyScript = `${routeKey}-prepend-${index}`;
        node.textContent = code;
        document.body.appendChild(node);
        scriptNodes.push(node);
      }

      for (const [index, src] of parsed.externalScripts.entries()) {
        if (cancelled) return;

        await new Promise((resolve, reject) => {
          const node = document.createElement('script');
          node.dataset.legacyScript = `${routeKey}-external-${index}`;
          node.src = src;
          node.async = false;
          node.onload = resolve;
          node.onerror = reject;
          document.body.appendChild(node);
          scriptNodes.push(node);
        }).catch(() => {});
      }

      for (const [index, code] of parsed.inlineScripts.entries()) {
        if (cancelled) return;
        const node = document.createElement('script');
        node.dataset.legacyScript = `${routeKey}-inline-${index}`;
        node.textContent = code;
        document.body.appendChild(node);
        scriptNodes.push(node);
      }
    }

    mount();

    return () => {
      cancelled = true;
      document.body.classList.remove('legacy-page-body');
      scriptNodes.forEach((node) => node.remove());
      styleNodes.forEach((node) => node.remove());
    };
  }, [parsed.externalScripts, parsed.inlineScripts, parsed.styles, prependScripts, routeKey]);

  return <div className="legacy-document-host" dangerouslySetInnerHTML={{ __html: parsed.html }} />;
}
