import React, { useState } from "react";
import { Link } from "react-router-dom";
import getQueryString from "../utils/getQueryString";
const SignIn = () => {
  const { redirect } = getQueryString(["redirect"]);
  const [isShowPass, setIsShowPass] = useState(false);

  return (
    <div>
      <div className="form__wrapper shadow-lg p-5  lg:w-2/6 md:w-3/6 w-5/6 rounded-lg">
        <h3 className="text-5xl font-bold my-10 text-center">
          Sign
          <span className="text-yellow-500"> In</span>
        </h3>
        <form className="">
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
              type={isShowPass ? "text":"password"}
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

          <div>
            <button className="bg-yellow-500 py-4 px-5 rounded-xl font-2xl font-bold hover:bg-yellow-600">
              Sign In
            </button>
          </div>
          <div>
            <p className="font-bold text-lg mt-3">
              New Customer?{" "}
              <Link
                className="text-blue-600 underline"
                to={`/signup?redirect=${redirect}`}
              >
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
