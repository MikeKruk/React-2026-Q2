import SearchButton from './SearchButton';
import SearchInput from './SearchInput';

interface SearchSectionProps {
  value: string;
  onChange: (value: string) => void;
  searchAction: (formData: FormData) => void;
}

export default function SearchSection({
  value,
  onChange,
  searchAction,
}: SearchSectionProps) {
  return (
    <form action={searchAction} className="flex md:justify-center gap-8">
      <SearchInput value={value} onChange={onChange} />
      <SearchButton />
    </form>
  );
}
