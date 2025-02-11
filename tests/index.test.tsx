import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { HoriScroll } from '../src/HoriScroll/HoriScroll';

test('The button should have correct background color', async () => {
  render(<HoriScroll options={['hello', 'hi']} isClickable />);
  const horiscroll = screen.getAllByText('hello')[0];
  expect(horiscroll).toHaveStyle({
    backgroundColor: 'hsl(253, 36%, 42%);',
  });
});
