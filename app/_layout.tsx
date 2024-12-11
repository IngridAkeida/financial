import { Drawer } from "expo-router/drawer";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{
        drawerPosition: 'left', //default is left but you can change it to right
        drawerType: 'front', //default is front but you can change it to back, slide or permanent
        drawerStyle: {
          backgroundColor: 'white',
          width: 280,
        },
        drawerActiveTintColor: '#a700a7',
        drawerInactiveTintColor: '#420042',
        drawerContentStyle: {
          backgroundColor: '#fae5fa',
        },
      }}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'overview',
            drawerIcon: ({color, size}) => <View style={{width: size, height: size, backgroundColor:color, borderRadius:20}}></View>,
          }}
        />
        <Drawer.Screen
          name="about"
          options={{
            drawerLabel: 'About Us',
            title: 'overview',
            drawerIcon: ({color, size}) => <View style={{width: size, height: size, backgroundColor:color, borderRadius:20}}></View>,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
