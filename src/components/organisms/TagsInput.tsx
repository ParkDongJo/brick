import React from 'react';
import {View, Button} from 'react-native';
import styled from 'styled-components';
import {Controller, useForm} from 'react-hook-form';
import BasicInput from '../atoms/BasicInput';
import Bagdes from '../atoms/Bagdes';
import useTodo from '../../hooks/useTodo';

const TagsInput: React.FC<Props> = props => {
  const {tags, onComplete} = props;
  const {convertTags} = useTodo();

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: {isLoading, errors},
  } = useForm({
    defaultValues: {
      tags,
      tag: '',
    },
  });

  const submit = (data: FormData) => {
    onComplete(data.tags);
  };
  const addTag = (tag: string) => {
    setValue('tags', `${getValues('tags')}#${tag}`);
  };

  return (
    <>
      <Controller
        control={control}
        rules={{
          required: false,
        }}
        render={({field: {value}}) => <Bagdes labels={convertTags(value)} />}
        name="tags"
      />
      <Controller
        control={control}
        rules={{
          required: false,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <BasicInput
              text={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholderText={'태깅을 입력하세요.'}
              mutiline={false}
              onSubmitEditing={({nativeEvent: {text}}) => {
                setValue('tag', '');
                addTag(text);
              }}
            />
          </>
        )}
        name="tag"
      />
      <Button title="완료" onPress={handleSubmit(submit)} />
    </>
  );
};
export default TagsInput;

type Props = {
  tags: string;
  onComplete: (tags: string) => void;
};
type FormData = {
  tags: string;
  tag: string;
};
