import { useEffect, useState } from "react";
import { useTypedQuery, useTypedMutation } from "@fangorn/graphql/urql";
import { useViewerContext } from "../../viewer-context";
import { SearchInput } from "@fangorn/graphql/genql";

export const Root: React.FC = () => {
  const v = useViewerContext();

  // const [helloQueryResponse] = useTypedQuery({
  //   query: {
  //     hello: true,
  //   },
  // });

  const [users, setUsers] = useState<any[]>([]);
  const [cursor, setCursor] = useState<string>();

  const [a, b] = useTypedMutation((o: SearchInput) => {
    return {
      search: {
        __args: {
          input: o,
        },
        description: true,
        cursor: true,
      },
    };
  });

  useEffect(() => {
    b({ cursor });
  }, []);

  useEffect(() => {
    const { fetching, data } = a;
    if (!fetching && data) {
      const { search } = data;
      setUsers((s) => [...s, ...search]);
      setCursor(search[search.length - 1].cursor);
    }
  }, [a]);

  return (
    <div>
      <div>root</div>
      <div>viewer: {JSON.stringify(v.viewer)}</div>
      <div>cursor: {cursor}</div>
      <div>
        {users.map((e) => (
          <div key={"1"}>{JSON.stringify(e)}</div>
        ))}
        <button onClick={() => b({ cursor })}>load more</button>
      </div>
    </div>
  );
};
