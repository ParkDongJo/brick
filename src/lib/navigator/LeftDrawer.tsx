import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const LeftDrawer = ({navigation}) => {
  //   const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Main');
        }}>
        <Text>HOME</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.closeDrawer();
          setTimeout(() => {
            navigation.navigate('Profile');
          }, 300);
        }}>
        <Text>PROFILE</Text>
      </TouchableOpacity>
    </View>
  );
};
export default LeftDrawer;
