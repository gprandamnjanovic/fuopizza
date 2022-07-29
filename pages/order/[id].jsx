import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { client } from '../../lib/client';
import { UilBill, UilBox } from '@iconscout/react-unicons';
import Image from 'next/image';
import cooking from '../../assets/cooking.png';
import onway from '../../assets/onway.png';
import spinner from '../../assets/spinner.svg';
export const getServerSideProps = async ({ params }) => {
  const query = `*[_type=="order" && _id=='${params.id}']`;
  const order = await client.fetch(query);
  return {
    props: {
      order: order[0],
    },
  };
};
const Order = ({ order }) => {
  // console.log(order);
  useEffect(() => {
    if (order.status > 3) {
      localStorage.clear();
    }
  }, [order]);
  return (
    <Layout>
      <div className='oreder-container'>
        <span className='order-heading'>Order in Progress</span>
        <div className='order-details'>
          <div>
            <span>Order ID :</span>
            <span> {order._id}</span>
          </div>
          <div>
            <span>Customer Name :</span>
            <span> {order.name}</span>
          </div>
          <div>
            <span>Customer Phone :</span>
            <span> {order.phone}</span>
          </div>
          <div>
            <span>Method :</span>
            <span>
              {order.method === 0 ? 'Cash on Delivery' : 'Online Payment(Paid)'}
            </span>
          </div>
          <div>
            <span>Total :</span>
            <span>${order.total}</span>
          </div>
        </div>
        <div className='status-container'>
          <div className='status'>
            <UilBill width={50} height={50} />
            <span>Payment</span>
            {order.method === 0 ? (
              <span className='pending'>On delivery</span>
            ) : (
              <span className='completed'>Completed</span>
            )}
          </div>
          <div className='status'>
            <Image src={cooking} atl='/' width={50} height={50} />
            <span>Cooking</span>
            {order.status === 1 && (
              <div className='spinner'>
                <Image src={spinner} alt='/' />
              </div>
            )}
            {order.status > 1 && <span className='completed'>Completed</span>}
          </div>
          <div className='status'>
            <Image src={onway} alt='/' width={50} height={50} />
            <span>OnWay</span>
            {order.status === 2 && (
              <div className='spinner'>
                <Image src={spinner} alt='/' />
              </div>
            )}
            {order.status > 2 && <span className='completed'>Completed</span>}
          </div>
          <div className='status'>
            <UilBox width={50} height={50} />
            <span>Delivered</span>
            {order.status === 3 && (
              <div className='spinner'>
                <Image src={spinner} alt='/' />
              </div>
            )}
            {order.status > 3 && <span className='completed'>Completed</span>}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
