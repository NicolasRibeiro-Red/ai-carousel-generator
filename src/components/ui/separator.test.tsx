import { render, screen } from '@testing-library/react';
import { Separator } from '@/components/ui/separator';

describe('Separator', () => {
  it('renders as horizontal separator', () => {
    render(<Separator decorative={false} />);
    const separator = screen.getByRole('separator');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('renders with role="none" when decorative', () => {
    render(<Separator decorative={true} />);
    const separator = screen.getByRole('none');
    expect(separator).toBeInTheDocument();
  });
});
