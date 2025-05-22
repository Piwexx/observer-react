import { afterEach, beforeEach, vi } from 'vitest';

// hooks are reset before each suite
beforeEach(() => {
  vi.useFakeTimers();
  global.innerWidth = 1024;
  global.innerHeight = 600;
});

afterEach(() => {
  vi.resetAllMocks();
});
