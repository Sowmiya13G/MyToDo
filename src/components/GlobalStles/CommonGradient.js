import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export const CommonGradient = ({children}) => {
  return (
    <LinearGradient
      colors={[
        '#29cacc',
        '#24b5b7',
        '#20a1a3',
        '#1c8d8e',
        '#146638',
        '#10512d',
      ]}
      style={{flex: 1, flexDirection: 'row'}}>
      {children}
    </LinearGradient>
  );
};
