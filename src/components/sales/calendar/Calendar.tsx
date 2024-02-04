import clsx from 'clsx';
import React from 'react';
import { BIG_MODE, MINI_MODE } from './calendarType/calendarType';
import Cell from './cell/Cell';
import Days from './days/Days';
import Header from './header/Header';
import styles from './styles/calendar.module.css';

/**
 *
 * @param children ReactNode
 * @param mode mini , big
 * @param page page는 조건부 props로 기능을 주고 싶을 때 사용합니다. Cell.tsx, CellItem.tsx에 주석처리로 기능 예시를 써놓았습니다.
 * 물론 page에 따른 CellItem.tsx에서 style을 할 수 있게끔 주석과 예시? 써놓았습니다.
 * @returns
 */
const Calendar = ({ children, mode, page }: CalendarType) => {
  // ischangeView = false  => mini

  return (
    <div
      className={clsx({
        [styles.salesStatus]: mode === MINI_MODE,
        [styles.showCalendar]: mode === BIG_MODE,
      })}
    >
      <div
        className={clsx({
          [styles.statusHeaderWrapper]: mode === MINI_MODE,
          [styles.calendarHeaderWrapper]: mode === BIG_MODE,
        })}
      >
        <Header mode={mode} />
        {children}
      </div>

      <div
        className={clsx({
          [styles.calendarBodyWrapper]: mode === BIG_MODE,
        })}
      >
        <Days mode={mode} />
        <Cell mode={mode} page={page} />
      </div>
    </div>
  );
};

export default React.memo(Calendar);
