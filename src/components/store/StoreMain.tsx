import { useInput } from '@/hooks/service/auth/useInput';
import useAuthState from '@/shared/store/session';
import { useEffect, useState } from 'react';
import Input from '../auth/Input';
import styles from './styles/StoreContents.module.css';
import ConfirmTable from './sub-component/ConfirmTable';
import StoreTimeSet from './sub-component/StoreTimeSet';

const StoreContents = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { session, storeName, storeBno } = useAuthState();
  const userId = session?.user.id || '';
  const email = session?.user.email || '';
  const { value, changeHandler } = useInput({
    storeEmail: email,
    bnoNumber: storeBno || '',
    storeName: storeName || '',
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className={styles.wrapper}>
      {isLoaded && session && (
        <>
          <Input value={value} onChangeHandler={changeHandler} />
          <ConfirmTable />
          <StoreTimeSet userId={userId} />
        </>
      )}
    </section>
  );
};

export default StoreContents;
