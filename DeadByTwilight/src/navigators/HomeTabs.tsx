import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AccountScreen, CreateOrJoinScreen} from '../screens';
import {NavigatorScreenParams} from '@react-navigation/native';
import {GameStackParamList} from './GameStack';

export type TabParamList = {
  CreateOrJoin: NavigatorScreenParams<GameStackParamList>;
  Account: {userId: string};
};

const Tab = createBottomTabNavigator<TabParamList>();

export const HomeTabs: React.FC<{}> = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="CreateOrJoin"
      backBehavior="none">
      <Tab.Screen name="CreateOrJoin" component={CreateOrJoinScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};
