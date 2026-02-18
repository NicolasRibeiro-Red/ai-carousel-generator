import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

describe('Card', () => {
  it('renders Card with all sub-components', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Body Content</CardContent>
        <CardFooter>Card Footer Content</CardFooter>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    expect(screen.getByText('Card Body Content')).toBeInTheDocument();
    expect(screen.getByText('Card Footer Content')).toBeInTheDocument();
  });

  it('content renders correctly', () => {
    render(
      <Card>
        <CardContent>
          <p>Paragraph inside card</p>
        </CardContent>
      </Card>
    );

    expect(screen.getByText('Paragraph inside card')).toBeInTheDocument();
  });
});
