import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StatusBadge } from './status-badge';

const meta = {
  title: 'UI/StatusBadge',
  component: StatusBadge,
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: 'info',
    label: 'Revisado por Pares',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    label: 'Meta-analise',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    label: 'Revisao Sistematica',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    label: 'Erro encontrado',
  },
};

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    label: 'Rascunho',
  },
};

export const Small: Story = {
  args: {
    variant: 'info',
    size: 'sm',
    label: 'Small badge',
  },
};
