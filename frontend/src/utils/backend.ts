import $ from "jquery";
import { deleteCookie, getCookie, setCookie } from "./cookies";

const backendURL: string = import.meta.env.VITE_BACKEND_URL;
export const frontendURL: string = import.meta.env.VITE_FRONTEND_URL;

const shortRememberTimeHours = 4;

export interface sendData {
  [key: string]: string | undefined;
}

export interface responseDataType {
  status: string;
  text: string;
  username?: string;
  token?: string;
}

export interface loginInfoType {
  username: string;
  token: string;
}

export const getLoginInfo = (): loginInfoType | null => {
  const username = getCookie("user-login-name");
  const token = getCookie("user-login-token");
  return token === "" && username === ""
    ? null
    : { token: token, username: username };
};

export const setLoginInfo = (
  username: string,
  token: string,
  days: number = 365
): void => {
  setCookie("user-login-name", username, days);
  setCookie("user-login-token", token, days);
};

export const backendRequest = async (
  url: string,
  data: sendData,
  stayLoggedIn: boolean | null = null,
  adminTransaction: boolean = true
): Promise<responseDataType> => {
  const headers: Record<string, string> = {};
  const login: loginInfoType | null = getLoginInfo();

  if (login && adminTransaction) {
    headers["GSA-Username"] = login.username;
    headers["Authorization"] = `Bearer ${login.token}`;
  }

  return new Promise((resolve, reject) =>
    $.ajax({
      url: backendURL + url,
      method: "POST",
      data: data,
      headers: headers,
      async: true,

      success(result) {
        try {
          const parsedResult = JSON.parse(result);

          if (adminTransaction && parsedResult.status !== "connerror") {
            if (parsedResult.username !== null && parsedResult.token !== null) {
              try {
                const stay: null | boolean =
                  stayLoggedIn ?? !!getCookie("user-stay-loggedin");

                if (stay) {
                  setCookie("user-stay-loggedin", "true", 1000);
                  setLoginInfo(parsedResult.username, parsedResult.token);
                } else {
                  deleteCookie("user-stay-loggedin");
                  setLoginInfo(
                    parsedResult.username,
                    parsedResult.token,
                    shortRememberTimeHours / 24
                  );
                }

                delete parsedResult.username;
                delete parsedResult.token;
              } catch (error) {
                reject({
                  status: "connerror",
                  text:
                    "Update token parameter was set but php response didn't match requirements: " +
                    parsedResult.text,
                });
              }
            } else {
              setLoginInfo("", "");
            }
          }

          if (parsedResult.status === "success") resolve(parsedResult);
          else reject(parsedResult);
        } catch (error) {
          reject({ status: "connerror", text: result });
        }
      },

      error(xhr) {
        reject({
          status: "connerror",
          text: "Verbindung zum Server fehlgeschlagen, bitte informiere den Admin dieser Seite!",
        });
      },
    })
  );
};

export const syncBackendRequest = (
  url: string,
  data: sendData,
  stayLoggedIn: null | boolean = null,
  adminTransaction: boolean = true
): responseDataType => {
  let returnVal: responseDataType = {
    status: "connerror",
    text: "Keine Antwort vom Server",
  };
  const headers: Record<string, string> = {};
  const login: loginInfoType | null = getLoginInfo();

  if (login && adminTransaction) {
    headers["GSA-Username"] = login.username;
    headers["Authorization"] = `Bearer ${login.token}`;
  }

  $.ajax({
    url: backendURL + url,
    method: "POST",
    data: data,
    headers: headers,
    async: false,

    success(result) {
      try {
        const parsedResult = JSON.parse(result);
        returnVal = parsedResult;
      } catch (error) {
        returnVal = { status: "connerror", text: result };
      }
    },

    error(xhr) {
      returnVal = { status: "connerror", text: xhr.statusText };
    },
  });

  if (adminTransaction && returnVal.status !== "connerror") {
    if (returnVal.username !== null && returnVal.token !== null) {
      try {
        const parsed = JSON.parse(returnVal.text);
        const stay: null | boolean =
          stayLoggedIn ?? !!getCookie("user-stay-loggedin");

        if (stay) {
          setCookie("user-stay-loggedin", "true", 1000);
          setLoginInfo(parsed.username, parsed.token);
        } else {
          deleteCookie("user-stay-loggedin");
          setLoginInfo(
            parsed.username,
            parsed.token,
            shortRememberTimeHours / 24
          );
        }

        delete returnVal.username;
        delete returnVal.token;
      } catch (error) {
        console.error(
          "Update token parameter was set but php response didn't match requirements: " +
            returnVal.text
        );
      }
    } else {
      setLoginInfo("", "");
    }
  }

  return returnVal;
};
