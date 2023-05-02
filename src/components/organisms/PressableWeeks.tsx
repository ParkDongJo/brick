import React, {useState} from 'react';
import {Text, Pressable, Button} from 'react-native';
import styled from 'styled-components';
import {WEEK} from '../../constants';

const PressableWeeks: React.FC<Props> = props => {
  const {onComplete} = props;
  const [routine, setRoutine] = useState<WEEK[]>(props.routine);
  const selectDay = (day: WEEK) => {
    setRoutine(
      routine.includes(day)
        ? routine.filter(d => d !== day)
        : [...routine, day],
    );
  };
  const submit = () => {
    onComplete(routine);
  };

  return (
    <Container>
      {Object.values(WEEK).map(day => {
        return (
          <Pressable onPress={() => selectDay(day)}>
            {routine.includes(day) ? (
              <ColoredWeekText>{day}</ColoredWeekText>
            ) : (
              <WeekText>{day}</WeekText>
            )}
          </Pressable>
        );
      })}
      <Button title="완료" onPress={submit} />
    </Container>
  );
};
export default PressableWeeks;

type Props = {
  routine: WEEK[];
  onComplete(routine: WEEK[]): void;
};

const Container = styled(Text)`
  font-size: 14px;
  font-weight: bold;
`;
const WeekText = styled(Text)`
  font-size: 16px;
  padding: 12px;
  background-color: #eeeeee;
  margin: 0 4px;
`;
const ColoredWeekText = styled(Text)`
  font-size: 16px;
  padding: 12px;
  background-color: #fff44f;
  margin: 0 4px;
`;
