import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const TabBar: React.FC<{ state: any; descriptors: any; navigation: any }> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { colors, fonts } = useTheme() as any;
  return (
    <View style={{ backgroundColor: colors.backgroundPurple }}>
      <View
        style={{
          backgroundColor: colors.primaryBlack,
          flexDirection: "row",
          height: hp("12%"),
          borderTopLeftRadius: wp("5%"),
          borderTopRightRadius: wp("5%"),
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={1}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              {label === "User" ? (
                <Icon
                  style={{
                    fontSize: 40,
                    alignSelf: "center",
                    shadowOpacity: 0.25,
                    elevation: 6,
                    shadowRadius: 12,
                    shadowOffset: { width: 1, height: 10 },
                  }}
                  name="person"
                  color={isFocused ? colors.primaryGreen : colors.primaryGrey}
                />
              ) : label === "Content" ? (
                <Icon
                  style={{
                    fontSize: 40,
                    alignSelf: "center",
                    shadowOpacity: 0.25,
                    elevation: 6,
                    shadowRadius: 12,
                    shadowOffset: { width: 1, height: 10 },
                    color: isFocused ? colors.primaryGreen : colors.primaryGrey,
                  }}
                  name="bookmark"
                />
              ) : (
                <Icon
                  style={{
                    fontSize: 40,
                    alignSelf: "center",
                    shadowOpacity: 0.25,
                    elevation: 6,
                    shadowRadius: 12,
                    shadowOffset: { width: 1, height: 10 },
                    color: isFocused ? colors.primaryGreen : colors.primaryGrey,
                  }}
                  name="list"
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;
