import React, { useState, useEffect } from "react";
import { useTypedQuery } from "@fangorn/graphql/urql";
import { useNavigate } from "react-router-dom";
import { User } from "@fangorn/graphql/genql";

type ViewerContextType = {
  isActive: () => boolean;
  viewer: Partial<User> | undefined;
};

const viewerContext = (): ViewerContextType => {
  const [viewer, setViewer] = useState<Partial<User>>();

  const [viewerQ] = useTypedQuery({
    query: {
      viewer: {
        active: true,
      },
    },
  });

  useEffect(() => {
    const { fetching, data } = viewerQ;
    if (!fetching && data) {
      setViewer(data.viewer);
    }
  }, [viewerQ]);

  const isActive = (): boolean => {
    return !!viewer?.active;
  };

  return {
    isActive,
    viewer,
  };
};

const ViewerContext = React.createContext<ViewerContextType | undefined>(
  undefined
);

export const ViewerContextProvider = (props: { children: React.ReactNode }) => {
  const context = viewerContext();

  return (
    <ViewerContext.Provider value={context}>
      {props.children}
    </ViewerContext.Provider>
  );
};

export const useViewerContext = () => {
  const context = React.useContext(ViewerContext);
  if (context === undefined) {
    throw new Error("context must be defined");
  }
  return context;
};
