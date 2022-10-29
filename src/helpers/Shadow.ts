import { StyleSheet, ViewStyle } from 'react-native';

export const shadow = StyleSheet.create({
  shadowColor: '#000' as ViewStyle,
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27 as ViewStyle,
  shadowRadius: 4.65 as ViewStyle,

  elevation: 6 as ViewStyle,
});
