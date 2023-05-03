import React from 'react';
import {Pressable, View, Text} from 'react-native';
import styled from 'styled-components';
import StyledText from '../../components/atoms/StyledText';

const Section: React.FC<Props> = props => {
  const {title, hasHead = true, children, onPress} = props;

  return (
    <Container>
      {hasHead && (
        <>
          <Head>
            <StyledText text={title} />
            <Pressable onPress={onPress}>
              <Text>{'+ 변경'}</Text>
            </Pressable>
          </Head>
          <Body>{children}</Body>
        </>
      )}
      {!hasHead && (
        <Head>
          <StyledText text={title} />
          {children}
        </Head>
      )}
    </Container>
  );
};
export default Section;

type Props = {
  title: string;
  children: React.ReactElement;
  hasHead?: boolean;
  onPress?(): void;
};

const Container = styled(View)`
  padding: 20px 15px;
  margin: 5px 20px;
  border-radius: 10px;
  background-color: rgba(0, 0, 93, 0.04);
`;
const Head = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Body = styled(View)`
  width: 100%;
  margin-top: 15px;
  align-items: center;
`;
