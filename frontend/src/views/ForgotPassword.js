import React from "react";
import CustomForm from "../components/Form/CustomForm";
import * as yup from "yup";

const ForgotPassword = () => {
  const submitHandler = (values) => {
    console.log(values);
  };
  const validation = yup.object().shape({
    email: yup.string().required("Email is required"),
  });
  return (
    <div>
      <CustomForm
        fields={{ email: "" }}
        validation={validation}
        onSubmit={submitHandler}
      />
    </div>
  );
};

export default ForgotPassword;
