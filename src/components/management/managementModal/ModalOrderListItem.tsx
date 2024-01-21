import { convertNumberToWon } from '@/shared/helper';
import useManagementStore from '@/shared/store/management';
import { OrderDataWithStoreName, Tables } from '@/types/supabase';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './styles/ModalOrderListItem.module.css';

const ModalOrderListItem = ({ orderData }: { orderData: OrderDataWithStoreName }) => {
  const { order_number, menu_list } = orderData;
  const menuList: Tables<'menu_item'>[] = JSON.parse(JSON.stringify(menu_list));
  const ModalOrderListItemRef = useRef<HTMLLIElement>(null);
  const [isOrderList, setIsOrderList] = useState(false);
  const { orderConfirmData, addOrderConfirmData, removeOrderConfirmData } = useManagementStore();

  const clickOrderCheckHandler = () => {
    setIsOrderList(!isOrderList);

    const orderIdArr = orderConfirmData.map(x => x.id);
    if (typeof orderData?.is_togo === 'undefined') {
      if (!orderIdArr.includes(orderData.id)) {
        addOrderConfirmData({ id: orderData.id, number: orderData.order_number, isTogo: false });
      } else {
        removeOrderConfirmData(orderData.id);
      }
    } else if (typeof orderData?.is_togo === 'boolean') {
      if (!orderIdArr.includes(orderData.id)) {
        addOrderConfirmData({ id: orderData.id, number: orderData.order_number, isTogo: true });
      } else {
        removeOrderConfirmData(orderData.id);
      }
    }
  };
  useEffect(() => {
    ModalOrderListItemRef.current?.style.setProperty('background', `${isOrderList ? 'var(--main-color)' : '#fff'}`);
    ModalOrderListItemRef.current?.style.setProperty('color', `${isOrderList ? '#fff' : '#000'}`);
  }, [isOrderList]);

  return (
    <li className={styles['modal-order-list-item']} ref={ModalOrderListItemRef} onClick={clickOrderCheckHandler}>
      <div className={styles['item-order-number-box']}>
        <span className={styles['item-order-number']}>주문번호 {order_number}</span>
      </div>
      <ul className={styles['item-order-list']}>
        {menuList?.map(item => {
          return (
            <li key={item.id} className={styles['item-order-list-item']}>
              <span>
                <Image src={item.image_url ?? ''} alt="" width="30" height="30" />
              </span>
              <span>{item.name}</span>
              <span>{convertNumberToWon(item.price)}</span>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default ModalOrderListItem;
