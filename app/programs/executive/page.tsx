import { LevelLadderTemplate } from '../../../src/components/views/LevelLadderTemplate';

export const metadata = {
  title: 'Executive Level Programmes | Zoe Elpis Global School',
  description: 'High-intensity masterclasses, boardroom retreats, and policy dialogues for senior leaders and directors.'
};

export default function ExecutiveLevelPage() {
  return (
    <LevelLadderTemplate
      levelSlug="executive"
      title="Executive"
      orderNumber={4}
      description="Immersive peer roundtables, case study defenses, and executive coaching on institutional ethics, crisis stewardship, and market transformation."
      competencyOutcome="Board-level policy audit, ethical risk resilience framework, and executive stewardship roadmap."
      targetAudience={[
        'CEOs, Managing Directors & C-Suite Executives',
        'Board Chairs and Non-Executive Directors',
        'Senior Public Sector and Institutional Leaders'
      ]}
    />
  );
}
