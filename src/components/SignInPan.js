import React from "react";
import { useState } from "react";
import LogInForm from "./LogInForm";
import SignInForm from "./SignUpForm";
import SlidingPane from "react-sliding-pane";
const SignInPan = (props) => {
  const [buttonText, setButtonText] = useState("Login to your account");

  const handleLoginClick = () => {
    setButtonText((prevText) =>
      prevText === "Create an account"
        ? "Login to your account"
        : "Create an account",
    );
  };
  return (
    <div>
      <SlidingPane
        className="form-pane"
        isOpen={props.panState}
        title="Register User"
        width="500px"
        onRequestClose={() => props.SetpanState({ isPaneOpen: false })}
      >
        <button
          className="absolute top-15 left-13 text-orange-600 hover:text-orange-700 focus:outline-none"
          onClick={() => {
            handleLoginClick();
          }}
        >
          or {buttonText}
        </button>
        {buttonText === "Login to your account" ? (
          <SignInForm />
        ) : (
          <LogInForm SetpanState={props.SetpanState} />
        )}
      </SlidingPane>
    </div>
  );
};

export default SignInPan;
