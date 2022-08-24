import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import getQueryString from "../utils/getQueryString";
import { useDropzone } from "react-dropzone";
import axios from "../utils/axios";
import { BarLoader } from "react-spinners";

import { toast } from "react-toastify";
import formateError from "../utils/formateError";
import Google from "../components/Google";
import CustomForm from "../components/Form/CustomForm.js";
import InputField from "../components/Form/Field/InputField";
import * as yup from "yup";
import Button from "../components/Button/Button";
const initialState = {
  error: "",
  loading: false,
};
const reducer = (state, { type, payload }) => {
  switch (type) {
    case "REQUEST":
      return { ...state, loading: true };
    case "SUCCESS":
      return { ...state, loading: false };
    case "FAIL":
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
const SignIn = () => {
  const [{ loading, error }, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const { redirect } = getQueryString(["redirect"]);
  const [image, setImage] = useState("");
  const [isError, setIsError] = useState("");
  const [pathName, setPathName] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const googleRef = useRef(null);

  // Todo: Image Dropzone
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setIsError("");
    setImage({});
    const reader = new FileReader();
    if (acceptedFiles.length) {
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(acceptedFiles[0]);
    }

    if (rejectedFiles.length) setIsError(rejectedFiles[0].errors[0].message);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpg": [".jpg", ".png"],
    },
    maxFiles: 1,
    maxSize: 2e6,
  });
  //Todo: Get Redirect Query
  const handleRegister = async ({
    name,
    email,
    password,
    confirm_password,
  }) => {
    if (loading) return;
    if (!image || isError) {
      setIsError("Image Is Required");
      return;
    }

    if (!(name && email && password && confirm_password && image)) {
      return toast.error("Filed is not complete", {
        position: "bottom-right",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }

    dispatch({ type: "REQUEST" });
    try {
      await axios.post("/auth/signup", {
        name,
        email,
        image,
        password,
      });

      dispatch({ type: "SUCCESS" });
      toast.success(
        "Please Check your email box for verify your account.Check also spam folder in your email box.Then Login",
        {
          position: "bottom-right",
          autoClose: 10000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        }
      );

      navigate(`/signin?redirect=${redirect}`);
    } catch (err) {
      dispatch({ type: "FAIL", payload: formateError(err) });
      toast.error(formateError(err), {
        position: "bottom-right",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };
  // Todo:  Input Fields
  const fields = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  // Todo: Yup Validation
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(10, "Name should not be less than 10 character")
      .max(25, "Name should not be more than 25 character")
      .required("Name Is Required"),
    email: yup
      .string()
      .lowercase("Email should be lowercase")
      .email("Field should contain a valid e-mail")
      .required("E-mail is required"),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Password is required"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match"),
  });

  return (
    <div>
      <div className="form__wrapper bg-white shadow-lg mt-20 p-3  lg:w-2/6 md:w-3/6 w-full rounded-lg">
        <h3 className="text-5xl font-bold my-10 text-center">
          Sign
          <span className="text-yellow-500"> UP</span>
        </h3>
        <div className="image__wrapper">
          {image && (
            <img className="h-32 mt-3 avater" src={image} alt="profile_pic" />
          )}
        </div>
        {/* Custom Form */}
        {/* { fields, onSubmit, validation, children, getValues } */}
        <CustomForm
          fields={fields}
          onSubmit={handleRegister}
          validation={validationSchema}
          getValues={({ showPass }) => {
            setTimeout(() => {
              setIsShowPass(showPass);
            }, 0);
          }}
        >
          {/* Name */}
          <label className="block text-2xl" htmlFor="name">
            Name<span className="text-red-500 font-bold">*</span>
          </label>
          <InputField
            placeholder="Enter your name"
            type="text"
            name="name"
            id="name"
          />
          {/* Image */}
          <div id="image" className="mb-3">
            <label className="block text-2xl" htmlFor="image">
              Image<span className="text-red-500 font-bold">*</span>
            </label>
            <div
              {...getRootProps()}
              className="border-dashed border-2 py-8 px-5 border-gray-500 mt-2 rounded-lg bg-red-50"
            >
              <input {...getInputProps()} name="image" />
              {isDragActive ? (
                <p>Drop the file here....</p>
              ) : (
                <p>Drop One image here.or click to select files</p>
              )}
            </div>
            {isError && <p className="text-yellow-600 font-bold">{isError}</p>}
          </div>
          {/* Email */}
          <label className="block text-2xl" htmlFor="email">
            Email<span className="text-red-500 font-bold">*</span>
          </label>
          <InputField
            placeholder="Enter your Email"
            type="Email"
            name="email"
            id="email"
          />
          {/* Password  */}
          <label className="block text-2xl" htmlFor="password">
            Password<span className="text-red-500 font-bold">*</span>
          </label>
          <InputField
            placeholder="Enter Password"
            type={isShowPass ? "text" : "password"}
            name="password"
          />
          {/* Show Password */}
          <label className="select-none" htmlFor="showPass">
            Show Password
          </label>
          <InputField
            type="checkbox"
            name="showPass"
            className=" w-auto inline ml-3"
          />
          {/* Confirm Password */}
          <label className="block text-2xl" htmlFor="confirm_password">
            Confirm Password<span className="text-red-500 font-bold">*</span>
          </label>
          <InputField
            placeholder="Enter Confirm Password"
            type={isShowPass ? "text" : "password"}
            name="confirm_password"
            id="confirm_password"
          />

          {/* Submit Button */}

          <Button
            text={loading ? "Wait..." : "Register"}
            type="submit"
            onClick={() => {
              if (!image || isError) {
                setIsError("Image Is Required");
                return;
              }
            }}
          >
            <BarLoader
              color="#000"
              loading={loading}
              disabled={loading}
              id="spinner"
              cssOverride={{
                marginRight: 10,
              }}
              margin={5}
              size={10}
            />{" "}
          </Button>
        </CustomForm>

        {/* Footer */}
        <div className="social__wrapper flex justify-center" ref={googleRef}>
          <Google isOneTapOpen={false} buttonPlace={googleRef} />
        </div>
        <div>
          <p className="font-bold text-lg mt-3">
            Already have an account?{" "}
            <Link
              className="text-blue-600 underline"
              to={`/signin?redirect=${redirect}`}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
