import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

describe('Accordion', () => {
  it('renders accordion items', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
  });

  it('trigger text is visible', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>My Trigger</AccordionTrigger>
          <AccordionContent>Hidden content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByText('My Trigger')).toBeVisible();
  });

  it('content appears after clicking trigger', async () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Toggle Me</AccordionTrigger>
          <AccordionContent>Revealed content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    // Initially, content is not in the DOM (Radix removes collapsed content)
    expect(screen.queryByText('Revealed content')).not.toBeInTheDocument();

    // Click the trigger
    await userEvent.click(screen.getByText('Toggle Me'));

    // Content should now be visible
    expect(screen.getByText('Revealed content')).toBeVisible();
  });
});
