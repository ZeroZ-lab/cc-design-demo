import retroPixelSource from '../../legacy/retro-pixel.html?raw';
import LegacyDocument from '../components/LegacyDocument';

export default function RetroPixelPage() {
  return <LegacyDocument routeKey="retro-pixel" source={retroPixelSource} />;
}
