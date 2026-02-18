import { render, screen } from '@testing-library/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

describe('Avatar', () => {
  it('renders fallback text when no image', () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('renders AvatarFallback content', () => {
    render(
      <Avatar>
        <AvatarImage src="" alt="user" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    // Fallback shows when image fails or has no src
    expect(screen.getByText('JD')).toBeInTheDocument();
  });
});
