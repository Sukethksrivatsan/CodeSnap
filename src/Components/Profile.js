import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

function Profile() {
  const { user, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <div className='profile-section'>
        <img className='profile-avatar' src={user.picture} alt={user.name} />
        <div className='profile-drop-down'>
          <h2 className='profile-name'>{user.name}</h2>
          <LogoutButton />
        </div>
      </div>
    );
  } else {
    return (
      <div className='profile-section'>
        <LoginButton />
      </div>
    );
  }
}

export default Profile;
