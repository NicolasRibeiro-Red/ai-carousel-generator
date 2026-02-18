import { render, screen } from '@testing-library/react';
import { Slider } from '@/components/ui/slider';

// Radix Slider uses ResizeObserver internally
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

describe('Slider', () => {
  it('renders with default value', () => {
    render(<Slider defaultValue={[50]} min={0} max={100} />);
    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
  });

  it('has correct aria attributes', () => {
    render(<Slider defaultValue={[30]} min={0} max={100} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
    expect(slider).toHaveAttribute('aria-valuenow', '30');
  });
});
