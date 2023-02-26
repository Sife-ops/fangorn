import "./index.css";
import ReactDOM from "react-dom/client";
import { AuthorizedRoutes } from "./component/authorized-routes";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Root } from "./component/page/root";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("t");
  if (token) localStorage.setItem("t", token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthorizedRoutes />}>
          <Route path="/" element={<Root />} />
          <Route path="/wiz" element={<div>wizard</div>} />
        </Route>
        <Route path="/error" element={<div>error</div>} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </BrowserRouter>
  );
}
