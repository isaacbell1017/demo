import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Form } from 'antd';
import AddressForm from './AddressForm';

describe('AddressForm', () => {
  let onSubmit;

  beforeEach(() => {
    onSubmit = jest.fn();
  });

  it('renders without crashing', () => {
    const { getByLabelText } = render(<AddressForm onSubmit={onSubmit} />);
    expect(getByLabelText('Address')).toBeInTheDocument();
  });

  it('calls onSubmit with the form values on successful submission', async () => {
    const { getByLabelText, getByRole } = render(<AddressForm onSubmit={onSubmit} />);
    const input = getByLabelText('Address');
    const submitButton = getByRole('button');

    fireEvent.change(input, { target: { value: '123 Main St, Anytown, CA 12345' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith('123 Main St, Anytown, CA 12345');
    });
  });

  it('does not call onSubmit and shows validation error when the form values are invalid', async () => {
    const { getByLabelText, getByRole, findByText } = render(<AddressForm onSubmit={onSubmit} />);
    const input = getByLabelText('Address');
    const submitButton = getByRole('button');

    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.click(submitButton);

    const errorMessage = await findByText('Address must be minimum 5 characters.');
    expect(errorMessage).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
