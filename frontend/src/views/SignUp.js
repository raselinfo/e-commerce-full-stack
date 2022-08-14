import React, { useCallback, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getQueryString from "../utils/getQueryString";
import { useDropzone } from "react-dropzone";
import axios from "../utils/axios";
import { SyncLoader } from "react-spinners/";
import { toast } from "react-toastify";
import formateError from "../utils/formateError";
import AuthSocialIcons from "../components/AuthSocialIcons";
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
  const [isShowPass, setIsShowPass] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [image, setImage] = useState("");
  const [isError, setIsError] = useState("");

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
  const handleRegister = async (e) => {
    e.preventDefault();
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
  // Todo: Validate Input
  const validateInput = () => {
    return name &&
      email &&
      password &&
      confirmPass &&
      name.length >= 3 &&
      password === confirmPass &&
      password.length >= 8 &&
      email.includes("@gmail.com")
      ? true
      : false;
  };

  // Todo: Google Handler
  const googleHandler = () => {
    console.log("google")
    window.open("http://localhost:4000/api/v1/auth/google", "_self");
  };
  // Todo: Facebook Handler
  const facebookHandler = () => {
    console.log("facebook");
  };
  // Todo: Github Handler
  const githubHandler = () => {
    console.log("github");
  };

  return (
    <div>
      <div className="form__wrapper bg-white shadow-lg mt-20 p-3  lg:w-2/6 md:w-3/6 w-full rounded-lg">
        <h3 className="text-5xl font-bold my-10 text-center">
          Sign
          <span className="text-yellow-500"> UP</span>
        </h3>
        <div className="image__wrapper">
          {image && <img className="h-32 mt-3 avater" src={image} alt={name} />}
        </div>
        <form className="">
          <div className="input__group mb-3">
            <label className="block text-2xl" htmlFor="name">
              Name<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              className="block shadow-md py-4 px-5 text-lg font-bold rounded-lg w-full"
              type="text"
              name="name"
              id="name"
              placeholder="Enter your Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            {name.length < 3 && (
              <p className="text-yellow-600 font-bold">
                Name minimum length should be 3 character
              </p>
            )}
          </div>
          <div className="input__group mb-3">
            <label className="block text-2xl" htmlFor="image">
              Image<span className="text-red-500 font-bold">*</span>
            </label>
            <div
              {...getRootProps()}
              className="border-dashed border-2 py-4 px-5 border-gray-500 mt-2 rounded-lg bg-red-50"
            >
              <input {...getInputProps()} required />
              {isDragActive ? (
                <p>Drop the file here....</p>
              ) : (
                <p>Drop One image here.or click to select files</p>
              )}
            </div>
            <p>{isError}</p>
            {!image && (
              <p className="text-yellow-600 font-bold">Image is required</p>
            )}
          </div>
          <div className="input__group">
            <label className="block text-2xl" htmlFor="email">
              Email<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              className="block shadow-md py-4 px-5 text-lg font-bold rounded-lg w-full"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {!email.includes("@gmail.com") && (
              <p className="text-yellow-600 font-bold">
                Please Write Valid Email
              </p>
            )}
          </div>
          <div className="input__group my-5">
            <label className="block text-2xl" htmlFor="password">
              Password<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              className="block shadow-md py-4 px-5 text-lg font-bold rounded-lg w-full"
              type={isShowPass ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="show" className="text-lg mr-3 select-none">
              Show Password
            </label>
            <input
              onChange={() =>
                setIsShowPass((prev) => {
                  return !prev;
                })
              }
              type="checkbox"
              name="show"
              id="show"
            />
            {password.length < 8 && (
              <p className="text-yellow-600 font-bold">
                Password minimum length should be 8 character
              </p>
            )}
          </div>

          <div className="input__group my-5">
            <label className="block text-2xl" htmlFor="confirm_password">
              Confirm Password<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              className="block shadow-md py-4 px-5 text-lg font-bold rounded-lg w-full"
              type={isShowPass ? "text" : "password"}
              name="confirm_password"
              id="confirm_password"
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPass(e.target.value)}
              required
            />
            {password !== confirmPass && (
              <p className="text-yellow-600 font-bold">Password Not Match!</p>
            )}
          </div>

          <div>
            <button
              onClick={validateInput() && !loading ? handleRegister : undefined}
              className={`py-4 px-5 rounded-xl font-2xl font-bold  ${
                validateInput() && !loading
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-gray-100 text-gray-300"
              }`}
              disabled={validateInput() && !loading ? false : true}
            >
              <div>
                <SyncLoader
                  color="#000"
                  loading={loading}
                  cssOverride={{
                    marginRight: 10,
                  }}
                  margin={5}
                  size={10}
                />
                {!loading ? "Register" : "Wait"}
              </div>
            </button>
          </div>
          <div className="social__wrapper">
            <AuthSocialIcons
              facebookHandler={facebookHandler}
              googleHandler={googleHandler}
              githubHandler={githubHandler}
            />
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
        </form>
      </div>
    </div>
  );
};

export default SignIn;
