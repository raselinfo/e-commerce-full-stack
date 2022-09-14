import React, { useEffect, useState } from "react";
import StepBar from "../components/StepBar/StepBar";
import getQueryString from "../utils/getQueryString";
import Payment from "./Payment";
import PlaceOrder from "./PlaceOrder";
import Shipping from "./Shipping";
import { Navigate, useLocation } from "react-router-dom";
const CheckOut = () => {
  const { step } = getQueryString(["step"]);
  let RenderElement = <h1>Loading</h1>;
  const [currentStep, setCurrentStep] = useState(step);
  const location = useLocation();
  useEffect(() => {
    if (step === "shipping") {
      setCurrentStep("shipping");
    } else if (step === "payment") {
      setCurrentStep("payment");
    } else {
      setCurrentStep("order");
    }
  }, [step, location]);

  // Todo: Render Element Conditionally
  if (currentStep === "shipping") {
    RenderElement = Shipping;
  } else if (currentStep === "payment") {
    RenderElement = Payment;
  } else if (currentStep === "order") {
    RenderElement = PlaceOrder;
  } else {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <StepBar />
      <RenderElement />
    </>
  );
};

export default CheckOut;
