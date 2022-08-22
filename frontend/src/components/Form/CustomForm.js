import React from "react";
import { Formik, Form } from "formik";

/**
 * // Todo: Custom Form
 * @param {Object} fields Object
 * @param {Object} validation Yup validation Schema
 * @param {function} onSubmit (values,{setSubmitting})=>{}
 * @returns Values on onSubmit function
 */
const CustomForm = ({ fields, onSubmit, validation, children }) => {
  const initialValue = {
    ...fields,
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validation}
      onSubmit={onSubmit}
    >
      {() => {
        return <Form>{children}</Form>;
      }}
    </Formik>
  );
};

export default CustomForm;
