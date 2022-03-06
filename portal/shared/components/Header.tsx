import Link from "next/link";
import { RiLogoutCircleFill } from "react-icons/ri";

interface IHeaderProps {
  title: string;
}

export default function AppHeader({ title }: IHeaderProps) {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link href="/" passHref>
          <span className="btn btn-ghost normal-case text-xl">{title}</span>
        </Link>
      </div>
      <div className="navbar-end">
        <Link href="/logout" passHref>
          <span className="btn gap-2 btn-error text-white">
            <RiLogoutCircleFill size={18} /> Logout
          </span>
        </Link>
      </div>
    </div>
  );
}
