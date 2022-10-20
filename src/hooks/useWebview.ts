import Share from 'react-native-share';

const useWebview = (props: Props) => {
  const {appVer, navigation} = props;
  const onMessage = ({nativeEvent: {data = '', title = ''} = {}}) => {
    try {
      const {name, params = {}} = JSON.parse(data);
      const command = {
        contentLoaded,
        moveToPage,
        close,
        share,
        login,
        isLoggedIn,
      }[name as string];
      command?.(params);
    } catch (e) {}
  };
  const close = () => {
    navigation.goBack();
  };
  const share = async options => {
    try {
      const response = await Share.open(options);
      if (response) {
        // if needed
      }
    } catch (err) {}
  };
  const contentLoaded = params => {};
  const login = () => {};
  const isLoggedIn = async () => {};
  const moveToPage = ({
    routeName,
    routeParams,
  }: {
    routeName: string;
    routeParams: {[key: string]: any};
  }) => {
    try {
      navigation.navigate(`${routeName}`, routeParams ? routeParams : {});
    } catch (err) {}
  };
  const injectedJavascriptForWebviewPostMessage = `(function() {
    if (window.ReactNativeWebView) {
        window.postMessage = function(data) {
            window.ReactNativeWebView.postMessage(data);
        };
        if (!window._jikbang) {
            window._jikbang = {};
        }
        window._jikbang.app_version = "${appVer}";
    }
})()`;
  return {
    injectedJavascriptForWebviewPostMessage,
    onMessage,
  };
};

export default useWebview;
type Props = {
  appVer: string;
};
