import { useTranslation } from "@shared/hooks";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

import { MdKeyboardBackspace } from "react-icons/md";

export interface IError404Props {
  title: string;
  message: string;
  classes?: {
    message?: string;
  };
}

export const Error404 = (props: PropsWithChildren<IError404Props>) => {
  const router = useRouter();
  const t = useTranslation();

  const handleOnBackClick = () => {
    router.back();
  };

  return (
    <div className="mockup-window border border-slate-400 bg-base-300">
      <div className="prose m-4">
        <h2>{props.title}</h2>
      </div>
      <div className="flex flex-col justify-center items-center px-4 py-16 border-t border-slate-400">
        <div className="text-lg m-4 font-bold">{props?.message}</div>

        {props.children && <div> {props.children} </div>}
      </div>
      <div className="flex justify-center my-2">
        <button className="btn btn-sm btn-ghost" onClick={handleOnBackClick}>
          <MdKeyboardBackspace /> <span className="ml-4">{t.buttons.back}</span>
        </button>
      </div>
    </div>
  );
};
