import SearchButton from './SearchButton';
import SearchInput from './SearchInput';

interface SearchSectionProps {
  value: string;
  onSearch: () => void;
  onChange: (value: string) => void;
}

export default function SearchSection({
  value,
  onSearch,
  onChange,
}: SearchSectionProps) {
  return (
    <section className="flex md:justify-center gap-8">
      <SearchInput value={value} onChange={onChange} />
      <SearchButton onClick={onSearch} />
    </section>
  );
}
