import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AccountScreen, CreateOrJoinScreen} from '../screens';
import {NavigatorScreenParams} from '@react-navigation/native';
import {GameStackParamList} from './GameStack';
import {deepOrange, navyBlue} from '../styles';

export type TabParamList = {
  CreateOrJoin: NavigatorScreenParams<GameStackParamList>;
  Account: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const HomeTabs: React.FC<{}> = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: navyBlue},
        tabBarLabelStyle: {color: 'white', fontSize: 12},
      }}
      initialRouteName="CreateOrJoin"
      backBehavior="none">
      <Tab.Screen name="CreateOrJoin" component={CreateOrJoinScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};
