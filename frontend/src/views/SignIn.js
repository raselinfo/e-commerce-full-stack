import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import getQueryString from "../utils/getQueryString";
import axios from "../utils/axios";
import { SyncLoader } from "react-spinners/";
import { toast } from "react-toastify";
import formatError from "../utils/formateError";
import { Store } from "../Store/Store";
const SignIn = () => {
  const { redirect } = getQueryString(["redirect"]);
  const [isShowPass, setIsShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();
  // Todo: Validate Form
  const validateForm = () => {
    return email.includes("@gmail.com") && password.length;
  };

  const singInHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    (async () => {
      try {
        const data = await axios.post("auth/signin", formData);
        if (data.status === 202) {
          ctxDispatch({ type: "SAVE_USER", payload: data.data.data });
          toast.success("Sign In Successful", {
            position: "bottom-right",
            autoClose: 10000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
          });
          setLoading(false);
          navigate(redirect);
        }
      } catch (err) {
        toast.error(formatError(err), {
          position: "bottom-right",
          autoClose: 10000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
        });
        setLoading(false);
      }
    })();
  };

  return (
    <div>
      <div className="form__wrapper shadow-lg p-5 bg-white  lg:w-2/6 md:w-3/6 w-5/6 rounded-lg">
        <h3 className="text-5xl font-bold my-10 text-center">
          Sign
          <span className="text-yellow-500"> In</span>
        </h3>
        <form>
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
            />
            {!email.includes("@gmail.com") && (
              <p className="text-yellow-600 font-bold">
                ⚠️ Only Gmail Accepted
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
            <button
              onClick={singInHandler}
              className={`${
                validateForm()
                  ? " bg-yellow-500  hover:bg-yellow-600"
                  : "bg-gray-100 text-gray-300"
              } py-4 px-5 rounded-xl font-2xl font-bold`}
              disabled={validateForm() ? false : true}
            >
              <SyncLoader
                color="#000"
                loading={loading}
                cssOverride={{
                  marginRight: 10,
                }}
                margin={5}
                size={10}
              />
              {!loading ? "Sign In" : "Wait"}
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
