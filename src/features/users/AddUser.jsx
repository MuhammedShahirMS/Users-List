import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import { useState } from "react";
import { userAdded } from "./usersSlice";

export function AddUser() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('123467890');
  const [error, setError] = useState(false);

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  }

  const usersAmount = useSelector((state) => state.users.entries.length);

  const handleClick = () => {
    if (firstName && lastName && phoneNumber) {
      const phoneNumberHasError = isNaN(phoneNumber) || (phoneNumber.trim().length !== 10);
    if(phoneNumberHasError) {
      alert('Please enter valid Phone No.');
      return;
    }
      dispatch(
        userAdded({
          _id: usersAmount,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber
        })
      );

      setError(null);
      history.push("/");
    } else {
      setError("Fill in all fields");
    }

    setFirstName("");
    setLastName("");
    setPhoneNumber("");
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Add User</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <label htmlFor="FnameInput">First Name</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="test"
            id="FnameInput"
            onChange={handleFirstName}
            value={firstName}
          />
          <label htmlFor="LnameInput">Last Name</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="Me"
            id="LnameInput"
            onChange={handleLastName}
            value={lastName}
          />
          <label htmlFor="phoneInput">Phone No.</label>
          <input
            className="u-full-width"
            type="string"
            placeholder="1234567890"
            id="LnameInput"
            onChange={handlePhoneNumber}
            value={phoneNumber}
          />
          {error && error}
          <button onClick={handleClick} className="button-primary">
            Add user
          </button>
        </div>
      </div>
    </div>
  );
}
