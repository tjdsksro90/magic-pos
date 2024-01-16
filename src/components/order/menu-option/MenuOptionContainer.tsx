import React from 'react';
import useOrderStore from '@/shared/store/order';
import Image from 'next/image';
import styles from './styles/MenuOptionContainer.module.css';
import MenuInfo from '@/components/order/menu-option/MenuInfo';
import OptionRow from '@/components/order/menu-option/OptionRow';
import Amount from '@/components/order/menu-option/Amount';
import TotalPrice from '@/components/order/common/TotalPrice';

const MenuOptionContainer = () => {
  const { selectedMenu, amount } = useOrderStore();

  return (
    <>
      {selectedMenu && (
        <section className={styles.container}>
          <Image src={selectedMenu?.image_url ?? ''} alt={selectedMenu?.name ?? ''} width={300} height={300} />
          <MenuInfo />
          {selectedMenu?.menu_option.map(option => <OptionRow key={option.id} option={option} />)}
          <Amount />
          <div className={styles.totalPrice}>
            <TotalPrice allItemList={new Array(amount).fill(true).map(() => selectedMenu)} />
          </div>
        </section>
      )}
    </>
  );
};

export default MenuOptionContainer;
