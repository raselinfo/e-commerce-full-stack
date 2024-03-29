import React from 'react';

const colorSchema = {
  primary: {
    backgroundColor: '#EAB308',
  },
  danger: {
    backgroundColor: '#F94444',
  },
  info: {
    backgroundColor: '#86EFAC',
  },
  gray: {
    backgroundColor: '#F3F4F6',
  },
};

const Button = ({
  text = 'Button',
  variant = 'primary',
  className: classes = '',
  onClick,
  disabled = false,
  type = 'submit',
  children,
  role,
}) => {
  return (
    <button
      style={colorSchema[variant]}
      className={` p-1 mt-1 md:px-3 md:py-2 rounded-lg font-bold overflow-hidden relative ${classes}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      role={role}
    >
      {children && children} <span className='block'>{text}</span>
    </button>
  );
};

export default Button;
