import { LevelLadderTemplate } from '../../../src/components/views/LevelLadderTemplate';

export const metadata = {
  title: 'Foundation Level Programmes | Zoe Elpis Global School',
  description: 'Introductory and mindset-anchoring programmes designed for emerging leaders, students, and early-career changemakers.'
};

export default function FoundationLevelPage() {
  return (
    <LevelLadderTemplate
      levelSlug="foundation"
      title="Foundation"
      orderNumber={1}
      description="Foundational courses establishing life vision, core personal disciplines, ethical worldview, and foundational enterprise literacy."
      competencyOutcome="Clear articulation of personal purpose, ethical discernment, and ability to construct a practical 3-year life and career blueprint."
      targetAudience={[
        'University students & recent graduates',
        'Emerging community organizers',
        'Aspiring entrepreneurs seeking directional clarity'
      ]}
    />
  );
}
