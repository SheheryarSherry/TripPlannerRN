import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'
import { blueColor, btnColor } from '../utils/theme';
import { TouchableHighlight, View } from 'react-native';
import { Home, Plan ,Trip , CreatePlan, Login} from '../pages';
import { NavigationContainer } from '@react-navigation/native';


const Router = () => {
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();

    const options = {
        headerShown: false,
    }

    // ADD FAB COMPONENTS
    const Fab = ({navigation}) => {
        return (
            <TouchableHighlight
                onPress={() => navigation.navigate('Trip')}
                style={{
                    height: 48,
                    width: 48,
                    bottom: 20,
                    backgroundColor: 'transparent',
                    borderRadius: 48 / 2
                }}>
                <View style={{
                    height: 48,
                    width: 48,
                    backgroundColor: btnColor,
                    borderRadius: 48 / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Icon
                        name='add'
                        color='#ffffff' />
                </View>
            </TouchableHighlight>
        )
    }

    const BottomTabBar = ({navigation}) => {
        return (<Tab.Navigator
            tabBarOptions={{ showLabel: false }}>
            {/* PAGES ROUTE */}
            <Tab.Screen name="Home" component={Home} 
            // options={{
            //     tabBarIcon: ({ focused }) => (
            //         <Icon
            //             name="home"
            //             color={focused ? blueColor : 'grey'} />
            //     )
            // }}
             />
            <Tab.Screen name="Add" component={Home} options={{
                tabBarButton: (props) => {
                    return (
                        <TouchableHighlight
                        onPress={() => navigation.navigate('Trip')}
                        style={{
                            height: 48,
                            width: 48,
                            bottom: 20,
                            backgroundColor: 'transparent',
                            borderRadius: 48 / 2
                        }}>
                        <View style={{
                            height: 48,
                            width: 48,
                            backgroundColor: btnColor,
                            borderRadius: 48 / 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Icon
                                name='add'
                                color='#ffffff' />
                        </View>
                    </TouchableHighlight>
                    )
                }   
            }} />
            <Tab.Screen name="Tes" component={Home}
            //  options={{
            //     tabBarIcon: ({ focused }) => (
            //         <Icon
            //             name="flight"
            //             color={focused ? blueColor : 'grey'} />
            //     )
            // }} 
            />
        </Tab.Navigator>)
    }

    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Home" component={BottomTabBar} options={options} />
            <Stack.Screen name="Login" component={Login} options={options} />
            <Stack.Screen name="Plan" component={Plan} options={options} />
            <Stack.Screen name="Trip" component={Trip} options={options} />
            <Stack.Screen name="CreatePlan" component={CreatePlan} options={options} />
        </Stack.Navigator>

    )
}

export default Router
