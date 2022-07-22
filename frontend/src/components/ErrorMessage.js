import React from "react";

const ErrorMessage = ({ error }) => {
  return (
    <div className="md:w-6/12 p-5 mx-auto mt-5 bg-red-300  h-44 rounded-xl text-gray-500 flex items-center justify-center text-5xl font-bold">
      <p>❌ {error}</p>
    </div>
  );
};

export default ErrorMessage;
