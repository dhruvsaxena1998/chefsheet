import { useState } from "react";
import { useRouter } from "next/router";

import { IconType } from "react-icons";
import { BiCategory, BiCategoryAlt, BiSearchAlt } from "react-icons/bi";
import { SideBarItems } from "../../types";
import clsx from "clsx";

type SideBar = {
  name: string;
  slug: SideBarItems;
  icon: IconType;
};

const sideBarData: SideBar[] = [
  { name: "Search", slug: "search", icon: BiSearchAlt },
  { name: "Categories", slug: "category", icon: BiCategory },
  { name: "Sub-Categories", slug: "sub-category", icon: BiCategoryAlt },
];

function Sidebar() {
  const router = useRouter();
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
}

export default Sidebar;
