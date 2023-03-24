import React, { useState } from "react";
import { firebaseClient } from "../firebaseClient";
import { Button, DropdownButton } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { BsBoxArrowInRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Firemodal from "./Firemodal";

const Authbar = () => {
  const [error, setError] = useState(null);
  const { currentUser, setCurrentUser, setLoading } = useAuth();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await firebaseClient.auth().signOut();
      setCurrentUser(null);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const getFirstName = (displayName) => {
    return displayName.split(" ")[0];
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = (isOpen) => {
    setDropdownOpen(isOpen);
  };

  return (
    <>
      {!currentUser ? (
        <DropdownButton title="Login / Sign Up" onToggle={handleDropdownToggle}>
          {dropdownOpen && <Firemodal setCurrentUser={setCurrentUser} setError={setError} />}
        </DropdownButton>
      ) : (
        <div className="user-container">
          <Button className="account-btn" variant="primary" as={Link} to="/account">
            <FaUserCircle className="profile-icon" />
            <span className="user-name">{getFirstName(currentUser.displayName) || "Account"}</span>
          </Button>
          <Button className="logout-btn" variant="outline-primary" onClick={handleLogout}>
            <BsBoxArrowInRight className="mr-2" />
            Logout
          </Button>
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
    </>
  );
};

export default Authbar;
