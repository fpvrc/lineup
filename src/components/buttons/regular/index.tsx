import React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Button: React.FC<{
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
  text: string;
  icon: any;
  activeOpacity: number;
  styles: object;
}> = ({
  onPress,
  backgroundColor,
  textColor,
  text,
  icon,
  activeOpacity,
  styles,
}) => {
  const {colors, fonts} = useTheme() as any;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={[
        {backgroundColor: backgroundColor, shadowColor: colors.backgroundBlack},
        ios_android_styles.button,
        styles,
      ]}>
      <Image source={icon} style={ios_android_styles.icon} />
      <Text
        style={[
          {
            color: textColor,
            fontFamily: fonts.regular,
          },
          ios_android_styles.text,
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const ios_android_styles = StyleSheet.create({
  ...(Platform.select({
    ios: {
      button: {
        width: wp('92%'),
        height: hp('6%'),
        borderRadius: wp('3%'),
        flexDirection: 'row',
        justifyContent: 'center',
        shadowOpacity: 0.25,
        elevation: 6,
        shadowRadius: 12,
        shadowOffset: {width: 1, height: 10},
      },
      icon: {alignSelf: 'center', width: wp('7%'), resizeMode: 'contain'},
      text: {
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: '500',
        marginLeft: wp('3%'),
      },
    },
    android: {},
  }) as any),
});
