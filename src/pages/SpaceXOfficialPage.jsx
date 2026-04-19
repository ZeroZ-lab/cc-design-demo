import source from '../../pages/spacex-official.html?raw';
import LegacyDocument from '../components/LegacyDocument';

export default function SpaceXOfficialPage() {
  return <LegacyDocument routeKey="spacex-official" source={source} />;
}
