import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';
import {Controller, Control, FieldErrors} from 'react-hook-form';
import BasicInput from '../../components/atoms/BasicInput';
import BasicButton from '../../components/atoms/BasicButton';
import RadioButtons from '../../components/organisms/RadioButtons';
import {Gender, Role} from '../../constants';

const UserDetailForm: React.FC<Props> = props => {
  const {control, errors} = props;

  return (
    <Container>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <BasicInput
            text={value}
            onBlur={onBlur}
            onChange={onChange}
            placeholderText={'이름을 입력하세요.'}
          />
        )}
        name="name"
      />
      {errors.name && <Text>name is required.</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <BasicInput
            text={value}
            onBlur={onBlur}
            onChange={onChange}
            placeholderText={'소개를 입력하세요.'}
          />
        )}
        name="comment"
      />
      {errors.name && <Text>name is required.</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange}}) => (
          <RadioButtons
            defaultValue={Gender.male}
            datas={[
              {title: '남성', value: Gender.male},
              {title: '여성', value: Gender.female},
            ]}
            onSelect={onChange}
          />
        )}
        name="gender"
      />
      {errors.gender && <Text>gender is required.</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange}}) => (
          <RadioButtons
            defaultValue={Role.manager}
            datas={[
              {title: '매니저', value: Role.manager},
              {title: '러너', value: Role.runner},
            ]}
            onSelect={onChange}
          />
        )}
        name="role"
      />
      {errors.role && <Text>role is required.</Text>}
    </Container>
  );
};
export default UserDetailForm;

type Props = {
  control: Control<FormData, any>;
  errors: FieldErrors;
};

export type FormData = {
  name: string;
  comment: string;
  role: Role;
  gender: Gender;
  profileUrl: string;
};

const Container = styled(View)`
  flex: 1;
  justify-contents: center;
`;
