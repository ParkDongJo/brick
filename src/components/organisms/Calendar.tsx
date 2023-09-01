import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, Dimensions} from 'react-native';
import moment from 'moment';
import styled from 'styled-components';
import useCalendarStore from '../../store/useCalendarStore';

const cols = 7;
const marginHorizontal = 2;
const marginVertical = 2;
const width =
  Dimensions.get('window').width / cols - marginHorizontal * (cols + 1);

const Calendar: React.FC<Props> = props => {
  const {onPressDay} = props;
  const [selectedDate] = useCalendarStore(state => [state.selectedDate]);
  const [currentDate, setCurrentDate] = useState(moment(selectedDate));
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    createCalendar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  const createCalendar = () => {
    const firstDayOfMonth = moment(currentDate).startOf('month').format('d');
    const daysInMonth = moment(currentDate).daysInMonth();
    let day = 1;
    const _weeks = [];
    for (let row = 0; row < 6; row++) {
      if (row === 5 && day > daysInMonth) {
        break;
      }
      const week: JSX.Element[] = [];
      for (let col = 0; col < 7; col++) {
        if ((row === 0 && col < Number(firstDayOfMonth)) || day > daysInMonth) {
          week.push(<Day key={`${row}-${col}`} />);
        } else {
          const currentDay = day;
          console.log(
            'dongjo currentDate ',
            moment(currentDate).format('YYYY-MM'),
          );
          console.log('dongjo selectedDate ', selectedDate);
          week.push(
            <Pressable
              key={`${row}-${col}`}
              onPress={() => {
                const year = currentDate.format('YYYY');
                const month = currentDate.format('MM');
                onPressDay(`${year}-${month}-${currentDay}`);
              }}>
              <Day
                color={col === 0 ? 'red' : '#000'}
                bgColor={
                  `${moment(currentDate).format('YYYY-MM')}-${currentDay}` ===
                  selectedDate
                    ? '#eee'
                    : '#fff'
                }>
                {currentDay}
              </Day>
            </Pressable>,
          );
          day++;
        }
      }
      _weeks.push(week);
    }
    setWeeks(_weeks);
  };

  const prevMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, 'month'));
  };

  const nextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, 'month'));
  };

  return (
    <Container>
      <Year>{currentDate.format('YYYY')}</Year>
      <Nav>
        <Pressable onPress={prevMonth}>
          <Text>{'<'}</Text>
        </Pressable>
        <Month>{currentDate.format('M')}</Month>
        <Pressable onPress={nextMonth}>
          <Text>{'>'}</Text>
        </Pressable>
      </Nav>
      <Head>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <Day>
            <DayName key={day}>{day}</DayName>
          </Day>
        ))}
      </Head>
      {weeks.map((week, index) => {
        return <Week key={index}>{week}</Week>;
      })}
    </Container>
  );
};

export default Calendar;

type Props = {
  onPressDay: (date: string) => void;
};

const Container = styled(View)`
  width: 100%;
`;
const Nav = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 20px;
`;
const Head = styled(View)`
  flex-direction: row;
  justify-content: center;
`;
const Year = styled(Text)`
  font-size: 15px;
  padding: 5px 0;
  text-align: center;
`;
const Month = styled(Text)`
  font-size: 20px;
  font-weight: bold;
`;
const Week = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
const DayName = styled(Text)`
  font-size: 14px;
  color: #999;
  text-align: center;
`;
const Day = styled(Text)<{color?: string; bgColor?: string}>`
  width: ${width};
  height: 40px;
  margin-top: ${marginVertical};
  margin-bottom: ${marginVertical};
  margin-left: ${marginHorizontal};
  margin-right: ${marginHorizontal};
  text-align: center;
  line-height: 40px;
  font-weight: bold;
  color: ${props => props.color || '#000'};
  background-color: ${props => props.bgColor || '#fff'};
`;
