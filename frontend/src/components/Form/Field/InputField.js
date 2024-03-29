import React, { forwardRef } from 'react';
import { Field, ErrorMessage } from 'formik';

/**
 *  InputField
 * @param {{type,fieldName,placeholder,className,value}} {type,fieldName}
 * @returns A input Field
 */
const InputField = (
  {
    type = 'text',
    name: fieldName = 'text',
    placeholder = '',
    className: classes = '',
    children,
  },
  ref
) => {
  return (
    <>
      {children}
      <Field
        type={type}
        name={fieldName || type}
        className={`block shadow-md py-4 px-5 text-lg font-bold rounded-lg w-full mb-3 ${classes}`}
        placeholder={placeholder}
        id={fieldName}
      />

      <ErrorMessage
        data-testid={fieldName || type}
        name={fieldName || type}
        component='p'
        className='text-yellow-600 font-bold'
      />
    </>
  );
};

export default forwardRef(InputField);
