import Button from '@/components/common/Button';
import QrCodeModal from '@/components/qrCodeModal/QrCodeModal';
import { modeSubText, modeText } from '@/data/admin';
import { useModal } from '@/hooks/service/ui/useModal';
import { useAuthSetQuery } from '@/hooks/query/auth/useAuthSetQuery';
import useSideBar, { setIsSideBarOpen } from '@/shared/store/sidebar';
import useToggleState from '@/shared/store/toggle';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IoLogOutOutline, IoMailOutline, IoQrCodeOutline } from 'react-icons/io5';
import HeaderToggleButton from '../header/HeaderToggleButton';
import styles from '../styles/AdminLayout.module.css';
import SendMail from './SendMail';
import SidebarList from './SidebarList';
import CloseButton from '/public/icons/close.svg';
import Ellipse from '/public/icons/ellipse.svg';

const Sidebar = (adminInfo: AdminCategories) => {
  const [navList, setNavList] = useState(adminInfo.adminCategories);
  const isSideBarOpen = useSideBar(state => state.isSideBarOpen);
  const isMode = useToggleState(state => state.isChecked);
  const targetRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { logout } = useAuthSetQuery();
  const sidebarClass = clsx(styles.navWrapper, {
    [styles.closeNav]: !isSideBarOpen,
  });
  const { MagicModal } = useModal();

  const clickMoveListHandler = useCallback(
    (id: number, url: string) => {
      const currentActive = navList.find(item => item.active === true);
      if (currentActive && currentActive.id === id) return;
      if (url) router.push(url);
      setIsSideBarOpen(false);
    },
    [navList, router],
  );

  const clickQrModalOpenHandler = () => {
    setIsSideBarOpen(false);
    MagicModal.fire(<QrCodeModal />);
  };

  const clickSendMailHandler = () => {
    setIsSideBarOpen(false);
    MagicModal.fire(<SendMail />);
  };

  useEffect(() => {
    const closeSideBar = (e: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(e.target as Node)) {
        setIsSideBarOpen(false);
      }
    };

    const clickListChangeHandler = (url: string) => {
      setNavList(prevNavList =>
        prevNavList.map(item => (item.url === url ? { ...item, active: true } : { ...item, active: false })),
      );
    };

    router.events.on('routeChangeComplete', clickListChangeHandler);
    window.addEventListener('mousedown', closeSideBar);

    return () => {
      router.events.off('routeChangeComplete', clickListChangeHandler);
      window.removeEventListener('mousedown', closeSideBar);
      setIsSideBarOpen(false);
    };
  }, [router.events]);

  return (
    <aside className={sidebarClass} ref={targetRef}>
      <div className={styles.contents}>
        <div className={styles.closeButton}>
          <CloseButton width={40} height={40} onClick={() => setIsSideBarOpen(false)} />
        </div>
        <div className={styles.toggleButton}>
          <HeaderToggleButton />
          <IoQrCodeOutline size={40} onClick={clickQrModalOpenHandler} />
        </div>
        <div className={styles.notification}>
          <Ellipse width={8} height={8} />
          {isMode ? modeText[0] : modeText[1]}
        </div>
        <p>{isMode ? modeSubText[0] : modeSubText[1]}</p>
        <div className={styles.mediaScroll}>
          <ul>
            <SidebarList navList={navList} clickFn={clickMoveListHandler} />
          </ul>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <div className={styles.actionButtonWrapper}>
          <Button type="button" onClick={clickSendMailHandler}>
            <IoMailOutline size={25} />
            문의하기
          </Button>
        </div>
        <p>|</p>
        <div className={styles.actionButtonWrapper}>
          <Button type="button" onClick={() => logout()}>
            <IoLogOutOutline size={25} /> 로그아웃
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
