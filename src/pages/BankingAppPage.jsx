import iframeHtml from '../../pages/banking-app.html?raw';

const blob = new Blob([iframeHtml], { type: 'text/html' });
const blobUrl = URL.createObjectURL(blob);

export default function BankingAppPage() {
  return (
    <iframe
      src={blobUrl}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        background: '#06060e',
      }}
      title="NEXUS Bank"
    />
  );
}
