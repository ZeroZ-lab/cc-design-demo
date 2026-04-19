import source from '../../pages/mars-landing.html?raw';
import LegacyDocument from '../components/LegacyDocument';

export default function MarsLandingPage() {
  return <LegacyDocument routeKey="mars-landing" source={source} />;
}
