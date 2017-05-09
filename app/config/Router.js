import React from 'react';
import {
  Image
} from "react-native";
import {TabNavigator,StackNavigator} from 'react-navigation';
import ChinaMovie from '../screens/ChinaMovie';
import USAMovie from '../screens/USAMovie';
import {icons} from '../icons/Icons';
// export const FeedStack = StackNavigator({
//   ChinaMovie:{
//     screen:ChinaMovie,
//     navigationOptions:{
//       title:'ChinaMoviea',
//     }
//   },
//   USAMovie:{
//     screen:USAMovie,
//     navigationOptions:{
//       title:'USAMovie'
//     }
//   }
// })

export const Tabs = TabNavigator({
  Home: {
    screen:ChinaMovie,
    // navigationOptions:{
    //   tabBarLabel:'ChinaMovie',
    //   tabBarIcon:({tintColor}) => <Image source={{uri:icons.home}} style={{width:50,height:50}}/>
    // }
  },
  USA:{
    screen:USAMovie,
    // navigationOptions:{
    //   tabBarLabel:'USAMovie',
    //   tabBarIcon:({tintColor}) => <Image name="list" size={35} color={tintColor}/>
    // }
  }
},{
  tabBarPosition: 'bottom',
})
