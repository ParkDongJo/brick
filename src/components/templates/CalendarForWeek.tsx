import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import styled from 'styled-components';
import useCalendarStore from '../../store/useCalendarStore';

const CalendarForWeek: React.FC<Props> = props => {
  const {onPressHead} = props;
  const [selectedDate, setSelectedDate] = useCalendarStore(state => [
    state.selectedDate,
    state.setSelectedDate,
  ]);
  const [weekStart, setWeekStart] = useState(
    moment().startOf('week').toString(),
  );

  const handlePrevWeek = () => {
    setWeekStart(moment(weekStart).subtract(1, 'week').toString());
  };
  const handleNextWeek = () => {
    setWeekStart(moment(weekStart).add(1, 'week').toString());
  };

  useEffect(() => {
    setWeekStart(moment(selectedDate).startOf('week').toString());
  }, [selectedDate]);

  const renderDay = day => {
    const date = moment(weekStart).add(day, 'days');
    const isSelected = date.isSame(selectedDate, 'day');
    return (
      <Day
        isClicked={isSelected}
        onPress={() => {
          setSelectedDate(date.format('YYYY-MM-DD'));
        }}>
        <DayName>{date.format('ddd')}</DayName>
        <Date>{date.date()}</Date>
      </Day>
    );
  };

  return (
    <Container>
      <Head>
        <TouchableOpacity onPress={onPressHead}>
          <Text>{selectedDate}</Text>
        </TouchableOpacity>
        <Arrows>
          <TouchableOpacity onPress={handlePrevWeek}>
            <Text>{'<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextWeek}>
            <Text>{'>'}</Text>
          </TouchableOpacity>
        </Arrows>
      </Head>
      {/* <Row>
        {[0, 1, 2, 3, 4, 5, 6].map(day => {
          const date = moment(weekStart).add(day, 'days');
          return <DayName>{date.format('ddd')}</DayName>;
        })}
      </Row> */}
      <Row>{[0, 1, 2, 3, 4, 5, 6].map(day => renderDay(day))}</Row>
    </Container>
  );
};
export default CalendarForWeek;

type Props = {
  onPressHead: () => void;
};

const Container = styled(View)`
  width: 100%;
  padding: 10px 20px;
  background-color: #fff;
  flex-direction: column;
`;
const Head = styled(View)`
  width: 100%;
  padding: 10px 10px;
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Arrows = styled(View)`
  width: 50;
  flex-direction: row;
  justify-content: space-between;
`;
const Row = styled(View)`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;
const Day = styled(Pressable)<{isClicked: boolean}>`
  width: 14%;
  padding: 5px 0;
  align-items: center;
  justify-content: center;
  ${({isClicked}) => (isClicked ? 'border-radius: 10px;' : '')}
  ${({isClicked}) => (isClicked ? 'background-color: #eee;' : '')}
`;
const DayName = styled(Text)`
  font-size: 14px;
  color: #999;
  text-align: center;
`;
const Date = styled(Text)`
  margin-top: 5px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;
const WeekTitle = styled(View)`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const styles = StyleSheet.create({
  monthTxt: {
    fontWeight: 'bold',
  },
  weekTxt: {
    fontSize: 15,
  },
  day: {
    width: '14%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
