import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from '@/components/ui/switch';

describe('Switch', () => {
  it('renders in unchecked state', () => {
    render(<Switch />);
    const switchEl = screen.getByRole('switch');
    expect(switchEl).toBeInTheDocument();
    expect(switchEl).toHaveAttribute('data-state', 'unchecked');
  });

  it('toggles on click', async () => {
    const handleChange = vi.fn();
    render(<Switch onCheckedChange={handleChange} />);
    const switchEl = screen.getByRole('switch');
    await userEvent.click(switchEl);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('respects disabled state', async () => {
    const handleChange = vi.fn();
    render(<Switch disabled onCheckedChange={handleChange} />);
    const switchEl = screen.getByRole('switch');
    expect(switchEl).toBeDisabled();
    await userEvent.click(switchEl);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
