import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

/**
 * // Todo: Custom Form
 * @param {Object} fields Object
 * @param {Object} validation Yup validation Schema
 * @param {function} onSubmit (values,{setSubmitting})=>{}
 * @returns Values on onSubmit function
 */
const CustomForm = ({ fields, onSubmit, validation }) => {
  const initialValue = {
    ...fields,
  };

  const inputFeilds = Object.keys(fields).map((key) => {
    return (
      <span key={key}>
        <Field type={key} name={key} />
        <ErrorMessage name={key} component="p" />
      </span>
    );
  });

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validation}
      onSubmit={onSubmit}
    >
      {(props) => {
        console.log(props);
        return (
          <Form>
            {inputFeilds}
            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CustomForm;
