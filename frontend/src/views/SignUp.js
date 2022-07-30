import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import getQueryString from "../utils/getQueryString";
import { useDropzone } from "react-dropzone";
const SignIn = () => {
  const { redirect } = getQueryString(["redirect"]);
  const [isShowPass, setIsShowPass] = useState(false);
  const [image, setImage] = useState("");
  const [isError, setIsError] = useState("");
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

  return (
    <div>
      <div className="form__wrapper shadow-lg p-5 mt-5  lg:w-2/6 md:w-3/6 w-5/6 rounded-lg">
        <h3 className="text-5xl font-bold my-10 text-center">
          Sign
          <span className="text-yellow-500"> UP</span>
        </h3>
        <div className="image__wrapper">
          {image && <img className="h-32 mt-3 avater" src={image} alt="" />}
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
            />
          </div>
          <div className="input__group mb-3">
            <label className="block text-2xl" htmlFor="image">
              Image<span className="text-red-500 font-bold">*</span>
            </label>
            <div
              {...getRootProps()}
              className="border-dashed border-2 py-4 px-5 border-gray-500 mt-2 rounded-lg bg-red-50"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the file here....</p>
              ) : (
                <p>Drop One image here.or click to select files</p>
              )}
            </div>
            <p>{isError}</p>
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
            />
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
            />
            <label htmlFor="show" className="text-lg mr-3 select-none">
              Show Password
            </label>
            <input
              onChange={(e) =>
                setIsShowPass((prev) => {
                  return !prev;
                })
              }
              type="checkbox"
              name="show"
              id="show"
            />
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
            />
          </div>
          <div>
            <button className="bg-yellow-500 py-4 px-5 rounded-xl font-2xl font-bold hover:bg-yellow-600">
              Register
            </button>
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
