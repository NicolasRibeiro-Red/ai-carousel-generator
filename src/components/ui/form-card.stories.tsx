import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormCard } from './form-card';

const meta = {
  title: 'UI/FormCard',
  component: FormCard,
} satisfies Meta<typeof FormCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    padding: 'md',
    spacing: 'md',
    children: (
      <>
        <div>First section content</div>
        <div>Second section content</div>
        <div>Third section content</div>
      </>
    ),
  },
};

export const LargePadding: Story = {
  args: {
    padding: 'lg',
    spacing: 'lg',
    children: (
      <>
        <div>First section content</div>
        <div>Second section content</div>
        <div>Third section content</div>
      </>
    ),
  },
};

export const SmallPadding: Story = {
  args: {
    padding: 'sm',
    spacing: 'sm',
    children: (
      <>
        <div>First section content</div>
        <div>Second section content</div>
        <div>Third section content</div>
      </>
    ),
  },
};
