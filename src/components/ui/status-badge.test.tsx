import { render, screen } from '@testing-library/react';
import { StatusBadge } from '@/components/ui/status-badge';

describe('StatusBadge', () => {
  it('renders label text', () => {
    render(<StatusBadge label="Active" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('applies info variant classes', () => {
    render(<StatusBadge label="Info" variant="info" />);
    const badge = screen.getByText('Info');
    expect(badge.className).toContain('bg-info/10');
    expect(badge.className).toContain('text-info');
  });

  it('applies warning variant classes', () => {
    render(<StatusBadge label="Warning" variant="warning" />);
    const badge = screen.getByText('Warning');
    expect(badge.className).toContain('bg-warning-subtle');
    expect(badge.className).toContain('text-warning-subtle-foreground');
  });

  it('applies success variant classes', () => {
    render(<StatusBadge label="Success" variant="success" />);
    const badge = screen.getByText('Success');
    expect(badge.className).toContain('bg-success-subtle');
    expect(badge.className).toContain('text-success-subtle-foreground');
  });

  it('applies error variant classes', () => {
    render(<StatusBadge label="Error" variant="error" />);
    const badge = screen.getByText('Error');
    expect(badge.className).toContain('bg-error-subtle');
    expect(badge.className).toContain('text-error-subtle-foreground');
  });

  it('applies neutral variant classes', () => {
    render(<StatusBadge label="Neutral" variant="neutral" />);
    const badge = screen.getByText('Neutral');
    expect(badge.className).toContain('bg-muted');
    expect(badge.className).toContain('text-muted-foreground');
  });

  it('applies small size classes', () => {
    render(<StatusBadge label="Small" size="sm" />);
    const badge = screen.getByText('Small');
    expect(badge.className).toContain('px-1.5');
    expect(badge.className).toContain('py-0.5');
    expect(badge.className).toContain('text-[10px]');
  });
});
