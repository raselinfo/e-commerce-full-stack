import React from "react";
import Lottie from "react-lottie";
import * as emailLottie from "../Lottie/email.json";
import Confetti from "react-confetti";
import { Link, useParams } from "react-router-dom";
const option = {
  loop: false,
  autoplay: true,
  animationData: emailLottie,
};

const VerifyMail = () => {
  const { token, email } = useParams();
console.log(token,email)
  return (
    <div className="verifyEmail">
      <Lottie
        options={option}
        style={{
          height: "500px",
        }}
        className="emailLottie"
      />
      <p className="text-5xl text-white font-bold text-center">
        Email Verify Successfully 🥰
      </p>
      <Link
        className="bg-yellow-500 block w-40 font-bold text-3xl text-center mx-auto py-4 px-5 mt-5 rounded-lg hover:bg-yellow-600 transition-all"
        to="/signin"
      >
        Sign In
      </Link>
      <Confetti />
    </div>
  );
};

export default VerifyMail;
