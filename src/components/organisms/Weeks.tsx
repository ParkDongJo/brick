import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components';
import {WEEK} from '../../constants';

const Weeks: React.FC<Props> = props => {
  const {routine} = props;

  return (
    <Container>
      {Object.values(WEEK).map(day => {
        return (
          <View>
            {routine.includes(day) ? (
              <ColoredWeekText>{day}</ColoredWeekText>
            ) : (
              <WeekText>{day}</WeekText>
            )}
          </View>
        );
      })}
    </Container>
  );
};
export default Weeks;

type Props = {
  routine: WEEK[];
};

const Container = styled(Text)`
  font-size: 14px;
  font-weight: bold;
`;
const WeekText = styled(Text)`
  font-size: 14px;
  border: 0.5px solid #808080;
  border-radius: 15px;
  padding: 5px 5px;
  background-color: #eeeeee;
  margin: 0 4px;
  color: #808080;
`;
const ColoredWeekText = styled(Text)`
  font-size: 14px;
  border: 0.5px solid #000;
  border-radius: 15px;
  padding: 5px 5px;
  background-color: #fff44f;
  margin: 0 4px;
`;
