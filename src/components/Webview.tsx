import React, {useEffect, forwardRef} from 'react';
import {
  BackHandler,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components';
import {WebView as OriginWebView, WebViewProps} from 'react-native-webview';
import useWebview from '../hooks/useWebview';
import useDeviceInfo from '../hooks/useDeviceInfo';

const WebView: React.FC = props => {
  // 추후 타입 해결방법 https://github.com/react-navigation/react-navigation/issues/9741
  const navigation = useNavigation<any>();
  const {appVer} = useDeviceInfo();
  const {injectedJavascriptForWebviewPostMessage, onMessage} = useWebview({
    navigation,
    appVer,
  });
  const onLoad = async () => {};
  const onError = async params => {};
  const onLoadEnd = async () => {};

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', () => {});
    }
  });
  return (
    <Container>
      <OriginWebView
        injectedJavaScript={injectedJavascriptForWebviewPostMessage}
        style={{marginTop: 10}}
        source={{uri: 'https://infinite.red'}}
        scrollEnabled={false}
        javaScriptEnabled={true}
        onLoadEnd={onLoadEnd}
        onMessage={onMessage}
      />
    </Container>
  );
};

const KeyboardAvoidingWebView = forwardRef(
  (props: KeyboardAvoidingViewProps & WebViewProps, ref) => (
    <KeyboardAvoidingView
      style={props.style}
      behavior={props.behavior}
      enabled={props.enabled}>
      {WebView(props, ref)}
    </KeyboardAvoidingView>
  ),
);
export default KeyboardAvoidingWebView;

const Container = styled(View)`
  flex: 1;
`;
