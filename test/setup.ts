import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';

// hooks are reset before each suite
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.resetAllMocks();
});
