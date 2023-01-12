import React, { useState, useReducer, useContext, useEffect } from 'react';
import { BarLoader } from 'react-spinners';
import Button from '../components/Button/Button';
import CustomForm from '../components/Form/CustomForm';
import * as yup from 'yup';
import Field from '../components/Form/Field/InputField';
import flashMessage from '../utils/flashMessage';
import { Store } from '../Store/Store';
import useFetch from '../Hocks/useFetch';
const initialState = {
  loading: false,
  image: '',
};
const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'IMAGE_UPLOAD_REQUEST':
      return { ...state, loading: true };
    case 'IMAGE_UPLOAD_SUCCESS':
      return { ...state, loading: false, image: payload };
    case 'IMAGE_UPLOAD_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};
const Profile = () => {
  const [isShowPass, setIsShowPass] = useState(false);
  const {
    state: { userInfo },
  } = useContext(Store);
  const [options, setOptions] = useState({
    method: null,
    body: null,
    private: true,
  });
  const {
    data,
    error,
    loading,
    dispatch: fetchDispatch,
  } = useFetch({
    url: '/profile',
    options: options,
  });
  const [{ loading: imageLoading, image }, dispatch] = useReducer(reducer, {
    ...initialState,
    image: userInfo?.image?.url,
  });

  //   Change Information
  const handleOnSubmit = ({ name, email, password, confirm_password }) => {
    if (
      (name.length ||
        email.length ||
        password.length ||
        confirm_password.length) &&
      image
    ) {
      setOptions({
        method: 'put',
        body: {
          name,
          email,
          image,
          password,
          confirm_password,
        },
        private: true,
      });
      if (error) {
        flashMessage({ type: 'error', text: error });
      }
      console.log(data);
      if (data) {
        console.log(data);
        flashMessage({ type: 'success', text: 'Update Successful' });
      }
    }
  };
  useEffect(() => {
    if (data) {
      console.log(data);
      flashMessage({ type: 'success', text: 'Update Successful' });
    }
    console.log(data)
  }, [data]);

  // Handle Image Upload
  const reader = new FileReader();
  const handleImageOnclick = (e) => {
    dispatch({ type: 'IMAGE_UPLOAD_REQUEST' });
    const file = e.target.files[0];
    const fileType = file.type;
    const validImageType = ['image/jpeg', 'image/png', 'image/gif'];
    if (validImageType.includes(fileType)) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        dispatch({ type: 'IMAGE_UPLOAD_SUCCESS', payload: reader.result });
      };
    } else {
      flashMessage({ type: 'error', text: '❌Unsupported file!' });
      dispatch({ type: 'IMAGE_UPLOAD_FAIL' });
    }
  };
  //   Get value for show or hide password box
  const getValues = (values) => {
    setTimeout(() => {
      setIsShowPass(values);
    }, 0);
  };
  //   Validate Input Field
  const validationSchema = yup.object().shape({
    name: yup.string(),
    email: yup.string().email('Please Enter Valid Email'),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        '⚠️ Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
    confirm_password: yup.string().when('password', {
      is: (value) => value && value.length > 0,
      then: yup
        .string()
        .required()
        .oneOf([yup.ref('password'), null], '⚠️ Password must match'),
      otherwise: yup.string(),
    }),
  });
  return (
    <div className='form__wrapper shadow-lg p-5 bg-white  lg:w-2/6 md:w-3/6 w-5/6 rounded-lg'>
      <div className='image__wrapper py-3'>
        <img
          className='h-32 mt-3 avater__profile'
          src={image}
          alt='profile_pic'
        />
        <span className='pen'>
          <input
            data-testid='imageUploadField'
            onChange={handleImageOnclick}
            className='hidden'
            type='file'
            name='file'
            id='file'
          />
          <label htmlFor='file'>
            <i className='fa-solid fa-pen'></i>
          </label>
        </span>
        {imageLoading && (
          <span className='spinner'>
            <i className='fa-solid fa-spinner'></i>
          </span>
        )}
      </div>
      <CustomForm
        onSubmit={handleOnSubmit}
        fields={{ name: '', email: '', password: '', confirm_password: '' }}
        getValues={(values) => getValues(values.showPass)}
        validation={validationSchema}
      >
        <Field type='text' name='name' placeholder={userInfo.name}>
          <label
            htmlFor='name'
            className='text-2xl e font-bold mb-3 inline-block'
          >
            Name
          </label>
        </Field>
        <Field type='email' name='email' placeholder={userInfo.email}>
          <label
            htmlFor='email'
            className='text-2xl  font-bold mb-3 inline-block'
          >
            Email
          </label>
        </Field>
        <Field type={isShowPass ? 'text' : 'password'} name='password'>
          <label
            htmlFor='password'
            className='text-2xl font-bold mb-3 inline-block'
          >
            Password
          </label>
        </Field>
        <div className=' font-bold select-none'>
          <Field
            type='checkbox'
            name='showPass'
            className=' w-auto inline mr-3'
          />
          <label htmlFor='showPass'>Show Password</label>
        </div>

        <Field type={isShowPass ? 'text' : 'password'} name='confirm_password'>
          <label
            htmlFor='confirm_password'
            className='text-2xl font-bold mb-3 inline-block'
          >
            Confirm Password
          </label>
        </Field>
        <Button
          role='Button'
          text={loading ? 'Wait...' : 'Change'}
          disabled={loading}
        >
          <BarLoader
            color='#000'
            loading={loading}
            id='spinner'
            cssOverride={{
              marginRight: 10,
            }}
            margin={5}
            size={10}
            disabled={loading}
          />
        </Button>
      </CustomForm>
    </div>
  );
};

export default Profile;
