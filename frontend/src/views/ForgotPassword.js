import { useState } from "react";
import CustomForm from "../components/Form/CustomForm";
import * as yup from "yup";
import InputField from "../components/Form/Field/InputField";
import Button from "../components/Button/Button";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import formatError from "../utils/formateError";
import { BarLoader } from "react-spinners";
const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const submitHandler = async ({ email }, data) => {
    if (loading) return;
    if (!email) {
      return toast.error("Enter Email First", {
        position: "bottom-right",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
    try {
      setLoading(true);
      const data = await axios.post("/forgot/password", {
        email,
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
      setLoading(false);
      data.resetForm();
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
  };
  const validation = yup.object().shape({
    email: yup.string().required("⚠️ Email is required"),
  });
  return (
    <div className="form__wrapper shadow-lg p-5 bg-white  lg:w-2/6 md:w-3/6 w-5/6 rounded-lg">
      <h2 className="text-2xl font-bold text-left">Reset Password 🔐</h2>
      <CustomForm
        fields={{ email: "" }}
        validation={validation}
        onSubmit={submitHandler}
      >
        <InputField type="email" name="email" placeholder="Enter Your Email" />
        <Button className="mt-3" text={loading ? "Wait..." : "Reset"}>
          <BarLoader id="spinner" loading={loading} disabled={loading} />
        </Button>
      </CustomForm>
    </div>
  );
};

export default ForgotPassword;
