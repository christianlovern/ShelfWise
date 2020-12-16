import React from 'react';

const InviteBox = () => {

  return (
    <div className="homepage__invite-container">
        <h2 className="homepage__invite-container-title">Invite your friends!</h2>
        <div className='homepage__invite-container-link'>
            <label className="homepage__invite-container-label">Your link</label>
            <input className="homepage__invite-container-input" readOnly value="www.SplitWise.com/user/Demo"></input>
        </div>
    </div> 
  );
}

export default InviteBox;


