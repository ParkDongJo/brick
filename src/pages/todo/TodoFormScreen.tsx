import React, {useState, useLayoutEffect} from 'react';
import {ScrollView, Text, Switch, Button, View} from 'react-native';
import styled from 'styled-components';
import {Controller, useForm} from 'react-hook-form';
import {useQueryClient, MutationFunction} from '@tanstack/react-query';
import {Badge, Color} from '@react-native-material/core';
import {createOne} from '../../lib/Firebase';
import BasicInput from '../../components/atoms/BasicInput';
import {Rank} from '../../components/atoms/Chips';
import useQueries from '../../hooks/useQueries';
import useTodo from '../../hooks/useTodo';
import {FormData, Todo} from '../../types';
import Badges from '../../components/atoms/Badges';
import PageModal from '../../components/organisms/PageModal';
import TagsInput from '../../components/organisms/TagsInput';
import RadioButtons from '../../components/organisms/RadioButtons';
import {useNavigation} from '@react-navigation/native';
import Section from '../../components/atoms/Section';
import StyledText from '../../components/atoms/StyledText';
import Weeks from '../../components/organisms/Weeks';
import PressableWeeks from '../../components/organisms/PressableWeeks';
import AreaTextForm from '../../components/organisms/AreaTextForm';

const TodoFormScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const {useMutaionTodo} = useQueries();
  const mutation = useMutaionTodo(queryClient, createOne as MutationFunction);
  const {addTodo, convertTags} = useTodo(mutation);
  const [modalForTitleVisible, setModalForTitleVisible] = useState(false);
  const [modalForTagsVisible, setModalForTagsVisible] = useState(false);
  const [modalForRadioVisible, setModalForRadioVisible] = useState(false);
  const [modalForMemoVisible, setModalForMemoVisible] = useState(false);
  const [modalForRoutineVisible, setModalForRoutineVisible] = useState(false);
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
      routine: [],
      isLoop: false,
      isDone: false,
      isChecked: false,
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          title="Back"
        />
      ),
    });
  }, [navigation]);

  const onSubmit = (data: FormData) => {
    addTodo(data);
  };
  const getRankData = (rank: number) => {
    return {
      1: {label: '높음', color: 'primary', text: '가장 먼저 처리해봐요'},
      2: {label: '중간', color: 'secondary', text: '중요하지만 급하진 않아요'},
      3: {
        label: '낮음',
        color: 'surface',
        text: '하면 좋지만, 중요하진 않아요',
      },
    }[rank];
  };

  return (
    <Container>
      <Body>
        <Section title={'할 일'} onPress={() => setModalForTitleVisible(true)}>
          <Text>{getValues('title') || '입력된 내용이 없습니다.'}</Text>
        </Section>
        {errors.title && <Text>title is required.</Text>}
        <Section title={'노트'} onPress={() => setModalForMemoVisible(true)}>
          <Text>{getValues('memo') || '입력된 내용이 없습니다.'}</Text>
        </Section>
        <Section
          title={'자동반복'}
          onPress={() => setModalForRoutineVisible(true)}>
          <Weeks routine={getValues('routine')} />
        </Section>
        <Section title={'태깅'} onPress={() => setModalForTagsVisible(true)}>
          {getValues('tags') ? (
            <Badges labels={convertTags(getValues('tags'))} />
          ) : (
            <Text>{'태그가 없습니다.'}</Text>
          )}
        </Section>
        {errors.tags && <Text>tags is required.</Text>}
        <Section title={'완료여부'} hasHead={false}>
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
        </Section>
        <Section title={'확인여부'} hasHead={false}>
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
        </Section>
        <Section title={'중요도'} onPress={() => setModalForRadioVisible(true)}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {value}}) => {
              const datas = getRankData(value);
              if (!datas) {
                return <></>;
              }
              const {label, color, text} = datas;

              return (
                <Row>
                  <Badge label={label || ''} color={color} />
                  <StyledText
                    text={text}
                    fontSize={16}
                    color={'#808080'}
                    bold={false}
                  />
                </Row>
              );
            }}
            name="rank"
          />
        </Section>
        <PageModal
          visible={modalForTitleVisible}
          close={() => setModalForTitleVisible(false)}>
          <AreaTextForm
            text={getValues('title')}
            placeholderText={'할 일을 입력하세요.'}
            onComplete={(title: string) => {
              setValue('title', title);
              setModalForMemoVisible(false);
            }}
          />
        </PageModal>
        <PageModal
          visible={modalForMemoVisible}
          close={() => setModalForMemoVisible(false)}>
          <AreaTextForm
            text={getValues('memo')}
            placeholderText={'기억을 위한 간단한 메모를 입력하세요.'}
            onComplete={(memo: string) => {
              setValue('memo', memo);
              setModalForMemoVisible(false);
            }}
          />
        </PageModal>
        <PageModal
          visible={modalForRoutineVisible}
          close={() => setModalForRoutineVisible(false)}>
          <PressableWeeks
            routine={getValues('routine')}
            onComplete={() => {
              setModalForRoutineVisible(false);
            }}
          />
        </PageModal>
        <PageModal
          visible={modalForTagsVisible}
          close={() => setModalForTagsVisible(false)}>
          <TagsInput
            tags={getValues('tags')}
            onComplete={(tags: string) => {
              setValue('tags', tags);
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
              setModalForRadioVisible(false);
            }}
          />
        </PageModal>
      </Body>
      <Bottom>
        <BottomButton title="추가하기" onPress={handleSubmit(onSubmit)} />
      </Bottom>
    </Container>
  );
};
export default TodoFormScreen;

type Props = Todo & {};

const Container = styled(View)`
  flex: 1;
  background-color: #fff;
`;
const Body = styled(ScrollView)`
  flex: 1;
`;
const Bottom = styled(View)`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 1;
  padding: 5px 10px;
`;
const BottomButton = styled(Button)`
  height: 50
  alignItems: center
  justifyContent: center
`;
const Row = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
