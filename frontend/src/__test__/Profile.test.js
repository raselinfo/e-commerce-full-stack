/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/prefer-screen-queries */
import '@testing-library/jest-dom';
import Profile from '../views/Profile';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import StoreProvider from '../Store/Store';
import { BrowserRouter } from 'react-router-dom';

describe('Profile', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <StoreProvider>
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      </StoreProvider>
    );
  });

  it('Button Should Be In The Document ✅', () => {
    const button = screen.getByRole('Button');
    expect(button).toBeInTheDocument();
  });

  it('Form fields should be in the document ✅', () => {
    const name = screen.getByLabelText('Name');
    const email = screen.getByLabelText('Email');
    const password = screen.getByLabelText('Password');
    const confirm_password = screen.getByLabelText('Confirm Password');

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(confirm_password).toBeInTheDocument();
  });

  it('Should return error if type wrong email✅', async () => {
    const email = screen.getByLabelText('Email');
    fireEvent.change(email, { target: { value: 'rasel@' } });
    fireEvent.blur(email);

    await waitFor(() => {
      const emailError = screen.getByTestId('email');
      expect(emailError).toHaveTextContent('Please Enter Valid Email');
    });
  });

  it('Should not return any error if type valid email✅', async () => {
    const email = screen.getByLabelText('Email');

    fireEvent.change(email, { target: { value: 'rasel@gmail.com' } });

    fireEvent.blur(email);

    await waitFor(() => {
      const emailError = screen.queryByTestId('email');
      console.log(emailError);
      expect(emailError).not.toBeInTheDocument();
    });
  });
  it('Should return an error if type invalid password ✅', async () => {
    const password = screen.getByLabelText('Password');
    fireEvent.change(password, { target: { value: '12335' } });
    fireEvent.blur(password);
    await waitFor(() => {
      const passwordError = screen.getByTestId('password');
      expect(passwordError).toHaveTextContent(
        '⚠️ Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      );
    });
  });
  it('Should return an error if type wrong confirm Password ✅', () => {
    const password = screen.getByLabelText('Password');
    const confirm_password = screen.getByLabelText('Confirm Password');
    fireEvent.change(password, { target: { value: 'RaBiNA123@' } });
    fireEvent.change(confirm_password, { target: { value: 'RaBiNA123@' } });

    expect(password.value).toBe(confirm_password.value);
  });
});
