import React, {useState, useLayoutEffect} from 'react';
import {Button, View, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import styled from 'styled-components';
import Section from '../../components/atoms/Section';
import PageModal from '../../components/organisms/PageModal';
import AreaTextForm from '../../components/organisms/AreaTextForm';
import TargetList from '../../components/organisms/TargetList';

const TargetsScreen = () => {
  const navigation = useNavigation();
  const [visibleForTargetModal, setVisibleForTargetModal] = useState(false);
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: {isLoading, errors},
  } = useForm({
    defaultValues: {
      target: '',
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

  return (
    <Container>
      <Section title={'목표설정'} hasHead={false}>
        <Pressable
          onPress={() => {
            setVisibleForTargetModal(true);
          }}>
          <Text>{'+ 추가'}</Text>
        </Pressable>
      </Section>
      <TargetList
        datas={[
          {id: '1', title: '테스트1'},
          {id: '2', title: '테스트2'},
        ]}
      />

      <PageModal
        visible={visibleForTargetModal}
        close={() => {
          setVisibleForTargetModal(false);
        }}>
        <AreaTextForm
          text={getValues('target')}
          placeholderText={'새로운 목표를 입력하세요.'}
          onComplete={(text: string) => {
            setValue('target', text);
            setVisibleForTargetModal(false);
          }}
        />
      </PageModal>
    </Container>
  );
};
export default TargetsScreen;

const Container = styled(View)`
  flex: 1;
  background-color: #fff;
`;
