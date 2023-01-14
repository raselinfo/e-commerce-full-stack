import React, {
  useState,
  useReducer,
  useContext,
  useEffect,
  lazy,
  useCallback,
  useMemo,
} from 'react';
import { Store } from '../Store/Store';
import { BarLoader } from 'react-spinners';
import flashMessage from '../utils/flashMessage';
import useFetch from '../Hocks/useFetch';
import * as yup from 'yup';
const Button = lazy(() => import('../components/Button/Button'));
const CustomForm = lazy(() => import('../components/Form/CustomForm'));
const Field = lazy(() => import('../components/Form/Field/InputField'));

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
  const [isMount, setIsMount] = useState(false);
  const {
    state: { userInfo },
    dispatch: ctxDispatch,
  } = useContext(Store);
  const [options, setOptions] = useState({
    method: null,
    body: null,
    private: true,
  });
  const { data, error, loading } = useFetch({
    url: '/profile',
    options: options,
  });
  const [{ loading: imageLoading, image }, dispatch] = useReducer(reducer, {
    ...initialState,
    image: userInfo?.image?.url,
  });

  //   Change Information
  const handleOnSubmit = (
    { name, email, password, confirm_password },
    { resetForm }
  ) => {
    if (
      name.length ||
      email.length ||
      password.length ||
      confirm_password.length ||
      image.trim().substring(0, 4) !== 'http'
    ) {
      setOptions({
        method: 'PUT',
        body: {
          name,
          email,
          ...(image.trim().substring(0, 4) !== 'http' && { image: image }),
          password,
          confirm_password,
        },
        private: true,
      });
      resetForm();
    }
  };
  // Display success and error message and save the updated data
  useEffect(() => {
    if (data) {
      flashMessage({ type: 'success', text: 'Update Successful' });
      // SAve new user in localStorage
      ctxDispatch({
        type: 'SAVE_USER',
        payload: {
          name: data.data.name,
          image: {
            url: data.data.image,
          },
          email: data.data.email,
          role: data.data.role,
        },
      });
    }
    if (error) {
      flashMessage({ type: 'error', text: error });
    }
    setIsMount(true);
  }, [data, error, ctxDispatch]);

  // Handle Image Upload
  const reader = new FileReader();
  const handleImageOnclick = (e) => {
    dispatch({ type: 'IMAGE_UPLOAD_REQUEST' });
    const file = e.target?.files[0];
    if (!file) {
      flashMessage({ type: 'error', text: '❌Cancel!' });
      dispatch({ type: 'IMAGE_UPLOAD_FAIL' });
      return;
    }
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
    if (isMount) {
      setTimeout(() => {
        setIsShowPass(values);
      }, 0);
    }
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
          role='button'
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
