import { render, screen } from '@testing-library/react';
import { FormCard } from '@/components/ui/form-card';

describe('FormCard', () => {
  it('renders children content', () => {
    render(
      <FormCard>
        <p>Form field here</p>
      </FormCard>
    );
    expect(screen.getByText('Form field here')).toBeInTheDocument();
  });

  it('applies correct padding classes for sm', () => {
    const { container } = render(
      <FormCard padding="sm">
        <p>Small padding</p>
      </FormCard>
    );
    const cardContent = container.querySelector('[data-slot="card-content"]');
    expect(cardContent?.className).toContain('pt-4');
  });

  it('applies correct padding classes for md', () => {
    const { container } = render(
      <FormCard padding="md">
        <p>Medium padding</p>
      </FormCard>
    );
    const cardContent = container.querySelector('[data-slot="card-content"]');
    expect(cardContent?.className).toContain('pt-6');
  });

  it('applies correct padding classes for lg', () => {
    const { container } = render(
      <FormCard padding="lg">
        <p>Large padding</p>
      </FormCard>
    );
    const cardContent = container.querySelector('[data-slot="card-content"]');
    expect(cardContent?.className).toContain('pt-8');
  });

  it('applies correct spacing classes for sm', () => {
    const { container } = render(
      <FormCard spacing="sm">
        <p>Small spacing</p>
      </FormCard>
    );
    const cardContent = container.querySelector('[data-slot="card-content"]');
    expect(cardContent?.className).toContain('space-y-3');
  });

  it('applies correct spacing classes for md', () => {
    const { container } = render(
      <FormCard spacing="md">
        <p>Medium spacing</p>
      </FormCard>
    );
    const cardContent = container.querySelector('[data-slot="card-content"]');
    expect(cardContent?.className).toContain('space-y-4');
  });

  it('applies correct spacing classes for lg', () => {
    const { container } = render(
      <FormCard spacing="lg">
        <p>Large spacing</p>
      </FormCard>
    );
    const cardContent = container.querySelector('[data-slot="card-content"]');
    expect(cardContent?.className).toContain('space-y-6');
  });

  it('defaults to md padding and spacing', () => {
    const { container } = render(
      <FormCard>
        <p>Default sizes</p>
      </FormCard>
    );
    const cardContent = container.querySelector('[data-slot="card-content"]');
    expect(cardContent?.className).toContain('pt-6');
    expect(cardContent?.className).toContain('space-y-4');
  });
});
