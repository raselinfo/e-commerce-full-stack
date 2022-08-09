import React from "react";
import facebook from "../assets/images/icons/facebook.png";
import google from "../assets/images/icons/google.png";
import github from "../assets/images/icons/github.png";
const sizeVarient = {
  small: "w-10",
  medium: "w-16",
  large: "w-3xl",
};
const AuthSocialIcons = ({
  size = "small",
  facebookHandler=undefined,
  googleHandler=undefined,
  githubHandler=undefined,
}) => {
  return (
    <div className="flex gap-6 align-middle justify-center">
      <img
        onClick={facebookHandler}
        className={`${sizeVarient[size]} cursor-pointer`}
        src={facebook}
        alt="facebook"
      />
      <img
        onClick={googleHandler}
        className={`${sizeVarient[size]} cursor-pointer`}
        src={google}
        alt="google"
      />
      <img
        onClick={githubHandler}
        className={`${sizeVarient[size]} cursor-pointer`}
        src={github}
        alt="github"
      />
    </div>
  );
};

export default AuthSocialIcons;
