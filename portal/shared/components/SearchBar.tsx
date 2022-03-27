import { useTranslation } from "@shared/hooks";
import { useMemo } from "react";
import { SearchOptions } from "../../types";

export type ISearchBarOptions = {
  value: SearchOptions;
  label: string;
};

export interface ISearchBarProps {
  slug?: SearchOptions;
}

export const SearchBar = ({ slug = "all" }: ISearchBarProps) => {
  const t = useTranslation();

  const options: ISearchBarOptions[] = useMemo(
    () => [
      { value: "category", label: t.options.categories },
      {
        value: "sub-category",
        label: t.options.sub_categories,
      },
      { value: "items", label: t.options.items },
      { value: "clients", label: t.options.clients },
      {
        value: "staff-members",
        label: t.options.staff,
      },
      {
        value: "users",
        label: 'Users',
      },
      {
        value: "events",
        label: t.options.staff,
      },
      {
        value: "inventory",
        label: t.options.staff,
      },
    ],
    [t]
  );

  return (
    <div className="form-control">
      <div className="input-group">
        <select className="select bg-base-200" defaultValue={slug}>
          {slug === "all" ? (
            <>
              <option disabled value="all">
                {t.misc.pick_category}
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
          {t.buttons.search}
        </button>
      </div>
    </div>
  );
};
