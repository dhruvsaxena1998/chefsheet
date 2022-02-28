/**
 * @description: Checks if window object is initialized aka, if client side script is loaded
 */
export const isClientSide = () => {
  return typeof window !== "undefined";
};
