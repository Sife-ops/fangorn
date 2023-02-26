import { useEffect } from "react";
import { useTypedQuery } from "@fangorn/graphql/urql";
import { useViewerContext } from "../../viewer-context";

export const Root: React.FC = () => {
  const [helloQueryResponse] = useTypedQuery({
    query: {
      hello: true,
    },
  });

  const v = useViewerContext();

  return (
    <div>
      <div>root</div>
      <div>{JSON.stringify(v.viewer)}</div>
    </div>
  );
};
