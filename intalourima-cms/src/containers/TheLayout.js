import React, { useEffect } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import { useHistory } from "react-router-dom";

const TheLayout = () => {
  const history = useHistory();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        history.push("/login");
      }
    };
    checkToken();
  }, [history]);

  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
