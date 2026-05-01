import { Component } from 'react';

export default class SearchButton extends Component {
  render() {
    return (
      <button
        className="
    w-full max-w-1/3 md:max-w-35 p-0.5 rounded-md
    border border-gray-500
    hover:bg-orange-400/70 hover:border-orange-400
    active:bg-orange-400/70 active:border-orange-400
    "
      >
        Search
      </button>
    );
  }
}
