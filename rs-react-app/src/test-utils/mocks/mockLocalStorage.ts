export function mockLocalStorage() {
  const storage: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => storage[key] ?? null),
    setItem: vi.fn((key: string, value: string) => (storage[key] = value)),
    clear: vi.fn(() =>
      Object.keys(storage).forEach((key) => delete storage[key])
    ),
    removeItem: vi.fn((key: string) => delete storage[key]),
  };
}
