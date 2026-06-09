import { useState } from 'react';
import { useAppSelector } from '../../../app/store/hooks';

interface CountryAutocompleteProps {
  value: string;
  onChange: (val: string) => void;
  error?: string;
}
export default function CountryAutocomplete({
  value,
  onChange,
  error,
}: CountryAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const countries = useAppSelector((state) => state.countries);
  const filtered = countries.filter((country) =>
    country.toLowerCase().includes(value.toLowerCase())
  );
  return (
    <div className="relative flex flex-col gap-1">
      <label htmlFor="country" className="text-sm font-medium">
        Country
      </label>
      <input
        id="country"
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="p-2 rounded-md border border-border bg-background"
        placeholder="Start typing..."
        autoComplete="off"
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
      {open && filtered.length > 0 && (
        <ul className="absolute top-full left-0 right-0 z-10 max-h-40 overflow-y-auto bg-background border border-border rounded-md shadow-lg">
          {filtered.map((country) => (
            <li
              key={country}
              onMouseDown={() => {
                onChange(country);
                setOpen(false);
              }}
              className="px-3 py-2 cursor-pointer hover:bg-orange-400/20 text-sm"
            >
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
