import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
};

export default useTitle;
