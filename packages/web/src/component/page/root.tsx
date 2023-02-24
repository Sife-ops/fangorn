import { useEffect } from "react";
import { useTypedQuery } from "@fangorn/graphql/urql";

export const Root: React.FC = () => {
  const [helloQueryResponse] = useTypedQuery({
    query: {
      hello: true,
    },
  });

  return (
    <div>
      <div>root</div>
    </div>
  );
};
