import { useState } from "react";
import { BarLoader } from "react-spinners";
import Button from "../components/Button/Button";
import CustomForm from "../components/Form/CustomForm";
import InputField from "../components/Form/Field/InputField";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "../utils/axios";
import formateError from "../utils/formateError";
const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const decoded = jwt_decode(token);

  //   Todo: Form Validation
  const fields = {
    password: "",
    confirm_password: "",
    showPass: false,
  };
  //   Todo: Form Validation
  const validation = yup.object().shape({
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "⚠️ Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("⚠️ Password is required"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "⚠️ Password must match"),
  });

  //   Todo: Submit Handler
  const submitHandler = async (
    { password, confirm_password },
    { resetForm }
  ) => {
    if (loading) return;
    if (password !== confirm_password) {
      return toast.error("Password Not Same", {
        position: "bottom-right",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    try {
      setLoading(true);
      const data = await axios.post(`/reset/password/${token}`, {
        password,
        confirm_password,
        email: decoded.email,
      });
      if (data.status === 200) {
        toast.success(data.data.message, {
          position: "bottom-right",
          autoClose: 10000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
        });
      }
      resetForm();
      setLoading(false);
      navigate("/signin");
    } catch (err) {
      toast.error(formateError(err), {
        position: "bottom-right",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setLoading(false);
    }
  };

  return (
    <div className="form__wrapper shadow-lg p-5 bg-white  lg:w-2/6 md:w-3/6 w-5/6 rounded-lg">
      <h2 className="text-2xl font-bold text-left">Reset Password 🔐</h2>
      <CustomForm
        fields={fields}
        validation={validation}
        onSubmit={submitHandler}
        getValues={({ showPass }) => {
          setTimeout(() => {
            setIsShowPass(showPass);
          }, 0);
        }}
      >
        {/* Password  */}
        <InputField
          type={isShowPass ? "text" : "password"}
          name="password"
          placeholder="Password"
        />
        {/* Confirm Password */}
        <InputField
          type={isShowPass ? "text" : "password"}
          name="confirm_password"
          placeholder="Confirm Password"
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
        <br />
        {/* Submit Button */}
        <Button className="mt-3" text={loading ? "Wait..." : "Reset"}>
          <BarLoader id="spinner" loading={loading} disabled={loading} />
        </Button>
      </CustomForm>
    </div>
  );
};

export default ResetPassword;
