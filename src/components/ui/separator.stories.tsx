import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Separator } from './separator';

const meta: Meta<typeof Separator> = {
  title: 'Atoms/Separator',
  component: Separator,
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <p className="text-sm">Content above</p>
      <Separator orientation="horizontal" />
      <p className="text-sm">Content below</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-10 items-center gap-4">
      <span className="text-sm">Left</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Right</span>
    </div>
  ),
};
