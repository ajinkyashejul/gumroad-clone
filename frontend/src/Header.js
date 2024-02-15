import React from "react";
import "./App.css";
import "./Header.css";
import twitterIcon from "./twitter-icon.svg";

const Header = () => {
  return (
    <header className="header">
      <section className="user-avatar-name">
        <img
          className="user-avatar"
          src="https://public-files.gumroad.com/seg9f090bbpmcmq1ec8rz836vwcw"
          alt="Profile Picture"
        />
        <a href="/" style={{ textDecoration: "none", color: "black" }}>
          Easlo
        </a>
      </section>
      <section>
        <form style={{ flexGrow: 1 }} noValidate>
          <fieldset className="input-with-button">
            <input
              type="email"
              aria-label="Your email address"
              placeholder="Your email address"
            />
            <button className="button-primary-outline">Subscribe</button>
          </fieldset>
        </form>
      </section>
      <section>
        <a
          className="button-primary-outline"
          href="https://twitter.com/heyeaslo"
        >
          <img className="icon-twitter" src={twitterIcon} />
        </a>
      </section>
    </header>
  );
};

// const Header = () => {
//   return (
//     <header className="header">
//       <section>
//         <img src="https://public-files.gumroad.com/seg9f090bbpmcmq1ec8rz836vwcw" alt="Profile Picture" />
//         <a href="/" style={{ textDecoration: 'none' }}>Easlo</a>
//       </section>
//       <section>
//         <form style={{ flexGrow: 1 }} noValidate>
//           <fieldset className="input-with-button">
//             <input type="email" aria-label="Your email address" placeholder="Your email address" />
//             <button className="button-primary outline">Subscribe</button>
//           </fieldset>
//         </form>
//       </section>
//       <section className="links">
//         <a className="button" href="https://twitter.com/heyeaslo" target="_blank" rel="noopener noreferrer">
//           <span className="icon icon-twitter"></span>
//         </a>
//       </section>
//     </header>
//   );
// };

export default Header;
