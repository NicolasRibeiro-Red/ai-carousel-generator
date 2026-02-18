import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { SelectableCard } from './selectable-card';

const meta = {
  title: 'UI/SelectableCard',
  component: SelectableCard,
  args: {
    onSelect: fn(),
  },
} satisfies Meta<typeof SelectableCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isSelected: false,
    index: 1,
    children: <p>Sample hook text</p>,
  },
};

export const Selected: Story = {
  args: {
    isSelected: true,
    index: 1,
    children: <p>Sample hook text</p>,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    index: 1,
    isSelected: false,
    children: <p>Sample hook text</p>,
  },
};

export const WithoutIndicator: Story = {
  args: {
    showIndicator: false,
    isSelected: false,
    children: <p>Sample hook text</p>,
  },
};
