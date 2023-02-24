import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../auth-context";

export const PrivateRoutes: React.FC = () => {
  const { signedIn } = useAuthContext();
  const nav = useNavigate();

  if (!signedIn) {
    nav("/help");
    //   window.location.href =
    //     import.meta.env.VITE_REGISTRAR_URL + "/sign-in?serviceId=feedshare";
  }

  return <Outlet />;
};
