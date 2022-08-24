import React, { forwardRef } from "react";
import { Field, ErrorMessage } from "formik";

/**
 *
 * @param {{type,fieldName}} {type,fieldName}
 * @returns A input Field
 */

const InputField = (
  {
    type = "text",
    name: fieldName = "text",
    placeholder = "",
    className: classes = "",
  },
  ref
) => {
  return (
    <>
      <Field
        type={type}
        name={fieldName || type}
        className={`block shadow-md py-4 px-5 text-lg font-bold rounded-lg w-full mb-3 ${classes}`}
        placeholder={placeholder}
        id={fieldName}
      />

      <ErrorMessage
        name={fieldName || type}
        component="p"
        className="text-yellow-600 font-bold"
      />
    </>
  );
};

export default forwardRef(InputField);
