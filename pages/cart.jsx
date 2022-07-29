import React, { useState } from 'react';
import { useStore } from '../store/store';
import Layout from '../components/Layout';
import { urlFor } from '../lib/client';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { TypographyStylesProvider } from '@mantine/core';
import OrderModal from '../components/OrderModal';
import Order from './order/[id]';

const Cart = () => {
  const CardData = useStore((state) => state.cart);
  const removePizza = useStore((state) => state.removePizza);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [order, setOrder] = useState(
    typeof window !== 'undefined' && localStorage.getItem('order')
  );
  const router = useRouter();
  const handleRemove = (i) => {
    removePizza(i);
    toast.error('Item Removed');
  };
  const total = () =>
    CardData.pizzas.reduce((a, b) => a + b.quantity * b.price, 0);

  const handleOnDelivery = () => {
    setPaymentMethod(0);
    typeof window !== 'undefined' && localStorage.setItem('total', total());
  };
  //hanle checkout
  const handleCheckout = async () => {
    typeof window !== 'undefined' && localStorage.setItem('total', total());
    setPaymentMethod(1);
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(CardData.pizzas),
    });
    if (response.status === 500) return;
    const data = await response.json();
    toast.loading('Redirecting...');
    router.push(data.url);
  };
  return (
    <Layout>
      <div className='cart-container'>
        {/* details */}
        <div className='cart-details'>
          <table className='cart-details-table'>
            <thead>
              <th>Pizza</th>
              <th>Name</th>
              <th>Size</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </thead>
            <tbody className='table-body'>
              {CardData.pizzas.length > 0 &&
                CardData.pizzas.map((pizza, i) => {
                  const src = urlFor(pizza.image).url();
                  return (
                    <tr key={i}>
                      <td>
                        <img src={src} alt='pizza' className='img-td' />
                      </td>
                      <td>{pizza.name}</td>
                      <td>
                        {pizza.size === 0
                          ? 'Small'
                          : pizza.size === 1
                          ? 'Medium'
                          : 'Large'}
                      </td>
                      <td>{pizza.price}</td>
                      <td>{pizza.quantity}</td>
                      <td>{pizza.price * pizza.quantity}</td>
                      <td
                        style={{
                          color: 'var(--themeRed)',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleRemove(i)}
                      >
                        X
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {/* summary */}
        <div className='cart-items'>
          <span>Cart</span>
          <div className='cart-total'>
            <div>
              <span>Pizzas</span>
              <span>{CardData.pizzas.length}</span>
            </div>
            <div>
              <span>Total</span>
              <span>${total()}</span>
            </div>
          </div>
          {!order && CardData.pizzas.length > 0 ? (
            <div className='cart-buttons'>
              <button className='btn' onClick={handleOnDelivery}>
                Pay on Delivery
              </button>
              <button className='btn' onClick={handleCheckout}>
                Pay Now
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <Toaster />
      {/* modal */}
      <OrderModal
        opened={paymentMethod === 0}
        setOpened={setPaymentMethod}
        paymentMethod={paymentMethod}
      />
    </Layout>
  );
};

export default Cart;
