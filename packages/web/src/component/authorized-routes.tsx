import { Outlet, useNavigate } from "react-router-dom";
import { ViewerContextProvider } from "../viewer-context";
import { authExchange } from "@urql/exchange-auth";
import { useEffect, useState } from "react";

import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  makeOperation,
  Provider,
} from "urql";

export const AuthorizedRoutes: React.FC = () => {
  const [authorized, setAuthorized] = useState<boolean>();

  const nav = useNavigate();

  const urql = createClient({
    url: import.meta.env.VITE_API_URL + "/graphql",
    exchanges: [
      dedupExchange,
      cacheExchange,
      authExchange<{ token: string }>({
        getAuth: async ({ authState }) => {
          if (!authState) {
            const token = localStorage.getItem("t");
            if (token) {
              setAuthorized(true);
              return { token };
            }
          }
          setAuthorized(false);
          return null;
        },

        addAuthToOperation: ({ authState, operation }) => {
          if (!authState || !authState.token) {
            return operation;
          }
          const fetchOptions =
            typeof operation.context.fetchOptions === "function"
              ? operation.context.fetchOptions()
              : operation.context.fetchOptions || {};
          return makeOperation(operation.kind, operation, {
            ...operation.context,
            fetchOptions: {
              ...fetchOptions,
              headers: {
                ...fetchOptions.headers,
                authorization: authState.token,
              },
            },
          });
        },

        didAuthError: ({ error }) => {
          return error.response.status === 401;
        },
      }),
      fetchExchange,
    ],
  });

  useEffect(() => {
    if (authorized === false) {
      nav("/error");
    }
  }, [authorized]);

  if (authorized === undefined) {
    return (
      <div>
        <div>lmao plz wait</div>
      </div>
    );
  }

  if (authorized === false) {
    return <div>rip</div>;
  }

  return (
    <Provider value={urql}>
      <ViewerContextProvider>
        <Outlet />
      </ViewerContextProvider>
    </Provider>
  );
};
