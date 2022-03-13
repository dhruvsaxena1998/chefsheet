import { useRouter } from "next/router";

export const useRefresh = () => {
  const router = useRouter();

  const refresh = () => {
    router.replace(router.asPath);
  };

  return {
    refresh,
    router,
  };
};
