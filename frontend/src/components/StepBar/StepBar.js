import React, { useState, useEffect } from "react";
import getQueryString from "../../utils/getQueryString";
import { useNavigate } from "react-router-dom";
const stepBarSchema = [
  {
    id: 1,
    text: "Shipping",
    state: "SHIPPING",
    icon: <i className="fa-solid fa-truck-fast"></i>,
  },
  {
    id: 2,
    text: "Payment",
    state: "PAYMENT",
    icon: <i className="fa-solid fa-credit-card"></i>,
  },
  {
    id: 3,
    text: "Place Order",
    state: "ORDER",
    icon: <i className="fa-solid fa-bag-shopping"></i>,
  },
];

const StepBar = ({ steps = stepBarSchema }) => {
  const navigate = useNavigate();
  const { step } = getQueryString(["step"]);
  const currentStep = step;
  const [states, setStates] = useState([]);
  const lastIndex = (id) => {
    return stepBarSchema.length === id;
  };

  useEffect(() => {
    if (currentStep === "shipping") {
      setStates(["SHIPPING"]);
    } else if (currentStep === "payment") {
      setStates(["SHIPPING", "PAYMENT"]);
    } else if (currentStep === "order") {
      setStates(["SHIPPING", "PAYMENT", "ORDER"]);
    } else {
      navigate("/");
    }
  }, [currentStep, navigate]);

  return (
    <div className="step_container flex  ">
      {steps.map((step) => {
        return (
          <div
            key={step.id}
            className="step text-2xl text-center w-80 flex justify-center items-center flex-col"
          >
            <span
              className={`step_icon
               ${
                 states.includes(step.state)
                   ? !lastIndex(step.id) && "after:bg-yellow-500"
                   : lastIndex(step.id)
                   ? "after:none"
                   : "after:bg-gray-500"
               }
               
               ${states.includes(step.state) ? "bg-yellow-500" : "bg-gray-500"}
             
               w-20 h-20 flex items-center justify-center rounded-full text-3xl text-black `}
            >
              {step.icon}
            </span>
            <span className="block text-white font-bold">{step.text}</span>
          </div>
        );
      })}
    </div>
  );
};

export default StepBar;
