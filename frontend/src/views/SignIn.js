import React, { useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import getQueryString from "../utils/getQueryString";
import axios from "../utils/axios";
import { BarLoader } from "react-spinners/";
import { toast } from "react-toastify";
import formatError from "../utils/formateError";
import { Store } from "../Store/Store";
import jwt_decode from "jwt-decode";
import Google from "../components/Google";
import CustomForm from "../components/Form/CustomForm";
import InputField from "../components/Form/Field/InputField";
import * as yup from "yup";
import Button from "../components/Button/Button";
const SignIn = () => {
  const { redirect } = getQueryString(["redirect"]);
  const [loading, setLoading] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const { dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();
  const signUpRef = useRef(null);

  //  Todo: Custom Form Configer
  const fields = {
    email: "",
    password: "",
    showPass: "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("⚠️ Please Enter Valid Email")
      .required("⚠️ Email is Required"),
    password: yup
      .string()
      .min(8, "⚠️ Password should be minimum 8 character")
      .required("⚠️ Password is required"),
  });

  const onSubmitHandler = ({ email, password }) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    (async () => {
      try {
        const data = await axios.post("auth/signin", formData);
        if (data.status === 202) {
          const userObject = jwt_decode(data.data.data.token);
          ctxDispatch({
            type: "SAVE_USER",
            payload: {
              email: userObject.email,
              name: userObject.name,
              role: userObject.role,
              id: userObject._id,
              image: userObject.image,
            },
          });
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
  // Get Custom Form Values
  const getValues = (values) => {
    setTimeout(() => {
      setIsShowPass(values);
    }, 0);
  };
  return (
    // <div>
    <div className="form__wrapper shadow-lg p-5 bg-white  lg:w-2/6 md:w-3/6 w-5/6 rounded-lg">
      {/* Header Part */}
      <h3 className="text-5xl font-bold my-10 text-center">
        Sign
        <span className="text-yellow-500"> In</span>
      </h3>

      {/* Custom Form */}
      <div className="input__group">
        <CustomForm
          fields={fields}
          validation={validationSchema}
          onSubmit={onSubmitHandler}
          getValues={(values) => getValues(values.showPass)}
        >
          {/* Email Field */}
          <InputField
            placeholder="Enter Your Email"
            type="email"
            name="email"
          />
          {/* Password Field */}
          <InputField
            placeholder="Enter Your Password"
            type={isShowPass ? "text" : "password"}
            name="password"
          />
          {/* Show Password */}
          <div>
            <label className="select-none" htmlFor="showPass">
              Show Password
            </label>
            <InputField
              type="checkbox"
              name="showPass"
              className=" w-auto inline ml-3"
            />
          </div>
          <Button text={loading ? "Wait..." : "Sign In"} disabled={loading}>
            <BarLoader
              color="#000"
              loading={loading}
              id="spinner"
              cssOverride={{
                marginRight: 10,
              }}
              margin={5}
              size={10}
              disabled={loading}
            />
          </Button>
        </CustomForm>

        {/* Footer Part */}
        <div className="flex justify-center" ref={signUpRef}>
          <Google isOneTapOpen={false} buttonPlace={signUpRef} />
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
      </div>
    </div>
  );
};

export default SignIn;
