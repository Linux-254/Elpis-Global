import { LevelLadderTemplate } from '../../../src/components/views/LevelLadderTemplate';

export const metadata = {
  title: 'Advanced Level Programmes | Zoe Elpis Global School',
  description: 'Specialized deep dives into institutional scaling, cross-border trade, and multi-stakeholder governance.'
};

export default function AdvancedLevelPage() {
  return (
    <LevelLadderTemplate
      levelSlug="advanced"
      title="Advanced"
      orderNumber={3}
      description="Rigorous strategic frameworks for enterprise expansion, corporate governance, capital allocation, and regional scaling."
      competencyOutcome="Multi-year institutional growth strategy, investment deck, and corporate governance charter defended before a panel of practitioners."
      targetAudience={[
        'Growing SME business owners',
        'Senior operational directors',
        'Social enterprise executives'
      ]}
    />
  );
}
