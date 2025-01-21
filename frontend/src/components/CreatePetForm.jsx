import React, { useState } from 'react';
import { Form, Input, Button, message, InputNumber } from 'antd';
import { createPet } from '../utils/api';

function CreatePetForm({ onPetCreated }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await createPet(values);
      message.success('Pet created successfully!');
      onPetCreated();
    } catch (err) {
      message.error('Failed to create pet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="inline" onFinish={handleSubmit} style={{ marginBottom: '1rem' }}>
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input placeholder="Pet Name" />
      </Form.Item>
      <Form.Item label="Species" name="species" rules={[{ required: true }]}>
        <Input placeholder="Dog, Cat, etc." />
      </Form.Item>
      <Form.Item label="Age" name="age">
        <InputNumber placeholder="Age" min={0} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CreatePetForm;
