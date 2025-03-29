import { FC, createContext, Context, useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import type { loginInfoType, responseDataType } from "../../utils/backend";
import { getLoginInfo, backendRequest } from "../../utils/backend";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DotChartOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { InfoMessageType } from "../Infomessage/Infomessage";

import Header from "../Header";
import Footer from "../Footer";
import Home from "../../pages/Home";
import BlogOverview from "../../pages/BlogOverview";
import Blog from "../../pages/Blog";
import Login from "../../pages/Login";
import Project from "../../pages/Project";
import Admin from "../../pages/Admin";
import Imprint from "../../pages/Imprint";
import Privacy from "../../pages/Privacy";
import About from "../../pages/About";
import Results from "../../pages/Results";
import Infomessage from "../Infomessage";
import { Skeleton, Space } from "antd";

export const LoginContext: Context<string | null> = createContext(
  null as string | null
);

type TypeInfoMessage = null | {
  message: string;
  type: InfoMessageType;
};

export const InfoContext: Context<any> = createContext({
  setInfo: (message: string, type: InfoMessageType) => {},
});

export const App: FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [loginInfoResponse, setLoginResponse] =
    useState<responseDataType | null>(null);
  const [isLoadingLoginInfo, setIsLoadingLoginInfo] = useState<string>("");
  const [infoMessage, setInfoMessage] = useState<TypeInfoMessage>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setInfoMessage(null);
  }, [pathname]);

  const updateLoadingInfo = (info: string) => {
    setIsLoadingLoginInfo((prev) => (prev === "" ? "" : info));
  };

  const setInfo = (message: string, type: InfoMessageType): void => {
    setInfoMessage({
      message: message,
      type: type,
    });
  };

  useEffect(() => {
    // when a user cookie is set, try to contact backend
    if (getLoginInfo() !== null) {
      setIsLoadingLoginInfo("Admin Panel wird geladen...");

      setTimeout(() => updateLoadingInfo("Nicht mehr lange..."), 1000);
      setTimeout(
        () => updateLoadingInfo("Hmm, das dauert laenger als erwartet..."),
        2000
      );

      backendRequest("logininfo", {})
        .then((response) => {
          setLoginResponse(response);
        })
        .catch((reason) => {
          console.error(reason);
          setLoginResponse(reason);
        })
        .finally(() => {
          const fetchedLoginInfo = getLoginInfo();
          setUsername(fetchedLoginInfo?.username ?? null);
          setIsLoadingLoginInfo("");
        });
    } else {
      const fetchedLoginInfo = getLoginInfo();
      setUsername(fetchedLoginInfo?.username ?? null);
    }
  }, []);

  return (
    <>
      <InfoContext.Provider value={setInfo}>
        <LoginContext.Provider value={username}>
          {/* when the user cookie is set but the server doesn't respond display the error message*/}
          {(loginInfoResponse?.status === "warning" ||
            loginInfoResponse?.status === "connerror") && (
            <Infomessage type="warning" activeTimeMS={10000}>
              <WarningOutlined /> {loginInfoResponse.text}
            </Infomessage>
          )}

          {infoMessage !== null && (
            <Infomessage
              activeTimeMS={10000}
              key={Math.random()}
              type={infoMessage.type}
            >
              {infoMessage.type === "warning" && <WarningOutlined />}
              {["error", "connerror"].includes(infoMessage.type) && (
                <CloseCircleOutlined />
              )}
              {infoMessage.type === "success" && <CheckCircleOutlined />}
              &nbsp;{infoMessage.message}
            </Infomessage>
          )}

          <Header loading={isLoadingLoginInfo !== ""} />

          {isLoadingLoginInfo !== "" && (
            <main className="p-10 mt-28 m-auto w-2/3">
              <h2 className="pt-0 mb-5">{isLoadingLoginInfo}</h2>
              <Space>
                <Skeleton.Button active />
                <Skeleton.Avatar active />
                <Skeleton.Input active />
              </Space>
              <br />
              <br />
              <Skeleton.Button />
              <br />
              <br />
              <Skeleton.Input active />
              <br />
              <br />
              <Space>
                <Skeleton.Image />
                <Skeleton.Node>
                  <DotChartOutlined
                    style={{ fontSize: 40, color: "#bfbfbf" }}
                  />
                </Skeleton.Node>
              </Space>
              <Skeleton className="mt-10" active />
            </main>
          )}

          {isLoadingLoginInfo === "" && (
            <>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<BlogOverview isSite={true} />} />
                <Route path="/blog/:id" element={<Blog />} />
                <Route path="/login" element={<Login />} />
                <Route path="/project" element={<Project />} />
                <Route path="/results" element={<Results />} />
                <Route path="/about" element={<About />} />
                <Route
                  path="/admin"
                  element={<Admin setUsername={setUsername} />}
                />
                <Route path="/imprint" element={<Imprint />} />
                <Route path="/privacy" element={<Privacy />} />
              </Routes>
            </>
          )}
          <Footer loading={isLoadingLoginInfo !== ""} />
        </LoginContext.Provider>
      </InfoContext.Provider>
    </>
  );
};
