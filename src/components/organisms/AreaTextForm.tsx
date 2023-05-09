import React from 'react';
import {View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import styled from 'styled-components';
import BasicButton from '../atoms/BasicButton';
import BasicInput from '../atoms/BasicInput';

const AreaTextForm: React.FC<Props> = ({text, onComplete, placeholderText}) => {
  const {control, handleSubmit} = useForm({
    defaultValues: {
      text,
    },
  });

  const submit = (data: FormData) => {
    onComplete(data.text);
  };

  return (
    <>
      <Controller
        control={control}
        rules={{
          required: false,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <BasicInput
            text={value}
            height={150}
            placeholderText={placeholderText}
            mutiline={true}
            onChange={onChange}
            onBlur={onBlur}
            onSubmitEditing={handleSubmit(submit)}
          />
        )}
        name="text"
      />
      <Group>
        <BasicButton title={'초기화'} onPress={() => {}} />
        <BasicButton title={'저장'} onPress={() => {}} />
      </Group>
    </>
  );
};
export default AreaTextForm;

type Props = {
  text: string;
  onComplete: (text: string) => void;
  placeholderText: string;
};
type FormData = {
  text: string;
};

const Group = styled(View)`
  flex-direction: row;
  justify-content: center;
`;
