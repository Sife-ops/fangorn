import { useEffect } from "react";

export const Root: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("t");

  useEffect(() => {
    console.log(token);
  }, []);

  return (
    <div>
      <div>root</div>
    </div>
  );
};
