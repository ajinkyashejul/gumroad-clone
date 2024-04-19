import React, { useState, useRef, useContext } from "react";
import twitterIcon from "./twitter-icon.svg";
import { FlashMessageContext } from "./FlashMessageProvider";

const Header = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const emailRef = useRef();
  const showMessage = useContext(FlashMessageContext);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const currentEmail = emailRef.current.value;
    setEmail(currentEmail);
    const isValid = validateEmail(currentEmail);
    setIsValidEmail(isValid);
    if (isValid) {
      console.log(`Subscribed with email: ${currentEmail}`);
      showMessage();
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <header>
      <ProfileSection />
      <SubscriptionForm
        email={email}
        emailRef={emailRef}
        isValidEmail={isValidEmail}
        handleFormSubmit={handleFormSubmit}
      />
      <LinksSection />
    </header>
  );
};

const ProfileSection = () => (
  <section>
    <img
      className="user-avatar"
      src="https://public-files.gumroad.com/seg9f090bbpmcmq1ec8rz836vwcw"
      alt="Profile Picture"
    />
    <a href="/" style={{ textDecoration: "none" }}>
      Easlo
    </a>
  </section>
);

const SubscriptionForm = ({
  email,
  emailRef,
  isValidEmail,
  handleFormSubmit,
}) => (
  <section>
    <form style={{ flexGrow: 1 }} noValidate onSubmit={handleFormSubmit}>
      <fieldset
        className={`input-with-button ${!isValidEmail ? "danger" : ""}`}
      >
        <input
          type="email"
          aria-label="Your email address"
          placeholder="Your email address"
          ref={emailRef}
        />
        <button disabled={email !== "" && isValidEmail}>Subscribe</button>
      </fieldset>
    </form>
  </section>
);

const LinksSection = () => (
  <section className="links">
    <a className="button" href="https://twitter.com/heyeaslo">
      <img src={twitterIcon} />
    </a>
  </section>
);

export default Header;
