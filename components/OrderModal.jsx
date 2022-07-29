import React, { useState } from 'react';
import { Modal, useMantineTheme } from '@mantine/core';
import { createOrder } from '../lib/orderHandler';
import toast, { Toaster } from 'react-hot-toast';
import { useStore } from '../store/store';
import { useRouter } from 'next/router';

const OrderModal = ({ opened, setOpened, paymentMethod }) => {
  //modal theme
  const theme = useMantineTheme();
  const router = useRouter();
  //rest cart
  const resetCart = useStore((state) => state.resetCart);
  //total amount
  const total = typeof window !== 'undefined' && localStorage.getItem('total');
  //form data
  const [formData, setFormata] = useState({});

  //input
  const handleInput = (e) => {
    setFormata({ ...formData, [e.target.name]: e.target.value });
  };
  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await createOrder({ ...formData, total, paymentMethod });
    toast.success('Order Placed');
    resetCart();
    {
      typeof window !== 'undefined' && localStorage.setItem('order', id);
    }
    router.push(`/order/${id}`);
  };
  return (
    <Modal
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.35}
      overlayBlur={3}
      opened={opened}
      onClose={() => setOpened(null)}
    >
      <form className='form-container' onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          required
          placeholder='Name'
          onChange={handleInput}
        />
        <input
          type='text'
          name='phone'
          required
          placeholder='Phone Number'
          onChange={handleInput}
        />
        <textarea
          name='address'
          placeholder='Address'
          rows={3}
          onChange={handleInput}
        ></textarea>
        <span>
          You will pay <span>$ {total}</span> on Delivery
        </span>
        <button type='submit' className='btn'>
          Place Order
        </button>
      </form>
      <Toaster />
    </Modal>
  );
};

export default OrderModal;
