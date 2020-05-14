import React, { Component } from 'react';
import {
View,
Alert,
Vibration,
Text
} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import NewsFeed from './NewsFeed';
import Search from "./Search";
import * as globalStyles from '../styles/global';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            tab: 'NewsFeed'
        };
    }
    showBookmarkAlert(){
            Vibration.vibrate();
            Alert.alert(
                'Coming Soon!',
                'We are hard at work on this feature, check back in the near future.',
                [
                    { text: 'OK', onPress: () => console.log('User pressed OK') }
                ]
            );
        }
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="NewsFeed" component={NewsFeed} />
                    <Tab.Screen name="Search" component={Search} />
                    <Tab.Screen name="Bookmark" component={Bookmark} />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}