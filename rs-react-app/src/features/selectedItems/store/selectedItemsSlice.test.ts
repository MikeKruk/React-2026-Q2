import { mockPokemon } from '../../../test-utils/mocks/mockPokemon';
import reducer, {
  selectItem,
  unselectAllItems,
  unselectItem,
} from './selectedItemsSlice';

describe('selectedItemsSlice', () => {
  test('selectItem adds pokemon to state', () => {
    const state = reducer(undefined, selectItem(mockPokemon));
    expect(state.selectedItems).toHaveLength(1);
    expect(state.selectedItems[0].id).toBe(mockPokemon.id);
  });

  test('unselectItem removes pokemon from state', () => {
    const initial = reducer(undefined, selectItem(mockPokemon));
    const state = reducer(initial, unselectItem(mockPokemon));
    expect(state.selectedItems).toHaveLength(0);
  });

  test('unselectAllItems clears all selected items', () => {
    let state = reducer(undefined, selectItem(mockPokemon));
    state = reducer(state, selectItem(mockPokemon));
    state = reducer(state, unselectAllItems());
    expect(state.selectedItems).toHaveLength(0);
  });
});
