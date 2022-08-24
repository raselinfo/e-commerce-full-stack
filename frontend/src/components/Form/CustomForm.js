import { Formik, Form } from "formik";

/**
 * // Todo: Custom Form
 * @param {Object} fields Object
 * @param {Object} validation Yup validation Schema
 * @param {function} onSubmit (values,{setSubmitting})=>{}
 * @param {function} getValues (values)=>{}
 * @returns Values on onSubmit function
 */
const CustomForm = ({ fields, onSubmit, validation, children, getValues }) => {
  const initialValue = {
    ...fields,
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validation}
      onSubmit={onSubmit}
    >
      {({ values }) => {
        getValues && getValues(values);
        return <Form>{children}</Form>;
      }}
    </Formik>
  );
};

export default CustomForm;
