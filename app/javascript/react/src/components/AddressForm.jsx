/*
Props
	onSubmit: A function that is called when the form is submitted. It receives the location value entered in the form as an argument.
Variables
	form: An instance of the form created by Form.useForm().
Functions
	onFinish(values): A function that is called when the form is successfully submitted. It calls the onSubmit prop with the location value and resets the form fields.
Rendered Components
	Form: The form component from the antd library. It uses the form instance and the onFinish function.
	Form.Item (location): A form item for the location input. It has several validation rules:
	The input is required and must be at least 5 characters long.
	The input must match a specific pattern that includes a city, state, and 5-digit zip code.
	The input must end with a 5-digit zip code.
	The input field uses the Input component from the antd library.
	Form.Item (submit button): A form item for the submit button. It uses the Button component from the antd library.
*/

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
