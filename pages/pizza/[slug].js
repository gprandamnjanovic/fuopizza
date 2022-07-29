import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { client, urlFor } from '../../lib/client';
import Image from 'next/image';
import arrowlefeft from '../../assets/arrowLeft.png';
import arrowright from '../../assets/arrowRight.png';
import { useStore } from '../../store/store';
import toast, { Toaster } from 'react-hot-toast';

const Pizza = ({ pizza }) => {
  console.log(pizza);
  const [size, setSize] = useState(1);
  const [qty, setQty] = useState(1);

  const handleQty = (type) => {
    type === 'inc'
      ? setQty((prev) => prev + 1)
      : qty === 1
      ? null
      : setQty((prev) => prev - 1);
  };
  //add to card
  const addPizza = useStore((state) => state.addPizza);
  const addToCart = () => {
    addPizza({ ...pizza, price: pizza.price[size], quantity: qty, size: size });
    toast.success('Added to Cart');
  };
  const src = urlFor(pizza.image).url();
  return (
    <Layout>
      <div className='pizza-container'>
        <div className='pizza-imag-wrapper'>
          <img src={src} alt='' className='pizza-img' />
        </div>
        {/* righr side */}
        <div className='pizza-right'>
          <span>{pizza.name}</span>
          <span>{pizza.details}</span>
          <span>
            {' '}
            <span style={{ color: 'var(--themeRed)' }}>$</span>
            {pizza.price[size]}
          </span>
          <div className='pizza-size'>
            <span>Size</span>
            <div className='size-variants'>
              <div
                onClick={() => setSize(0)}
                className={size === 0 ? 'selected' : ''}
              >
                Small
              </div>
              <div
                onClick={() => setSize(1)}
                className={size === 1 ? 'selected' : ''}
              >
                Medium
              </div>
              <div
                onClick={() => setSize(2)}
                className={size === 2 ? 'selected' : ''}
              >
                Large
              </div>
            </div>
          </div>
          {/* Quantity */}
          <div className='pizza-qty'>
            <span>Quantity</span>
            <div className='counter'>
              <Image
                src={arrowlefeft}
                alt='/'
                height={20}
                width={20}
                objectFit='contain'
                onClick={() => handleQty('dec')}
              />
              <span>{qty}</span>
              <Image
                src={arrowright}
                alt='/'
                height={20}
                width={20}
                objectFit='contain'
                onClick={() => handleQty('inc')}
              />
            </div>
          </div>
          {/* button */}
          <div className='btn' onClick={addToCart}>
            Add to cart
          </div>
        </div>
        <Toaster />
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type=="pizza" && defined(slug.current)][].slug.current`
  );
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  };
}
export async function getStaticProps(context) {
  const { slug = '' } = context.params;
  const pizza = await client.fetch(
    `*[_type=="pizza" && slug.current=='${slug}'][0]`
  );
  return {
    props: {
      pizza,
    },
  };
}
export default Pizza;
