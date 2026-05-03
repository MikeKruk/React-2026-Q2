import { Component } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default class SearchInput extends Component<SearchInputProps> {
  render() {
    const { value, onChange } = this.props;
    return (
      <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
