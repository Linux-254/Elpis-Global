import { LevelLadderTemplate } from '../../../src/components/views/LevelLadderTemplate';

export const metadata = {
  title: 'Professional Level Programmes | Zoe Elpis Global School',
  description: 'Applied practice, venture modeling, and management frameworks for active operators and startup founders.'
};

export default function ProfessionalLevelPage() {
  return (
    <LevelLadderTemplate
      levelSlug="professional"
      title="Professional"
      orderNumber={2}
      description="Applied functional mastery covering venture economics, customer acquisition, operational systems, and people leadership."
      competencyOutcome="Validated business plan, verified financial model, and operational execution playbook ready for live market testing."
      targetAudience={[
        'Early-stage startup founders',
        'Functional team leads and project managers',
        'Mid-level NGO and enterprise professionals'
      ]}
    />
  );
}
