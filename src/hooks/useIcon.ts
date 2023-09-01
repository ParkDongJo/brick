import React from 'react';

const useIcon = () => {
  const getIcon = (icon: string) =>
    ({
      건강: '💪🏻',
      교통: '🚗',
      공부: '📖',
      교육: '📚',
      금융: '💰',
      놀이: '🎮',
      보험: '🏥',
      생활: '🏠',
      식비: '🍔',
      여가: '🎨',
      의료: '🏥',
      통신: '📱',
      패션: '👗',
      행사: '🎉',
      기타: '📌',
    }[icon]);

  return {
    getIcon,
  };
};
export default useIcon;
