import moment from 'moment';
import create from 'zustand';

const useCalendarStore = create(set => ({
  selectedDate: moment().format('YYYY-MM-DD'),
  setSelectedDate: (date: Date) => set({selectedDate: date}),
}));

export default useCalendarStore;
