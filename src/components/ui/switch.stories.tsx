import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Switch } from './switch';

const meta: Meta<typeof Switch> = {
  title: 'Atoms/Switch',
  component: Switch,
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
