import React from 'react';
import {View, Pressable, Image, Text} from 'react-native';
import styled from 'styled-components';
import {Controller, useForm} from 'react-hook-form';
import BasicInput from '../atoms/BasicInput';
import useLoginForm from '../../hooks/useLoginForm';
import UserList from '../../components/organisms/UserList';
import users from '../../../fixtures/users';

const AddTarget: React.FC<Props> = props => {
  const {onCancel, onComplete} = props;
  const {emailPattern} = useLoginForm();

  const {
    control,
    handleSubmit,
    formState: {isLoading, errors},
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const cancel = () => {
    onCancel();
  };
  const submit = ({email}: FormData) => {
    onComplete(email);
  };

  return (
    <Container>
      <Head>
        <Controller
          control={control}
          rules={{
            required: false,
            pattern: emailPattern,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Form>
              <Pressable onPress={handleSubmit(submit)}>
                <Icon>{'🔍'}</Icon>
              </Pressable>
              <BasicInput
                text={value}
                onBlur={onBlur}
                onChange={onChange}
                placeholderText={'이메일을 입력하세요.'}
                mutiline={false}
                onSubmitEditing={handleSubmit(submit)}
              />
            </Form>
          )}
          name="email"
        />
      </Head>
    </Container>
  );
};
export default AddTarget;

type Props = {
  onCancel: () => void;
  onComplete: (tags: string) => void;
};
type FormData = {
  email: string;
};

const Container = styled(View)`
  width: 100%;
  flex-direction: column;
`;
const Head = styled(View)`
  padding: 0 20px;
`;
const Body = styled(View)`
  margin-top: 15px;
`;
const Form = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;
const Icon = styled(Text)`
  font-size: 28px;
  padding: 2px;
  text-align: center;
`;
