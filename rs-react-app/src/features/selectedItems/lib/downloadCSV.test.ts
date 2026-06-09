import { mockPokemon } from '../../../test-utils/mocks/mockPokemon';
import { downloadCSV } from './downloadCSV';

describe('downloadCSV', () => {
  beforeEach(() => {
    globalThis.URL.createObjectURL = vi.fn(() => 'blob:url');
    globalThis.URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => vi.clearAllMocks());

  test('creates a link and triggers download', () => {
    const clickMock = vi.fn();
    const createElementSpy = vi
      .spyOn(document, 'createElement')
      .mockReturnValue({
        href: '',
        download: '',
        click: clickMock,
      } as unknown as HTMLAnchorElement);

    downloadCSV([mockPokemon]);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(clickMock).toHaveBeenCalled();
    createElementSpy.mockRestore();
  });

  test('sets correct filename with pokemon count', () => {
    let downloadAttr = '';
    vi.spyOn(document, 'createElement').mockReturnValue({
      href: '',
      set download(val: string) {
        downloadAttr = val;
      },
      click: vi.fn(),
    } as unknown as HTMLAnchorElement);

    downloadCSV([mockPokemon]);
    expect(downloadAttr).toBe('1_pokemons.csv');
  });
});
