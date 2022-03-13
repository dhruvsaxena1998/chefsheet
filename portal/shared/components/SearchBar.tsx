import { SearchOptions } from "../../types";

export type ISearchBarOptions = {
  value: SearchOptions;
  label: string;
};

const options: ISearchBarOptions[] = [
  { value: "category", label: "Categories" },
  {
    value: "sub-category",
    label: "Sub-Categories",
  },
  {
    value: "staff",
    label: "Staff",
  },
];

export interface ISearchBarProps {
  slug?: SearchOptions;
}

export const SearchBar = ({ slug = "all" }: ISearchBarProps) => {
  return (
    <div className="form-control">
      <div className="input-group">
        <select className="select bg-base-200" defaultValue={slug}>
          {slug === "all" ? (
            <>
              <option disabled value="all">
                Pick category
              </option>
              {options.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </>
          ) : (
            <option value={slug}>
              {options.find(({ value }) => value === slug)?.label}
            </option>
          )}
        </select>
        <input
          type={"text"}
          placeholder={"Search here"}
          className={"input bg-base-300 w-full rounded-lg"}
        />
        <button className="btn btn-wide bg-base-200 tracking-wider border-0">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
