import "./Login.css";
import React, { useState } from "react";
import Password from "antd/es/input/Password";
import { useAuth } from "../../services/AuthContext";
import LoginService from "../../services/LoginService";
import { Button, Form, Input, notification } from "antd";
import { LoginErrors } from "../../constants/ErrorMessages";
import Notification from "../../components/notification/Notification";

const Login = () => {
  const { login } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  let axiosResponse;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      axiosResponse = await LoginService.logIn(values);
      if (axiosResponse.status !== 200) {
        throw new Error(axiosResponse.status === 401
          ? axiosResponse.response.data.error
          : LoginErrors.loginError
        );
      }
      login(axiosResponse.data);
    } catch (error) {
      axiosResponse = {
        status: axiosResponse.status,
        response: {
          data: { error: error.message || LoginErrors.loginError }
        }
      }
    } finally {
      Notification(api, axiosResponse);
      setLoading(false);
    }
  };

  return (
    <div>
      {contextHolder}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: "El usuario es requerido!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Contraseña" rules={[{ required: true, message: "La contraseña es requerida!" }]}>
          <Password />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
