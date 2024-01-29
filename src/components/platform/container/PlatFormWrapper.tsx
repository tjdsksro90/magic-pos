import usePlatFormState, {
  resetAddPlatForm,
  resetEditPlatForm,
  resetIsEditMode,
  resetIsRegist,
  setIsRegist,
  setPlatFormStoreId,
} from '@/shared/store/platform';
import useAuthState from '@/shared/store/session';
import { useEffect } from 'react';
import Card from './card/Card';
import Form from './form/Form';
import AddButton from './form/button/Button';
import styles from './styles/container.module.css';
const PlatFormWrapper = () => {
  const storeId = useAuthState(state => state.storeId);
  setPlatFormStoreId(storeId!);
  const isRegist = usePlatFormState(state => state.isRegist);
  const clickCloseForm = () => setIsRegist(false);
  useEffect(() => {
    resetAddPlatForm();
    resetEditPlatForm();
  }, [isRegist]);
  useEffect(() => {
    return () => {
      resetIsRegist();
      resetIsEditMode();
    };
  }, []);
  return (
    <div className={styles.container}>
      <AddButton />
      <Card />
      {isRegist && <Form />}
      {isRegist && <div className={styles.formBg} onClick={clickCloseForm}></div>}
    </div>
  );
};

export default PlatFormWrapper;
