import moment, { Moment } from 'moment';
import { create } from 'zustand';

interface ManagementState {
  isShow: boolean;
  recordType: string;
  date: {
    currentDate: Moment;
    utcStandardDate: Moment;
    selectedDate: Moment;
  };
  data: {
    x: string;
    y: number;
  }[];
  setIsShow: (param?: boolean) => void;
  setData: (sales: { x: string; y: number }[]) => void;
  setCurrentDate: (day: Moment) => void;
  setSelectedDate: (day: Moment) => void;
  setRecordType: (date: string) => void;
}

const useManagementState = create<ManagementState>()(set => ({
  data: [],
  isShow: false,
  recordType: '',
  date: {
    currentDate: moment(),
    selectedDate: moment().clone(),
    // utcStandardDate는 supabase의 Sales에서 데이터를 가져올 때 사용합니다.
    utcStandardDate: moment().hour(0).subtract(9, 'hour'),
  },

  /**
   */
  setRecordType: prop =>
    set(state => ({
      ...state,
      recordType: prop,
    })),
  setData: prop =>
    set(state => ({
      ...state,
      data: prop,
    })),
  setIsShow: prop =>
    set(state => ({
      ...state,
      isShow: prop ? prop : !state.isShow,
    })),
  setCurrentDate: prop =>
    set(state => ({
      ...state,
      date: {
        ...state.date,
        currentDate: prop,
      },
    })),
  setSelectedDate: prop =>
    set(state => ({
      ...state,
      date: {
        ...state.date,
        selectedDate: prop,
      },
    })),
}));

export default useManagementState;
