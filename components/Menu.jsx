import React from 'react';
import { urlFor } from '../lib/client';
import Link from 'next/link';
const Menu = ({ pizzas }) => {
  // console.log(pizzas);
  return (
    <div className='menu-container'>
      <div className='menu-heading'>
        <span>OUR MENU</span>
        <span>Menu That Always</span>
        <span>Make you Fall In Love</span>
      </div>
      <div className='menu'>
        {/* pizzas */}
        {pizzas.map((pizza, id) => {
          const src = urlFor(pizza.image).url();
          return (
            <div className='menu-pizza' key={id}>
              <Link href={`./pizza/${pizza.slug.current}`}>
                <div className='menu-image-wrapper'>
                  <img src={src} alt='/' />
                </div>
              </Link>
              <div className='content'>
                <h3>{pizza.name}</h3>
                <p>
                  <span style={{ color: 'var(--themeRed)' }}> $ </span>
                  {pizza.price[0]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
