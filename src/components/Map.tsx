//https://agilog.tistory.com/1
//https://dev-yakuza.posstree.com/ko/react-native/react-native-maps/
//https://github.com/react-native-maps/react-native-maps/blob/master/docs/installation.md

// AIzaSyAyAt9CiwUffZCRTKAvGo6ib-2QYZZyYVg

import React, {useState} from 'react';
import {View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Region} from 'react-native-maps';

const Map = () => {
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const onRegionChange = (_region: Region) => {
    setRegion(_region);
  };

  return (
    <>
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          provider={PROVIDER_GOOGLE}
          region={region}
          onRegionChange={onRegionChange}
        />
      </View>
    </>
  );
};

export default Map;
