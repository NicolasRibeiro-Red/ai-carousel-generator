import { render, screen } from '@testing-library/react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

describe('Select', () => {
  it('renders with trigger text', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pick an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="one">Option One</SelectItem>
          <SelectItem value="two">Option Two</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByText('Pick an option')).toBeInTheDocument();
  });

  it('renders the select trigger', () => {
    render(
      <Select>
        <SelectTrigger aria-label="Select fruit">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
      </Select>
    );

    expect(screen.getByRole('combobox', { name: 'Select fruit' })).toBeInTheDocument();
  });
});
