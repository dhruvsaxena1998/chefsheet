const data_theme_key = "data_theme";
import { isClientSide } from "../../utils/client-side-only";

/**
 * getTheme function requires to be executed on the client side.
 * You can also wrap it with useEffect hook to be assured that they are executed on the client side.
 *
 * @example
 * ```tsx
 * import { useEffect } from 'react';
 * import { getTheme } from 'shared/services/theme';
 *
 * useEffect(() => {
 *  // Log theme on the client side
 *  console.log(getTheme());
 * });
 *  ```
 */

export const getTheme = (): string | null => {
  if (!isClientSide()) return null;

  return (
    localStorage.getItem(data_theme_key) ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light")
  );
};

/**
 * setTheme function requires to be executed on the client side.
 * You can also wrap it with useEffect hook to be assured that they are executed on the client side.
 * @param {string} theme
 * Check available themes in tailwindcss config.
 *
 * @example
 * ```tsx
 * import { useEffect } from 'react';
 * import { setTheme } from 'shared/services/theme';
 *
 * useEffect(() => {
 *  // To initialize theme on the client side
 *  // Recommended using this in index.{js, jsx, ts, tsx} or _app.{js, jsx, ts, tsx}
 *  setTheme();
 * });
 *  ```
 */

export const setTheme = (theme?: string) => {
  if (!isClientSide()) return;

  const currentTheme = getTheme();
  if (!currentTheme) return;
  if (currentTheme === theme) return;

  const newTheme = theme || currentTheme;
  localStorage.setItem(data_theme_key, newTheme);
  document.documentElement.setAttribute("data-theme", newTheme);
};
