import source from '../../legacy/sci-fi-website.html?raw';
import LegacyDocument from '../components/LegacyDocument';

export default function SciFiWebsitePage() {
  return <LegacyDocument routeKey="sci-fi-website" source={source} />;
}
