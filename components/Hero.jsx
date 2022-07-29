import React from 'react';
import Image from 'next/image';
import cerry from '../assets/Cherry.png';
import HeroImage from '../assets/HeroImage.png';
import { UilPhone } from '@iconscout/react-unicons';
import Pizza1 from '../assets/p1.jpg';
const Hero = () => {
  return (
    <div className='hero-container'>
      {/* left side */}
      <div className='hero-left'>
        <div className='cerry-div'>
          <span>More than Faster</span>
          <Image src={cerry} alt='/' width={40} height={25} />
        </div>
        <div className='hero-text'>
          <span>Be The Faster</span>
          <span> In Delivery</span>
          <span>
            Your <span style={{ color: 'var(--themeRed)' }}>Pizza</span>
          </span>
        </div>
        <span className='mini-text'>
          Our Mission is to filling your tummy with delicious food and width
          fast and free delivery
        </span>
        <button className='btn'>Get Started</button>
      </div>
      {/* right side */}
      <div className='hero-right'>
        <div className='img-container'>
          <Image src={HeroImage} alt='/' layout='intrinsic' />
        </div>
        <div className='contac-us'>
          <span>Contact Us</span>
          <div>
            <UilPhone color='#fff' />
          </div>
        </div>
        <div className='hero-pizza'>
          <div>
            <Image src={Pizza1} alt='/' objectFit='cover' layout='intrinsic' />
          </div>
          <div className='hero-details'>
            <span>Italian Pizza</span>
            <span>
              <span style={{ color: 'var(--themeRed)' }}>$</span> 7.49
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
