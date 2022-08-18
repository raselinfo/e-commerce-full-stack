import { useContext, useEffect } from "react";
import { Store } from "../Store/Store";
import jwt_decode from "jwt-decode";
const Google = ({
  isOneTapOpen = true,
  isOpenLoginButton = true,
  buttonPlace,
}) => {
  const {
    state: { userInfo },
    dispatch: ctxDispatch,
  } = useContext(Store);

  const handleCallbackResponse = (response) => {
    const { email, email_verified, name, picture } = jwt_decode(
      response.credential
    );
  };
  console.log(buttonPlace);

  useEffect(() => {
    if (!(Object.keys(userInfo).length && userInfo.email)) {
      // Global Google
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCallbackResponse,
        ux_mode: "popup",
        cancel_on_tap_outside: false,
      });
      if (isOpenLoginButton) {
        window.google.accounts.id.renderButton(
          // document.getElementById("signInDiv"),
          // Button place is a ref
          buttonPlace?.current,
          {
            theme: "outline",
            size: "large",
            shape: "pill",
          }
        );
      }
      if (isOneTapOpen) {
        window.google.accounts.id.prompt();
      }
    }
  }, [isOneTapOpen, isOpenLoginButton, userInfo, buttonPlace]);

  return <div>{/* <div id="signInDiv"></div> */}</div>;
};

export default Google;
