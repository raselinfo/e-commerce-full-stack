import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import * as emailLottie from "../Lottie/email.json";
import * as errorLottie from "../Lottie/error.json";
import Confetti from "react-confetti";
import { Link, useParams } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "../components/Loading";
const option = (animateData) => {
  return {
    loop: false,
    autoplay: true,
    animationData: animateData,
  };
};

const VerifyMail = () => {
  const { token, email } = useParams();
  const [isVerify, setIsVerify] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const verifyEmailRequest = async () => {
      try {
        const data = await axios.get(`/verify/email/${email}/${token}`);
        if (data.status === 200) {
          setIsVerify(true);
          setLoading(false);
        }
      } catch (err) {
        setIsVerify(false);
        setLoading(false);
      }
    };
    verifyEmailRequest();
  }, [token, email]);
  return (
    <section>
      {loading ? (
        <Loading />
      ) : isVerify ? (
        <div className="verifyEmail">
          <Lottie
            options={option(emailLottie)}
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
      ) : (
        <div className="verifyEmail">
          <Lottie
            options={option(errorLottie)}
            style={{
              height: "500px",
            }}
            className="emailLottie"
          />
          <p className="text-3xl  text-white font-bold text-center">
            Your session is expire 😥 or your are not registered yet. Please try
            to login.
            <br /> Contact to us ➡ example@exaple.com
          </p>
          <Link
            className="bg-yellow-500 block w-40 font-bold text-3xl text-center mx-auto py-4 px-5 mt-5 rounded-lg hover:bg-yellow-600 transition-all"
            to="/signin"
          >
            Sign In
          </Link>
        </div>
      )}
    </section>
  );
};

export default VerifyMail;
