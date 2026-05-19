function mockFetch(data: unknown) {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(data),
  });
}

function mockFetchError() {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: false,
    json: () => Promise.resolve({}),
  });
}

export { mockFetch, mockFetchError };
