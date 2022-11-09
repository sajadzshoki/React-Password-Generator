import React from "react";
import {
  numbers,
  lowerCaseLetters,
  upperCaseLetters,
  specialCharecters,
} from "./Charecter";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//React-Toastify is one of the top React toast libraries available. This tool allows you to add toast notifications to your application with ease and can also be used to set notifications and notifys.
export default function Generator() {
  const [password, setPassword] = React.useState("");
  const [passwordLength, setPasswordLength] = React.useState(12);
  const [includeLowerCase, setIncludeLowerCase] = React.useState(true);
  const [includeUpperCase, setIncludeUpperCase] = React.useState(false);
  const [includeNumbers, setIncludeNumbers] = React.useState(false);
  const [includeSymbols, setIncludeSymbols] = React.useState(false);
  //massages
  const COPY_SUCCESS = "password copied successfully to clipboard";
  const COPY_FAIL = "password didn't copied successfully";

  const handleGeneratePassword = () => {
    if (
      !includeLowerCase &&
      !includeUpperCase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      notify("To Generate Password you must select atleast one checkbox");
    } else {
      let characterList = "";
      if (includeLowerCase) {
        characterList = characterList + lowerCaseLetters;
      }
      if (includeUpperCase) {
        characterList = characterList + upperCaseLetters;
      }
      if (includeNumbers) {
        characterList = characterList + numbers;
      }
      if (includeSymbols) {
        characterList = characterList + specialCharecters;
      }
      setPassword(createPassword(characterList));
      notify("Password Generated Successfully");
    }
  };

  const createPassword = (characterList) => {
    let password = "";
    //???????????????????????????????????????????????????
    const characterListLength = characterList.length;
    for (let i = 0; i < passwordLength; i++) {
      const charecterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(charecterIndex);
    }
    return password;
  };

  const copyToClipboard = (password) => {
    navigator.clipboard.writeText(password);
  };
  const handleCopyPassword = () => {
    if (password === "") {
      notify(COPY_FAIL);
    } else {
      copyToClipboard(password);
      notify(COPY_SUCCESS);
    }
  };
  // ????????????????????????????
  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      toast(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }

  /* -------------------------------------------------------------------------- */
  return (
    <div className="container">
      <h2>Password Generator</h2>
      <div className="pass-container">
        <h3 className="pass-box">{password}</h3>
        <i
          className="icon fa-regular fa-clipboard"
          onClick={handleCopyPassword}
        ></i>
      </div>
      <div className="form-container">
        <div className="form-group">
          <label>Password length</label>
          <input
            className="pass-length"
            type="number"
            defaultValue={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
            max="26"
            min="6"
          />
        </div>
        <div className="form-group">
          <label>Add Lowercase Letters</label>
          <input
            type="checkbox"
            checked={includeLowerCase}
            onChange={(e) => setIncludeLowerCase(e.target.checked)}
          />
        </div>
        <div className="form-group">
          <label>Add Uppercase Letters</label>
          <input
            type="checkbox"
            checked={includeUpperCase}
            onChange={(e) => setIncludeUpperCase(e.target.checked)}
          />
        </div>
        <div className="form-group">
          <label>Include Number</label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
        </div>
        <div className="form-group">
          <label>Include Symbols</label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
        </div>
      </div>
      <button className="pass-generate-btn" onClick={handleGeneratePassword}>
        Generate Password
      </button>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
