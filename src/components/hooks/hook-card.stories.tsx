import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { HookCard } from './hook-card';

const meta = {
  title: 'Hooks/HookCard',
  component: HookCard,
  args: {
    onSelect: fn(),
  },
} satisfies Meta<typeof HookCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hook: 'Como usar respiracao para controlar ansiedade no trabalho',
    index: 1,
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    hook: 'Como usar respiracao para controlar ansiedade no trabalho',
    index: 1,
    isSelected: true,
  },
};

export const Disabled: Story = {
  args: {
    hook: 'Como usar respiracao para controlar ansiedade no trabalho',
    index: 1,
    isSelected: false,
    disabled: true,
  },
};
