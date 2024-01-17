import React from 'react';
import styles from './style/TotalPrice.module.css';
import { convertNumberToWon } from '@/shared/helper';
import { MenuItemWithOption } from '@/types/supabase';
import { getTotalPrice } from '@/shared/store/order';

const TotalPrice = ({ itemList }: { itemList: MenuItemWithOption[] }) => {
  return (
    <div className={styles.container}>
      <span>총 결제금액</span>
      <span className={styles.totalPrice}>{convertNumberToWon(getTotalPrice(itemList))}</span>
    </div>
  );
};

export default TotalPrice;
