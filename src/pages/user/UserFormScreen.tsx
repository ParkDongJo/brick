import React, {Suspense} from 'react';
import {useSetRecoilState} from 'recoil';
import {View, ActivityIndicator, Text} from 'react-native';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm, FieldErrors} from 'react-hook-form';
import BasicInput from '../../components/atoms/BasicInput';
import BasicButton from '../../components/atoms/BasicButton';
import RadioButtons from '../../components/organisms/RadioButtons';
import LoginForm, {FORM_TYPE} from '../../components/organisms/LoginForm';
import useAuth, {ResponseSignIn} from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import {Gender, Role} from '../../constants';

const UserFormScreen: React.FC = () => {
  const navigation = useNavigation();
  const {show: showToast} = useToast();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      comment: '',
      role: 'runner',
      gender: 'male',
      profileUrl: '',
    },
  });

  const onSubmit = async ({}) => {};

  return (
    <Container>
      <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
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
        <BasicButton title="제출하기" onPress={handleSubmit(onSubmit)} />
      </Suspense>
    </Container>
  );
};
export default UserFormScreen;

const Container = styled(View)`
  flex: 1;
  justify-contents: center;
`;
