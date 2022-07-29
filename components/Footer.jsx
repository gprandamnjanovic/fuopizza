import React from 'react';
import { UilFacebook, UilGithub, UilInstagram } from '@iconscout/react-unicons';
import logo from '../assets/Logo.png';
import Image from 'next/image';
const Footer = () => {
  return (
    <div className='footer-container'>
      <span>{new Date().getFullYear()} &copy; All Rights Reserved</span>
      <div className='footer-social'>
        <UilFacebook size={45} />
        <UilGithub size={45} />
        <UilInstagram size={45} />
      </div>
      <div className='logo'>
        <Image src={logo} alt='/' width={50} height={50} />
        <span>Fudo</span>
      </div>
    </div>
  );
};

export default Footer;
