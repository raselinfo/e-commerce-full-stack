/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Box, TextField, CircularProgress, Button } from '@mui/material';
import { useLoginMutation } from '../../store/api-slices/auth.api';

interface InputValueType {
  email: {
    value: string;
    error: string;
  };
  password: {
    value: string;
    error: string;
  };
}

function Login() {
  const [inputValue, setInputValue] = useState<InputValueType>({
    email: {
      value: '',
      error: '',
    },
    password: {
      value: '',
      error: '',
    },
  });
  const [login] = useLoginMutation();
  const loading = false;

  // Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: {
        ...[e.target.name],
        value: e.target.value,
        ...(e.target.name === 'email' && !e.target.value.includes('@gmail.com')
          ? { error: 'Invalid Email' }
          : e.target.name === 'password' && e.target.value === ''
          ? { error: 'Invalided password' }
          : ''),
      },
    }));
  };

  const handleSubmit = () => {
    // const formData = new FormData();
    // formData.append('email', inputValue.email.value);
    // formData.append('password', inputValue.password.value);
    // console.log(formData);
    login({
      email: inputValue.email.value,
      password: inputValue.password.value,
    });
  };
  return (
    <Box
      width="100%"
      height="100vh"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box width="50%" height="auto">
        <TextField
          fullWidth
          placeholder="Enter you email"
          type="email"
          error={Boolean(inputValue.email.error)}
          helperText={inputValue.email.error}
          onChange={handleInputChange}
          name="email"
          variant="filled"
          sx={{
            py: '10px',
            mb: '5px',
            fontSize: '30px',
            '& .MuiFilledInput-input': {
              fontSize: '20px',
            },
            '& .MuiFormHelperText-sizeMedium': {
              fontSize: '16px',
            },
          }}
        />
        <TextField
          fullWidth
          placeholder="Enter your password"
          type="password"
          error={Boolean(inputValue.password.error)}
          helperText={inputValue.password.error}
          onChange={handleInputChange}
          name="password"
          variant="filled"
          sx={{
            py: '10px',
            mb: '5px',
            fontSize: '30px',
            '& .MuiFilledInput-input': {
              fontSize: '20px',
            },
            '& .MuiFormHelperText-sizeMedium': {
              fontSize: '16px',
            },
          }}
        />
        <Button
          sx={{ marginTop: '5px', fontWeight: 'bold' }}
          variant="contained"
          size="large"
          type="submit"
          disabled={Boolean(
            inputValue.email.error ||
              inputValue.password.error ||
              !inputValue.email.value ||
              !inputValue.password.value
          )}
          onClick={handleSubmit}
        >
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: 'whitesmoke',
                mr: '5px',
              }}
            />
          )}
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
