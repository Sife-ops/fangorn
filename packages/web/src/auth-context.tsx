import React, { useState, useEffect } from "react";

type AuthContextType = {
  signedIn: boolean;
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const authContext = (): AuthContextType => {
  const [signedIn, setSignedIn] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("t");
    if (token) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, []);

  const asdf = () => {
    //
  };

  return {
    signedIn,
    setSignedIn,
  };
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const context = authContext();

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("context must be defined");
  }
  return context;
};
