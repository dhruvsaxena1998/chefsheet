import clsx from "clsx";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";

import { IconType } from "react-icons";
import { BiCategory, BiCategoryAlt, BiSearchAlt } from "react-icons/bi";

import { SideBarItems } from "@types";
import { useTranslation } from "@shared/hooks";

type SideBar = {
  name: string;
  slug: SideBarItems;
  icon: IconType;
};

export const Sidebar = () => {
  const router = useRouter();
  const t = useTranslation();

  const sideBarData: SideBar[] = useMemo(
    () => [
      { name: t.options.search, slug: "search", icon: BiSearchAlt },
      { name: t.options.categories, slug: "category", icon: BiCategory },
      {
        name: t.options.sub_categories,
        slug: "sub-category",
        icon: BiCategoryAlt,
      },
      { name: t.options.items, slug: "items", icon: BiCategoryAlt },
      { name: t.options.staff, slug: "staff", icon: BiCategoryAlt },
      { name: t.options.users, slug: "users", icon: BiCategoryAlt },
    ],
    [t]
  );

  const [active, setActive] = useState<SideBarItems>(
    router.asPath.split("/")[1] as SideBarItems
  );

  const handleItemClick = (slug: SideBarItems) => {
    setActive(slug);
    router.push(`/${slug}`);
  };

  return (
    <ul className="menu bg-base-300 w-56 h-full p-2 rounded-box">
      {sideBarData.map(({ slug, icon: Icon, name }: SideBar) => (
        <li
          key={slug}
          onClick={() => handleItemClick(slug)}
          className={clsx("my-1", [
            active === slug && "bg-base-100 rounded-lg",
          ])}
        >
          <div className="flex items-center gap-2">
            <Icon />
            {name}
          </div>
        </li>
      ))}
    </ul>
  );
};
