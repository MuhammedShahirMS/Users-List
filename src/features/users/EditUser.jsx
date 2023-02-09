import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { useState } from "react";
import { userUpdated } from "./usersSlice";

export function EditUser() {
  const { pathname } = useLocation();
  const userId = parseInt(pathname.replace("/edit-user/", ""));

  const user = useSelector((state) =>
    state.users.entries.find((user) => user._id === userId)
  );

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

  const handleClick = () => {
    if (firstName && lastName && phoneNumber) {
      const phoneNumberHasError = isNaN(phoneNumber) || (phoneNumber.trim().length !== 10);
    if(phoneNumberHasError) {
      alert('Please enter valid Phone No.');
      return;
    }
      dispatch(
        userUpdated({
          ...user,
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
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Edit user</h1>
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
            Save user 
          </button>
        </div>
      </div>
    </div>
  );
}
