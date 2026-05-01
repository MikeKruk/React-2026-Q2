import { Component } from 'react';
import SearchButton from './SearchButton';
import SearchInput from './SearchInput';

export default class SearchSection extends Component {
  render() {
    return (
      <section className="flex md:justify-center gap-8">
        <SearchInput />
        <SearchButton />
      </section>
    );
  }
}
