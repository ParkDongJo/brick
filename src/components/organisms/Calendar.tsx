import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, Dimensions} from 'react-native';
import moment from 'moment';
import styled from 'styled-components';

const cols = 7;
const marginHorizontal = 2;
const marginVertical = 2;
const width =
  Dimensions.get('window').width / cols - marginHorizontal * (cols + 1);

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());
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
          week.push(
            <Pressable
              key={`${row}-${col}`}
              onPress={() => console.log(currentDay)}>
              <Day>{currentDay}</Day>
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
      <Nav>
        <Pressable onPress={prevMonth}>
          <Text>Prev</Text>
        </Pressable>
        <Text>{currentDate.format('MMMM YYYY')}</Text>
        <Pressable onPress={nextMonth}>
          <Text>Next</Text>
        </Pressable>
      </Nav>
      <Head>
        {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => (
          <Day key={day}>{day}</Day>
        ))}
      </Head>
      {weeks.map((week, index) => {
        return <Week key={index}>{week}</Week>;
      })}
    </Container>
  );
};

export default Calendar;

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

const Week = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
const Day = styled(Text)`
  width: ${width};
  height: 40px;
  margin-top: ${marginVertical};
  margin-bottom: ${marginVertical};
  margin-left: ${marginHorizontal};
  margin-right: ${marginHorizontal};
  text-align: center;
  line-height: 40px;
  font-weight: bold;
  background-color: #eee;
`;
