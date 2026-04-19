import llmSource from '../../legacy/llm-sketch-ppt.html?raw';
import deckStageSource from '../../legacy/deck_stage.js?raw';
import LegacyDocument from '../components/LegacyDocument';

export default function LlmSketchPage() {
  return <LegacyDocument routeKey="llm-sketch-ppt" source={llmSource} prependScripts={[deckStageSource]} />;
}
