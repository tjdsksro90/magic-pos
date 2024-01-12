import useManagementState from '@/shared/store/management';

const Header = () => {
  const {
    date: { currentDate },
    setCurrentDate,
  } = useManagementState();
  const clickPreMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'month'));
  };
  const clickNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, 'month'));
  };

  return (
    <div className="header" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className="wrapper">
        <span className="text" style={{ display: 'flex', gap: '1rem' }}>
          <span className="text-year">{currentDate.clone().format('YYYY')}</span>
          {currentDate.clone().format('MMMM')}
        </span>
      </div>
      <div className="btn-group">
        <span className="left-btn" style={{ display: 'inline-block', marginRight: '10px' }} onClick={clickPreMonth}>
          이전
        </span>
        <span className="right-btn" onClick={clickNextMonth}>
          다음
        </span>
      </div>
    </div>
  );
};

export default Header;
