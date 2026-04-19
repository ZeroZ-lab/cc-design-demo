import aetherSource from '../../legacy/aether.html?raw';
import LegacyDocument from '../components/LegacyDocument';

export default function AetherPage() {
  return <LegacyDocument routeKey="aether" source={aetherSource} />;
}
