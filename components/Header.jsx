import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import logo from '../assets/Logo.png';
import { UilShoppingBag, UilReceipt } from '@iconscout/react-unicons';
import { useStore } from '../store/store';
import Link from 'next/link';
const Header = () => {
  const [order, setOrder] = useState('');
  useEffect(() => {
    setOrder(localStorage.getItem('order'));
  }, []);
  const items = useStore((state) => state.cart.pizzas.length);
  return (
    <div className='header'>
      {/* logo side */}
      <Link href='/'>
        <div className='logo'>
          <Image src={logo} alt='/' width={50} height={50} />
          <span>Fudo</span>
        </div>
      </Link>
      {/* end logo side */}
      {/* menu side */}
      <ul className='menu'>
        <li>
          <Link href={'/'}>Home</Link>
        </li>
        <li>Menu</li>
        <li>Contact</li>
      </ul>
      {/* end menu side */}
      {/* cart side */}
      <div className='right'>
        <Link href='/cart'>
          <div className='cart'>
            <UilShoppingBag size={35} color='#2e2e2e' />
            <div className='badge'>{items}</div>
          </div>
        </Link>
        {order && (
          <Link href={`/order/${order}`}>
            <div className='cart'>
              <UilReceipt size={35} color='#2e2e2e' />
              {order !== '' && <div className='badge'>1</div>}
            </div>
          </Link>
        )}
      </div>
      {/* end of cart side */}
    </div>
  );
};

export default Header;
