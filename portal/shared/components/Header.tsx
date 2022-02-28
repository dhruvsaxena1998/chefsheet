import Link from "next/link";
import { RiLogoutCircleRLine } from "@react-icons/all-files/ri/RiLogoutCircleRLine";

interface IHeaderProps {
  title: string;
}

export default function AppHeader({ title }: IHeaderProps) {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">{title}</a>
      </div>
      <div className="navbar-end">
        <Link href="/logout" passHref>
          <span className="btn gap-2 btn-error text-white">
            <RiLogoutCircleRLine size={18} /> Logout
          </span>
        </Link>
      </div>
    </div>
  );
}
