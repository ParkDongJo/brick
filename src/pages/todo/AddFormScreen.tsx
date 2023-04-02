import React, {useState} from 'react';
import {View, Text, Switch, Button} from 'react-native';
import styled from 'styled-components';
import {Controller, useForm} from 'react-hook-form';
import {useQueryClient, MutationFunction} from '@tanstack/react-query';
import {createOne} from '../../lib/Firebase';
import BasicInput from '../../components/atoms/BasicInput';
import {Rank} from '../../components/molecules/Chips';
import useQueries from '../../hooks/useQueries';
import useTodo from '../../hooks/useTodo';
import {FormData} from '../../types';
import Bagdes from '../../components/molecules/Bagdes';
import PageModal from '../../components/molecules/PageModal';
import TagsInput from '../../components/organisms/TagsInput';
import RadioButtons from '../../components/molecules/RadioButtons';

const AddFormScreen = () => {
  const queryClient = useQueryClient();
  const {useMutaionTodo} = useQueries();
  const mutation = useMutaionTodo(queryClient, createOne as MutationFunction);
  const {addTodo, convertTags} = useTodo(mutation);
  const [modalForTagsVisible, setModalForTagsVisible] = useState(false);
  const [modalForRadioVisible, setModalForRadioVisible] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: {isLoading, errors},
  } = useForm({
    defaultValues: {
      title: '',
      memo: '',
      tags: '',
      time: '',
      rank: 1,
      isLoop: false,
      isDone: false,
      isChecked: false,
    },
  });
  const onSubmit = (data: FormData) => {
    addTodo(data);
  };
  const openModalForTags = () => {
    setModalForTagsVisible(true);
  };
  const openModalForRank = () => {
    setModalForRadioVisible(true);
  };

  return (
    <Container>
      <Text>제목</Text>
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
            placeholderText={'제목을 입력하세요.'}
          />
        )}
        name="title"
      />
      {errors.title && <Text>title is required.</Text>}
      <Text>메모</Text>
      <Controller
        control={control}
        rules={{
          required: false,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <BasicInput
            text={value}
            onBlur={onBlur}
            onChange={onChange}
            placeholderText={'제목을 입력하세요.'}
          />
        )}
        name="memo"
      />
      <Text>반복</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}}) => (
          <Switch value={value} onValueChange={onChange} />
        )}
        name="isLoop"
      />
      <Text>태깅</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {value}}) => <Bagdes labels={convertTags(value)} />}
        name="tags"
      />
      {errors.tags && <Text>tags is required.</Text>}
      <Text>완료</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}}) => (
          <Switch value={value} onValueChange={onChange} />
        )}
        name="isDone"
      />
      <Text>확인</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}}) => (
          <Switch value={value} onValueChange={onChange} />
        )}
        name="isChecked"
      />
      <Text>중요도</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {value}}) => <Text>{value}</Text>}
        name="rank"
      />
      <PageModal
        visible={modalForTagsVisible}
        close={() => setModalForTagsVisible(false)}>
        <TagsInput
          tags={getValues('tags')}
          onComplete={(tags: string) => {
            setValue('tags', tags);
            setModalForTagsVisible(false);
          }}
          onCancel={() => {
            setModalForTagsVisible(false);
          }}
        />
      </PageModal>
      <PageModal
        visible={modalForRadioVisible}
        close={() => setModalForRadioVisible(false)}>
        <RadioButtons
          defaultValue={getValues('rank')}
          datas={[
            {title: '높음', value: 1},
            {title: '중간', value: 2},
            {title: '낮음', value: 3},
          ]}
          onSelect={(rank: Rank) => {
            setValue('rank', rank);
            console.log('dongjo rank', rank);
            setModalForRadioVisible(false);
          }}
          onCancel={() => {
            setModalForRadioVisible(false);
          }}
        />
      </PageModal>
      <Button title="Open Tags" onPress={openModalForTags} />
      <Button title="Open Rank" onPress={openModalForRank} />
      <Button
        title="Button"
        style={bottomButtonStyle}
        onPress={handleSubmit(onSubmit)}
      />
    </Container>
  );
};
export default AddFormScreen;

const Container = styled(View)`
  flex: 1;
`;
const bottomButtonStyle = {
  height: 50,
  alignItems: 'center',
  justifyContent: 'center',
};
