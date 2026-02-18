import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ScientificReference } from '@/types';
import { ReferencesSection } from './references-section';

const meta = {
  title: 'Carousel/ReferencesSection',
  component: ReferencesSection,
} satisfies Meta<typeof ReferencesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleReferences: ScientificReference[] = [
  {
    id: 'ref-1',
    title: 'Effects of Mindfulness-Based Stress Reduction on Anxiety and Depression',
    authors: ['Hofmann, S.G.', 'Gomez, A.F.'],
    year: 2021,
    journal: 'Journal of Clinical Psychology',
    doi: '10.1002/jclp.23456',
    reliability: 'peer-reviewed',
    topics: ['mindfulness', 'anxiety', 'depression'],
    keyFindings: [
      'Reducao significativa nos niveis de ansiedade apos 8 semanas',
      'Melhora na qualidade do sono em 73% dos participantes',
    ],
  },
  {
    id: 'ref-2',
    title: 'Breathing Techniques for Stress Management: A Meta-Analysis',
    authors: ['Chen, Y.', 'Wang, L.', 'Zhang, M.'],
    year: 2022,
    journal: 'Psychological Bulletin',
    doi: '10.1037/bul0000389',
    reliability: 'meta-analysis',
    topics: ['breathing', 'stress management'],
    keyFindings: [
      'Tecnicas de respiracao demonstraram eficacia moderada a alta',
      'Respiracao diafragmatica apresentou melhores resultados',
    ],
  },
  {
    id: 'ref-3',
    title: 'Systematic Review of Workplace Wellness Programs',
    authors: ['Santos, R.', 'Oliveira, T.', 'Costa, P.', 'Lima, J.'],
    year: 2023,
    journal: 'Occupational Health Psychology',
    doi: '10.1080/occ.2023.1234',
    reliability: 'systematic-review',
    topics: ['workplace wellness', 'corporate health'],
    keyFindings: [
      'Programas de bem-estar reduziram absenteismo em 25%',
    ],
  },
];

export const Default: Story = {
  args: {
    references: sampleReferences,
  },
};

export const Empty: Story = {
  args: {
    references: [],
  },
};
