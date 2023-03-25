import React, { useContext } from "react";

import UserContext from "../Context/User/user.context";

const Header = () => {
  const user = useContext(UserContext);
  const { user_metadata } = user;
  return (
    <div className="navbar">
      <div className="navbarContainer">
        <h1>Coencierge 2.0</h1>
        {user ? (
          <div className="profileHead">
            <img
              src={user_metadata.avatar_url}
              className="profileHead"
              alt=""
            />
          </div>
        ) : (
          "User Not logged in"
        )}
      </div>
    </div>
  );
};

export default Header;
