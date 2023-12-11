import React from 'react';

function Footer() {
  return (
    <footer className="bottom">
      <div className="center" aria-label="COPYRIGHT INFORMATION">
        <p>All rights reserved &copy; Matheez Mujahid</p>
      </div>

      <div className="center h-card" aria-label="USER DETAILS">
        <p className="p-name">Matheez Mujahid</p>
        <p className="p-locality">NORTH CAROLINA</p>
        <p className="p-country-name">USA</p>
        <a className="u-email" href="mailto:sagar@example.com">
          Email me
        </a>
      </div>
    </footer>
  );
}

export default Footer;
