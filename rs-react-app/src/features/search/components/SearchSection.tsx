import { Component } from 'react';
import SearchButton from './SearchButton';
import SearchInput from './SearchInput';

interface SearchSectionProps {
  onSearch: (term: string) => void;
}

interface State {
  value: string;
}

export default class SearchSection extends Component<
  SearchSectionProps,
  State
> {
  state: State = {
    value: '',
  };

  handelChange = (value: string) => {
    this.setState({ value });
  }

  handelSearch =( ) => {
    const term = this.state.value.trim();
    this.props.onSearch(term);
  }
  render() {
    return (
      <section className="flex md:justify-center gap-8">
        <SearchInput value={this.state.value} onChange={this.handelChange} />
        <SearchButton onClick={this.handelSearch} />
      </section>
    );
  }
}
