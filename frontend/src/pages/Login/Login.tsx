import { FC, useState, useContext, useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { responseDataType, backendRequest } from "../../utils/backend";
import { useTranslation } from "react-i18next";
import "./Login.scss";
import Infomessage from "../../components/Infomessage";
import { LockOutlined, UserOutlined, WarningOutlined } from "@ant-design/icons";
import { LoginContext } from "../../components/App/App";
import { useNavigate } from "react-router-dom";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export const Login: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loginResponse, setLoginResponse] = useState<responseDataType | null>(
    null
  );
  const [inWaiting, setInWaiting] = useState<boolean>(false);
  const loginInfo = useContext(LoginContext);

  useEffect(() => {
    if (loginInfo !== null) navigate("/admin");
  }, [loginInfo]);

  const onFinish = (values: any) => {
    setInWaiting(true);

    backendRequest("login", values, true, values.remember)
      .then((response) => {
        if (response.status === "success") {
          location.href = "/admin";
        }

        setLoginResponse(response);
      })
      .catch((reason) => {
        setLoginResponse(reason);
      })
      .finally(() => {
        setInWaiting(false);
      });
  };

  return (
    <>
      {["warning", "connerror"].includes(loginResponse?.status ?? "") && (
        <Infomessage key={Math.random()} type="warning">
          <WarningOutlined /> {loginResponse?.text}
        </Infomessage>
      )}

      <Form
        style={{ maxWidth: 500, margin: "auto" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        className="px-7 pb-10"
      >
        <h1 className="text-2xl mb-3">Admin Login</h1>
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="username" prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="password123" prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item<FieldType> name="remember" valuePropName="checked">
          <Checkbox checked>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" loading={inWaiting}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
