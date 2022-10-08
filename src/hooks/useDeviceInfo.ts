import {useEffect, useState} from 'react';
import DeviceInfo, {
  getDeviceName,
  getDeviceId,
  getBrand,
  getUniqueId,
  getManufacturer,
  getMaxMemory,
  getTotalMemory,
  getBatteryLevel,
  getSystemName,
  getSystemVersion,
  getUsedMemory,
  getVersion,
  getUserAgent,
  isTablet,
  hasNotch,
} from 'react-native-device-info';

const useDeviceInfo = () => {
  const [deviceName, setDeivceName] = useState<string>();
  const [batteryLevel, setBatteryLevel] = useState<number>();
  const [uniqueId, setUniqueId] = useState<string>();
  const [maxMemory, setMaxMemory] = useState<number>();
  const [totalMemory, setTotalMemory] = useState<number>();
  const [usedMemory, setUsedMemory] = useState<number>();
  const [userAgent, setUserAgent] = useState<string>();

  const isLandscape = async () => {
    return await DeviceInfo.isLandscape();
  };

  useEffect(() => {
    const init = async () => {
      const name = await getDeviceName();
      const level = await getBatteryLevel();
      const id = await getUniqueId();
      const maxMem = await getMaxMemory();
      const totalMem = await getTotalMemory();
      const usedMem = await getUsedMemory();
      const agent = await getUserAgent();

      setDeivceName(name);
      setBatteryLevel(level);
      setUniqueId(id);
      setMaxMemory(maxMem);
      setTotalMemory(totalMem);
      setUsedMemory(usedMem);
      setUserAgent(agent);
    };
    init();
  }, []);

  return {
    deviceName,
    deviceId: getDeviceId(),
    brand: getBrand(),
    batteryLevel,
    osName: getSystemName(),
    osVer: getSystemVersion(),
    appVer: getVersion(),
    isTablet: isTablet(),
    manufacture: getManufacturer(),
    hasNotch: hasNotch(),
    uniqueId,
    maxMemory,
    totalMemory,
    usedMemory,
    userAgent,
    isLandscape,
  };
};
export default useDeviceInfo;
