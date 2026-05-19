import { getPaginationRage } from './getPaginationRage';

describe('getPaginationRage', () => {
  test('returns all pages when totalPages <= 7', () => {
    expect(getPaginationRage(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getPaginationRage(1, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  test('shows right dots when near start', () => {
    expect(getPaginationRage(1, 10)).toEqual([1, 2, 3, 4, 5, '...', 10]);
    expect(getPaginationRage(3, 10)).toEqual([1, 2, 3, 4, 5, '...', 10]);
  });

  test('shows left dots when near end', () => {
    expect(getPaginationRage(10, 10)).toEqual([1, '...', 6, 7, 8, 9, 10]);
    expect(getPaginationRage(9, 10)).toEqual([1, '...', 6, 7, 8, 9, 10]);
  });

  test('shows both dots when in middle', () => {
    expect(getPaginationRage(5, 10)).toEqual([1, '...', 4, 5, 6, '...', 10]);
  });
});
