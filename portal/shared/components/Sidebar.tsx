import {useState} from 'react'

import {IconType} from "@react-icons/all-files/lib";

import {BsSearch} from "@react-icons/all-files/bs/BsSearch";
import {MdEvent} from "@react-icons/all-files/md/MdEvent";
import {FiUsers} from "@react-icons/all-files/fi/FiUsers";
import {FaUsers} from "@react-icons/all-files/fa/FaUsers";

type SideBarSlug = 'home' | 'search' | 'events' | 'users' | 'inventory' | 'settings' | 'logout' | 'staff' | 'clients';

type SideBar = {
    name: string;
    slug: SideBarSlug;
    icon: IconType;
};


const sideBarData: SideBar[] = [
    {name: "Search", slug: "search", icon: BsSearch},
    {name: "Inventory", slug: "inventory", icon: MdEvent},
    {name: "Events", slug: "events", icon: MdEvent},
    {name: "Staff", slug: "staff", icon: FiUsers},
    {name: "Clients", slug: "clients", icon: FaUsers},
    {name: "Settings", slug: "settings", icon: MdEvent},
];

function Sidebar() {
    return (
        <ul className="menu bg-base-300 w-56 p-2 rounded-box">
            {sideBarData.map(({slug, icon: Icon, name}: SideBar) => (
                <li key={slug}>
                    <div className='flex items-center gap-2'>
                        <Icon/>
                        {name}
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default Sidebar;
