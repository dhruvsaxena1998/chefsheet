import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useReducer,
} from "react";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "INITUSER":
      return {
        ...state,
        user: action.payload,
        loggedin: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loggedin: false,
      };
    default:
      return state;
  }
};

const initialState: {
  user: any;
  loggedin: boolean;
  initUser?: (user: any) => void;
  logout?: () => void;
} = {
  user: null,
  loggedin: false,
};
export const UserContext = createContext(initialState);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initUser = (user: any) => {
    dispatch({
      type: "INITUSER",
      payload: user,
    });
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        loggedin: state.loggedin,
        initUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
