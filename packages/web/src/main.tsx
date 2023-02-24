import "./index.css";
import ReactDOM from "react-dom/client";
import { Auth } from "./component/page/auth";
import { AuthContextProvider } from "./auth-context";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./component/private-routes";
import { Root } from "./component/page/root";
import { createClient, Provider } from "urql";

const urql = createClient({
  url: import.meta.env.VITE_API_URL + "/graphql",
  fetchOptions: () => {
    return {
      headers: {
        authorization: localStorage.getItem("t") || ""
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider value={urql}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </Provider>
  // </React.StrictMode>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Root />} />
        </Route>
        <Route path="/auth" element={<Auth to="/" />} />
        <Route path="/help" element={<div>help</div>} />
        <Route path="/error" element={<div>error</div>} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </BrowserRouter>
  );
}
