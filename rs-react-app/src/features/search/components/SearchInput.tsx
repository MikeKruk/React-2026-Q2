import { Component } from 'react';

export default class SearchInput extends Component {
  render() {
    return (
      <input
        className="
      w-full max-w-2/3 md:max-w-xs p-0.5
      border border-gray-500 rounded-md
      focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none
      "
        name="search"
        aria-label="Search field"
        type="text"
      />
    );
  }
}
