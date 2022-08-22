import React from "react";
import CustomForm from "../components/Form/CustomForm";
import * as yup from "yup";
import InputField from "../components/Form/Field/InputField";
import Button from "../components/Button/Button";

const ForgotPassword = () => {
  const submitHandler = (values, data) => {
    console.log(values);
    console.log(data.resetForm());
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
        <Button className="mt-3" text="Reset" />
      </CustomForm>
    </div>
  );
};

export default ForgotPassword;
