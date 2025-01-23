import { Form, Input, Button, message } from 'antd';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const { register } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await register(values.email, values.password);
      message.success('Registration successful');
      navigate('/login');
    } catch {
      message.error('Registration failed');
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
        Register
      </Button>
    </Form>
  );
}

export default RegisterForm;
