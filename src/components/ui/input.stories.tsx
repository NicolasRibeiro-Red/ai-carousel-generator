import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  args: {
    type: 'text',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Enter your email...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
};

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    defaultValue: 'Invalid value',
  },
};
