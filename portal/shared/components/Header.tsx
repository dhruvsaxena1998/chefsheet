import { useTranslation } from "@shared/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiLogoutCircleFill } from "react-icons/ri";

export interface IHeaderProps {
  title: string;
}

export const AppHeader = ({ title }: IHeaderProps) => {
  const router = useRouter();
  const t = useTranslation();

  const logout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link href="/" passHref>
          <span className="btn btn-ghost normal-case text-xl">{title}</span>
        </Link>
      </div>
      <div className="navbar-end">
        <button onClick={logout}>
          <span className="btn gap-2 btn-error text-white">
            <RiLogoutCircleFill size={18} /> {t.buttons.logout}
          </span>
        </button>
      </div>
    </div>
  );
};
