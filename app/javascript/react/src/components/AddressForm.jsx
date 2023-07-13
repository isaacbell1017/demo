import React from 'react';
import { Form, Input, Button } from 'antd';

const AddressForm = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSubmit(values.location);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
				name="location"
				label="Address"
				rules={[
					{ required: true, message: 'Please input your address!' },
					{ min: 5, message: 'Address must be minimum 5 characters.' },
					{
						pattern: /.*,.*,.*\d{5}/,
						message: 'Please include city, state, and zip code in the format: Street, City, State Zip.'
					},
					{
						pattern: /\d{5}$/,
						message: 'Please include a 5-digit zip code.'
					}
				]}
			>
				<Input placeholder="Enter address" />
			</Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddressForm;
