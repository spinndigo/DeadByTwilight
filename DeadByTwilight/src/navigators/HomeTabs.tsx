import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AccountScreen, CreateOrJoinScreen} from '../screens';
import {NavigatorScreenParams} from '@react-navigation/native';
import {GameStackParamList} from './GameStack';
import {tabBarPurple} from '../styles';

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
        tabBarStyle: {backgroundColor: tabBarPurple},
        tabBarLabelStyle: {color: 'white', fontSize: 14, fontWeight: '500'},
      }}
      initialRouteName="CreateOrJoin"
      backBehavior="none">
      <Tab.Screen
        options={{tabBarLabel: 'Play'}}
        name="CreateOrJoin"
        component={CreateOrJoinScreen}
      />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};
