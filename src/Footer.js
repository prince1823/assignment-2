import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.leftSide}>
        <p>&#169; 2024 Explorin. All rights reserved.</p>
      </div>
      <div style={styles.rightSide}>
        <a href="https://facebook.com" style={styles.socialIcon}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" style={styles.icon} />
        </a>
        <a href="https://youtube.com" style={styles.socialIcon}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" alt="YouTube" style={styles.icon} />
        </a>
        <a href="https://instagram.com" style={styles.socialIcon}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" style={styles.icon} />
        </a>
        <a href="https://twitter.com" style={styles.socialIcon}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/2491px-Logo_of_Twitter.svg.png" alt="Twitter" style={styles.icon} />
        </a>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: 'orange',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
  },
  leftSide: {
    color: 'white',
  },
  rightSide: {
    display: 'flex',
    gap: '10px',
  },
  socialIcon: {
    display: 'inline-block',
  },
  icon: {
    width: '30px',
    height: '30px',
  },
};

export default Footer;
