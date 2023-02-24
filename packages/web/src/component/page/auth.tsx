import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../auth-context";

export const Auth: React.FC<{ to: string }> = (p) => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("t");
  const authContext = useAuthContext();
  const nav = useNavigate();

  useEffect(() => {
    if (!token) return nav("/error");
    localStorage.setItem("t", token);
    authContext.setSignedIn(true);
    nav(p.to);
  }, []);

  return (
    <div>
      <div>todo</div>
    </div>
  );
};
