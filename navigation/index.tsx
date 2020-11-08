import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from "@react-navigation/drawer";

import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
// import { RootStackParamList } from '../types';
// import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Reset from '../screens/Reset';
import Dashboard from '../screens/Dashboard';

import PostTweet from '../screens/PostTweet';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
} 

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="Reset" component={Reset} options={{ headerShown: false }} />

      
      <Stack.Screen name="Dashboard" 
                    component={Dashboard} 
                    options={{ headerShown: false }} 
                    // options={{
                  //   title: 'Dasboard',
                  //   headerLeft: null,
                  //   headerStyle: {
                  //     backgroundColor: '#f5d020',
                  //   },
                  //   headerTintColor: '#fff',
                  //   headerTitleStyle: {
                  //     fontWeight: 'bold',
                  //     fontSize: 27
                  //   },
                  // }}
                   />
      <Stack.Screen name="PostTweet" 
                    component={PostTweet} 
                    options={{ headerShown: false }} 
                   />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
} 


// const Drawer = createDrawerNavigator();
// const DrawerNavigator = () => {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="Home" component={RootNavigator} />
//       <Drawer.Screen name="Contact" component={ContactStackNavigator} />
//     </Drawer.Navigator>
//   );
// }