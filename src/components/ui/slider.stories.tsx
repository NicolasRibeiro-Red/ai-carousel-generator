import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Slider } from './slider';

const meta: Meta<typeof Slider> = {
  title: 'Atoms/Slider',
  component: Slider,
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 1,
  },
  decorators: [
    (Story) => (
      <div className="w-[300px] p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {};

export const Range: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>0</span>
        <span>100</span>
      </div>
      <Slider defaultValue={[25]} min={0} max={100} step={1} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: [40],
  },
};
