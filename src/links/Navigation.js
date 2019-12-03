import {NativeModules} from 'react-native';
const Navigation = NativeModules.Navigation;

export const navigateTo = Navigation.navigateTo;

export const goBack = ({navigation: {goBack: RNGoBack} = {}}) => {
  if (RNGoBack) {
    RNGoBack();
  } else {
    Navigation.goBack();
  }
};
