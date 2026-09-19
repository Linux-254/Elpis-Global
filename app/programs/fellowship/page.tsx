import { LevelLadderTemplate } from '../../../src/components/views/LevelLadderTemplate';

export const metadata = {
  title: 'Fellowship Programmes | Zoe Elpis Global School',
  description: 'Multi-month venture incubation, seed grant advisory, and residential immersion for vetted enterprise builders.'
};

export default function FellowshipLevelPage() {
  return (
    <LevelLadderTemplate
      levelSlug="fellowship"
      title="Fellowship"
      orderNumber={5}
      description="Competitive, highly selective 6 to 12-month cohort residencies for high-potential innovators scaling high-impact initiatives."
      competencyOutcome="Live operational venture or social initiative deployed with measurable beneficiary metrics, pilot revenue, and matched venture mentorship."
      targetAudience={[
        'Full-time enterprise founders',
        'Civic innovators & community changemakers',
        'Vetted ZEGS alumni scaling new initiatives'
      ]}
    />
  );
}
