import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./component/page/Root";
import { createClient, Provider } from "urql";
import { useEffect } from "react";
import { useTypedQuery } from "@fangorn/graphql/urql";

const urql = createClient({
  url: import.meta.env.VITE_API_URL + "/graphql",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider value={urql}>
    <App />
  </Provider>
  // </React.StrictMode>
);

function App() {
  const [helloQueryRes] = useTypedQuery({
    query: {
      hello: true,
    },
  });

  useEffect(() => {
    const { fetching, data } = helloQueryRes;
    if (!fetching && data) {
      console.log(helloQueryRes);
    }
  }, [helloQueryRes]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="*" element={<div>todo</div>} />
      </Routes>
    </BrowserRouter>
  );
}
