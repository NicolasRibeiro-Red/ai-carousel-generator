import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
  component: Textarea,
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled textarea',
  },
};
