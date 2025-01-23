import { Form, Input, Button, message } from 'antd';
import { useUser } from '/contexts/UserContext';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await login(values.email, values.password);
      navigate('/');
    } catch {
      message.error('Login failed');
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Email" name="email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </Form>
  );
}

export default LoginForm;
