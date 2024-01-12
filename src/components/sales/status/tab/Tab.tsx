import { getMonthSales, getTodaySales, getWeekSales } from '@/server/api/supabase/sales';
import { formatData } from '@/shared/helper';
import useManagementState from '@/shared/store/management';
import moment from 'moment';
import Calendar from './calendar/Calendar';

const Tab = () => {
  const {
    date: { currentDate, utcStandardDate },
    isShow,
    setData,
    setIsShow,
    setCurrentDate,
    setSelectedDate,
  } = useManagementState();

  const clickShowCalendarHandler = () => setIsShow(true);

  const today = moment();
  const yesterDay = today.clone().subtract(1, 'day');

  const clickMoveYesterdayHandler = () => {
    if (yesterDay === currentDate) return;
    setCurrentDate(yesterDay);
    setSelectedDate(yesterDay);
  };

  const clickMoveTodayHandler = async () => {
    if (today === currentDate) return;
    const { sales, formatType } = await getTodaySales(utcStandardDate.clone());
    if (sales.length !== 0) {
      const refineData = formatData(sales, formatType);
      setData(refineData!);
    }
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const clickWeeksChartHandler = async () => {
    const { sales, formatType } = await getWeekSales(utcStandardDate.clone());
    if (sales.length !== 0) {
      const refineData = formatData(sales, formatType);
      setData(refineData!);
    }
  };

  const clickMonthsChartHandler = async () => {
    const { sales, formatType } = await getMonthSales(utcStandardDate.clone());
    if (sales.length !== 0) {
      const refineData = formatData(sales, formatType);
      setData(refineData!);
    }
  };

  return (
    <div>
      <div>
        <span onClick={clickMoveYesterdayHandler}>어제</span>
        <span onClick={clickMoveTodayHandler}>오늘</span>
        <span onClick={clickWeeksChartHandler}>이번 주</span>
        <span onClick={clickMonthsChartHandler}>이번 달</span>

        {isShow ? (
          <Calendar />
        ) : (
          <span onClick={clickShowCalendarHandler}>{currentDate.format('YYYY년 MM월 DD일')}</span>
        )}
      </div>
    </div>
  );
};

export default Tab;
