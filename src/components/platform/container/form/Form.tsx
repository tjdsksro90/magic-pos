import usePlatForm from '@/hooks/platform/usePlatForm';
import usePlatFormState from '@/shared/store/platform';
import FormButton from './FormButton/FormButton';
import FormBody from './formBody/FormBody';
import FormHeader from './formHeader/FormHeader';
import styles from './styles/form.module.css';

const Form = () => {
  const isEdit = usePlatFormState(state => state.isEdit);
  const { submitAddCard, submitEditCard, editPending } = usePlatForm();

  return (
    <form onSubmit={!isEdit ? submitAddCard : submitEditCard} className={styles.formContainer}>
      <FormHeader mode={isEdit} />
      <FormBody mode={isEdit} />
      <FormButton mode={isEdit} isPending={editPending} />
    </form>
  );
};

export default Form;
