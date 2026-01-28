# Pattern Library

> **AI Carousel Generator - Design System Documentation**
> **Version:** 1.0.0
> **Generated:** 2026-01-28
> **Author:** Uma (UX Design Expert) - AIOS

---

## Table of Contents

1. [Introduction](#introduction)
2. [Design Tokens](#design-tokens)
3. [Atoms](#atoms)
4. [Molecules](#molecules)
5. [Organisms](#organisms)
6. [Patterns & Guidelines](#patterns--guidelines)
7. [Accessibility](#accessibility)

---

## Introduction

This pattern library documents all reusable components in the AI Carousel Generator project. It follows **Atomic Design** methodology by Brad Frost.

### Tech Stack
- **Framework:** Next.js 16 + React 19
- **Styling:** Tailwind CSS v4 + CSS Variables
- **Components:** Radix UI + shadcn/ui
- **Icons:** Lucide React
- **State:** Zustand

### Import Convention
```tsx
// Import from centralized index
import { Button, Card, Input } from '@/components';

// Or import directly
import { Button } from '@/components/ui/button';
```

---

## Design Tokens

### Color System

#### Base Colors
```tsx
// Usage in Tailwind classes
<div className="bg-background text-foreground" />
<div className="bg-card text-card-foreground" />
<div className="bg-popover text-popover-foreground" />
```

#### Interactive Colors
```tsx
<Button className="bg-primary text-primary-foreground" />
<Button variant="secondary" /> // bg-secondary text-secondary-foreground
<span className="text-muted-foreground" /> // Subtle text
<div className="bg-accent" /> // Highlight areas
```

#### Feedback Colors
```tsx
// Semantic feedback
<span className="text-destructive">Error text</span>
<span className="text-success">Success text</span>
<span className="text-warning">Warning text</span>
<span className="text-info">Info text</span>

// Subtle backgrounds (alerts, toasts)
<div className="bg-error-subtle text-error-subtle-foreground">
  Error message
</div>
<div className="bg-success-subtle text-success-subtle-foreground">
  Success message
</div>
<div className="bg-warning-subtle text-warning-subtle-foreground">
  Warning message
</div>
```

#### Brand Colors
```tsx
// Twitter/X blue
<BadgeCheck className="text-twitter" />
<Button className="bg-twitter hover:bg-twitter-hover">Tweet</Button>
```

#### Surface Colors
```tsx
// Headers with blur
<header className="bg-surface-overlay backdrop-blur
                   supports-[backdrop-filter]:bg-surface-overlay-blur" />
```

### Spacing Scale

| Token | Value | Pixels |
|-------|-------|--------|
| `0.5` | 0.125rem | 2px |
| `1` | 0.25rem | 4px |
| `2` | 0.5rem | 8px |
| `3` | 0.75rem | 12px |
| `4` | 1rem | 16px |
| `6` | 1.5rem | 24px |
| `8` | 2rem | 32px |

### Border Radius

```tsx
<div className="rounded-sm" />  // radius - 4px
<div className="rounded-md" />  // radius - 2px
<div className="rounded-lg" />  // radius (default)
<div className="rounded-xl" />  // radius + 4px
<div className="rounded-full" /> // 9999px
```

---

## Atoms

### Button

The primary action component with multiple variants and sizes.

```tsx
import { Button } from '@/components/ui/button';

// Variants
<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Delete</Button>

// Sizes
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>

// Icon buttons
<Button size="icon"><Settings /></Button>
<Button size="icon-sm"><X /></Button>

// With icons
<Button>
  <Sparkles className="mr-2 h-4 w-4" />
  Generate
</Button>

// Loading state
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading...
</Button>

// As child (render as different element)
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

**Props:**
| Prop | Type | Default |
|------|------|---------|
| `variant` | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` |
| `size` | `'default' \| 'xs' \| 'sm' \| 'lg' \| 'icon' \| 'icon-xs' \| 'icon-sm' \| 'icon-lg'` | `'default'` |
| `asChild` | `boolean` | `false` |

---

### Input

Text input field with validation states.

```tsx
import { Input } from '@/components/ui/input';

// Basic
<Input placeholder="Enter text..." />

// With label
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>

// Error state
<Input aria-invalid="true" />

// Disabled
<Input disabled />

// File input
<Input type="file" />
```

---

### Textarea

Multi-line text input.

```tsx
import { Textarea } from '@/components/ui/textarea';

<Textarea
  placeholder="Enter your idea..."
  className="min-h-[120px]"
/>
```

---

### Label

Form label with proper association.

```tsx
import { Label } from '@/components/ui/label';

<Label htmlFor="name">Name</Label>
<Input id="name" />

// With required indicator
<Label>
  Email <span className="text-destructive">*</span>
</Label>
```

---

### Switch

Toggle switch for boolean options.

```tsx
import { Switch } from '@/components/ui/switch';

// Basic
<Switch />

// Controlled
<Switch
  checked={isEnabled}
  onCheckedChange={setIsEnabled}
/>

// Sizes
<Switch size="default" />
<Switch size="sm" />

// With label
<div className="flex items-center gap-2">
  <Switch id="auto" />
  <Label htmlFor="auto">Auto mode</Label>
</div>
```

---

### Slider

Range slider for numeric values.

```tsx
import { Slider } from '@/components/ui/slider';

<Slider
  value={[count]}
  onValueChange={([v]) => setCount(v)}
  min={1}
  max={20}
  step={1}
/>
```

---

### Avatar

User profile image with fallback.

```tsx
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// Sizes via className
<Avatar className="h-10 w-10">...</Avatar>
<Avatar className="h-8 w-8">...</Avatar>
```

---

### Separator

Visual divider.

```tsx
import { Separator } from '@/components/ui/separator';

<Separator /> // Horizontal
<Separator orientation="vertical" />
```

---

## Molecules

### Select

Dropdown selection component.

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>

// Sizes
<SelectTrigger size="sm">...</SelectTrigger>
```

---

### Accordion

Expandable content sections.

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>
      Content for section 1...
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

---

### DropdownMenu

Context menu for actions.

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost">Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive">
      Logout
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

## Organisms

### Card

Container for grouped content.

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    Main content goes here...
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

### HookCard

Selectable hook option card.

```tsx
import { HookCard } from '@/components/hooks/hook-card';

<HookCard
  hook="This is the hook text"
  index={1}
  isSelected={selectedIndex === 1}
  onSelect={() => setSelectedIndex(1)}
  disabled={false}
/>
```

---

### SlidePreview

Twitter-style carousel slide with editing.

```tsx
import { SlidePreview } from '@/components/carousel/slide-preview';

<SlidePreview
  slide={{ numero: 1, texto: "Slide content" }}
  totalSlides={10}
  theme="light"
  profilePhoto="/photo.jpg"
  displayName="John Doe"
  username="johndoe"
  verified={true}
  onTextChange={(num, text) => updateSlide(num, text)}
  onDelete={(num) => deleteSlide(num)}
  canDelete={slides.length > 5}
/>
```

---

### IdeaForm

Main form for carousel idea input.

```tsx
import { IdeaForm } from '@/components/forms/idea-form';

<IdeaForm
  onSubmit={handleGenerate}
  error={errorMessage}
/>
```

Features:
- Text input with character counter
- Audio recording with transcription
- Advanced settings accordion
- Slide count slider with auto mode

---

### Header

App header with navigation.

```tsx
import { Header } from '@/components/layout/header';

<Header user={currentUser} />
```

---

## Patterns & Guidelines

### Form Layout Pattern

```tsx
<form className="space-y-6">
  <Card>
    <CardContent className="pt-6 space-y-6">
      {/* Form fields */}
      <div className="space-y-2">
        <Label htmlFor="field">Field Label</Label>
        <Input id="field" />
      </div>
    </CardContent>
  </Card>

  <Button type="submit" size="lg" className="w-full">
    Submit
  </Button>
</form>
```

### Error Display Pattern

```tsx
{error && (
  <div className="p-3 rounded-lg bg-error-subtle text-error-subtle-foreground text-sm">
    {error}
  </div>
)}
```

### Loading State Pattern

```tsx
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading...
</Button>
```

### Icon Button Pattern

```tsx
// Small action button
<Button variant="outline" size="sm">
  <Download className="w-4 h-4 mr-1" />
  Download
</Button>

// Icon only
<Button variant="ghost" size="icon">
  <Settings className="w-4 h-4" />
</Button>
```

### Responsive Layout Pattern

```tsx
<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
  {/* Stacks vertically on mobile, horizontal on desktop */}
</div>
```

---

## Accessibility

### Focus Management

All interactive elements have visible focus states:
```css
focus-visible:border-ring
focus-visible:ring-ring/50
focus-visible:ring-[3px]
```

### Keyboard Navigation

- `Tab` - Navigate between elements
- `Enter/Space` - Activate buttons, toggles
- `Escape` - Close dropdowns, modals
- `Arrow keys` - Navigate within selects, sliders

### ARIA Attributes

```tsx
// Invalid state
<Input aria-invalid={hasError} />

// Disabled state
<Button aria-disabled={isDisabled} disabled />

// Live regions for dynamic content
<div aria-live="polite">{count}/500</div>
```

### Color Contrast

All color combinations meet WCAG AA (4.5:1 for text, 3:1 for UI).

See [Accessibility Audit](./accessibility-audit.md) for full details.

---

## Quick Reference

### Common Class Combinations

```tsx
// Card with shadow
"rounded-xl border shadow-sm"

// Interactive card
"cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5"

// Selected state
"border-primary border-2 bg-primary/5"

// Muted text
"text-sm text-muted-foreground"

// Flex center
"flex items-center justify-center"

// Full-width button
"w-full h-14 text-lg font-medium"

// Sticky header
"sticky top-0 z-50 border-b bg-surface-overlay backdrop-blur"
```

---

*Maintained by Uma (UX Design Expert) - Synkra AIOS*
