import React from "react";
import {
  numbers,
  lowerCaseLetters,
  upperCaseLetters,
  specialCharecters,
} from "./Charecter";
// import { toast, ToastContainer } from "react-toastify";
//React-Toastify is one of the top React toast libraries available. This tool allows you to add toast notifications to your application with ease and can also be used to set notifications and alerts.
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
      alert("To Generate Password you must select atleast one checkbox");
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
      alert("Password Generated Successfully");
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
      alert(COPY_FAIL);
    } else {
      copyToClipboard(password);
      alert(COPY_SUCCESS);
    }
  };

  /* -------------------------------------------------------------------------- */
  return (
    <div className="container">
      <h2>Password Generator</h2>
      <div className="pass-container">
        <h3 className="pass-box">{password}</h3>
        <i className="icon fa-regular fa-clipboard" onClick={handleCopyPassword}></i>
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
    </div>
  );
}
