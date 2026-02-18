import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectableCard } from '@/components/ui/selectable-card';

describe('SelectableCard', () => {
  it('renders children', () => {
    render(
      <SelectableCard isSelected={false} onSelect={vi.fn()}>
        <span>Card content</span>
      </SelectableCard>
    );
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('shows selected state (aria-selected="true")', () => {
    render(
      <SelectableCard isSelected={true} onSelect={vi.fn()}>
        <span>Selected</span>
      </SelectableCard>
    );
    expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true');
  });

  it('shows unselected state (aria-selected="false")', () => {
    render(
      <SelectableCard isSelected={false} onSelect={vi.fn()}>
        <span>Unselected</span>
      </SelectableCard>
    );
    expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onSelect on click', async () => {
    const onSelect = vi.fn();
    render(
      <SelectableCard isSelected={false} onSelect={onSelect}>
        <span>Click me</span>
      </SelectableCard>
    );
    await userEvent.click(screen.getByRole('option'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('calls onSelect on Enter keydown', () => {
    const onSelect = vi.fn();
    render(
      <SelectableCard isSelected={false} onSelect={onSelect}>
        <span>Press Enter</span>
      </SelectableCard>
    );
    fireEvent.keyDown(screen.getByRole('option'), { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('calls onSelect on Space keydown', () => {
    const onSelect = vi.fn();
    render(
      <SelectableCard isSelected={false} onSelect={onSelect}>
        <span>Press Space</span>
      </SelectableCard>
    );
    fireEvent.keyDown(screen.getByRole('option'), { key: ' ' });
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onSelect when disabled', async () => {
    const onSelect = vi.fn();
    render(
      <SelectableCard isSelected={false} onSelect={onSelect} disabled>
        <span>Disabled card</span>
      </SelectableCard>
    );
    await userEvent.click(screen.getByRole('option'));
    fireEvent.keyDown(screen.getByRole('option'), { key: 'Enter' });
    fireEvent.keyDown(screen.getByRole('option'), { key: ' ' });
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('shows indicator with index number', () => {
    render(
      <SelectableCard isSelected={false} onSelect={vi.fn()} index={3} showIndicator>
        <span>With index</span>
      </SelectableCard>
    );
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('shows Check icon when selected', () => {
    const { container } = render(
      <SelectableCard isSelected={true} onSelect={vi.fn()} index={1} showIndicator>
        <span>Selected with check</span>
      </SelectableCard>
    );
    // When selected, the Check icon (svg) is rendered instead of the index number
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    // The index number should NOT be present when selected
    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });
});
