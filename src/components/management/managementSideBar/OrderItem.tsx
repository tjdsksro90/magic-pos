import LoadingSpinner from '@/components/common/LoadingSpinner';
import { HOME_PATH } from '@/data/url-list';
import useSetManagement from '@/hooks/management/useSetManagement';
import { useUserTokenFetchQuery } from '@/hooks/query/user-token/useUserTokenFetchQuery';
import { useModal } from '@/hooks/service/ui/useModal';
import useToast from '@/hooks/service/ui/useToast';
import useSendPush from '@/hooks/service/useSendPush';
import { groupByKey } from '@/shared/helper';
import { MenuItemWithOption, OrderDataWithStoreName } from '@/types/supabase';
import dayjs from 'dayjs';
import { IoCheckmark } from 'react-icons/io5';
import styles from './styles/OrderItem.module.css';
import ExclamationMark from '/public/icons/exclamation-mark.svg';

const OrderItem = ({ orderData }: { orderData: OrderDataWithStoreName }) => {
  const { id, order_number, order_id, order_time, menu_list, is_togo } = orderData;
  const menuList: MenuItemWithOption[] = JSON.parse(JSON.stringify(menu_list));
  const { MagicModal } = useModal();
  const { mutate, isPending } = useSetManagement();
  const { userToken } = useUserTokenFetchQuery(order_id);
  const sendPush = useSendPush();
  const { toast } = useToast();

  const group = groupByKey<MenuItemWithOption>(menuList, 'unique');
  const menuName = [...group]?.[0][1].map(item => item.name).join('');
  const otherMenuNum = [...group]?.[0].length - 1;

  const clickOrderConfirmHandler = () => {
    MagicModal.confirm({
      icon: <ExclamationMark width={50} height={50} />,
      content: '주문을 완료할까요?',
      confirmButtonCallback: () => {
        if (userToken) {
          sendPush({
            title: `${order_number}번 주문이 완료되었습니다.`,
            body: `${menuName} 외 ${otherMenuNum}개`,
            token: userToken?.token || '',
            click_action: HOME_PATH,
          });
        } else {
          toast('토큰을 발급받을 수 없습니다. 관리자에게 문의해주세요', {
            type: 'danger',
            position: 'top-right',
          });
          toast(`${order_number}번 주문이 고객에게 알림이 가지 않았습니다.`, {
            type: 'warn',
            position: 'top-right',
          });
        }

        if (typeof is_togo === 'undefined') {
          mutate({ id: id, isTogo: false });
        } else if (typeof is_togo === 'boolean') {
          mutate({ id: id, isTogo: true });
        }
      },
    });
  };

  return (
    <li className={styles['order-list-item']}>
      <div className={styles['item-title']}>
        <span className={styles['order-number']}>주문 번호 {order_number}</span>
        <span className={styles['order-time']}>{dayjs(order_time).format('HH:mm')}</span>
      </div>
      <ul className={styles['menu-list']}>
        {[...group]?.map(([key, item]) => {
          return (
            <li key={key} className={styles['menu-list-item']}>
              <div className={styles['menu-name']}>
                <span>{item[0].name}</span>
                <span>{item.length}</span>
              </div>
              <div className={styles['menu-option']}>
                {item?.map(option => {
                  return (
                    <span key={option.id}>
                      {option.menu_option?.[0]?.menu_option_detail.map(detail => detail.name).join('/')}
                    </span>
                  );
                })}
              </div>
              {/* <div>
                <span>{convertNumberToWon(item.price)}</span>
              </div> */}
            </li>
          );
        })}
      </ul>
      <div className={styles['menu-button-box']}>
        {/*<div>*/}
        {/*  <span>총 금액</span>*/}
        {/*  <span>{total_price} 원</span>*/}
        {/*</div>*/}
        <button onClick={clickOrderConfirmHandler}>
          {isPending ? (
            <LoadingSpinner boxSize={2} ballSize={0.4} interval={1.5} />
          ) : (
            <>
              <IoCheckmark />
              <span>주문완료하기</span>
            </>
          )}
        </button>
      </div>
    </li>
  );
};

export default OrderItem;
