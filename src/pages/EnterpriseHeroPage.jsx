import source from '../../legacy/enterprise-hero.html?raw';
import LegacyDocument from '../components/LegacyDocument';

export default function EnterpriseHeroPage() {
  return <LegacyDocument routeKey="enterprise-hero" source={source} />;
}
