import React from 'react';
import {Image} from "react-native";
import {TabNavigator, StackNavigator,TabBarBottom} from 'react-navigation';
import ChinaMovie from '../screens/ChinaMovie';
import ChinaMovieDetail from '../screens/ChinaMovieDetail';
import USAMovie from '../screens/USAMovie';
import USAMovieDetail from '../screens/USAMovieDetail';
import SearchFrom from '../screens/SearchFrom';
import SearchResult from '../screens/SearchResult';
import {icons} from '../icons/Icons';

const ChinaMovieRouter = StackNavigator({
    ChinaMovie: {
        screen: ChinaMovie,
        navigationOptions: {
            title: '国内电影',
            headerTintColor: '#4c4400',
            headerStyle: {
                backgroundColor: '#fff',
                borderBottomWidth: 1,
                borderBottomColor: '#c1ced4'
            }
        }
    },
    ChinaMovieDetail: {
        screen: ChinaMovieDetail
    }
})

const USAMovieRouter = StackNavigator({
    USAMovie: {
        screen: USAMovie,
        navigationOptions: {
            title: '北美电影',
            headerTintColor: '#4c4400',
            headerStyle: {
                backgroundColor: '#fff',
                borderBottomWidth: 1,
                borderBottomColor: '#c1ced4'
            }
        }
    },
    USAMovieDetail: {
        screen: USAMovieDetail
    }
})

const SearchFormRouter = StackNavigator({
  SearchFrom:{
    screen:SearchFrom,
    navigationOptions:{
      title:'电影搜索',
      headerTintColor:'#4c4400',
      headerStyle:{
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#c1ced4'
      }
    }
  },
  SearchResult:{
    screen:SearchResult,
    navigationOptions:{
      headerTintColor:'#4c4400',
      headerStyle:{
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#c1ced4'
      }
    }
  },
  ChinaMovieDetail: {
      screen: ChinaMovieDetail
  }
})

export const Tabs = TabNavigator({
    Home: {
        screen: ChinaMovieRouter,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => {
                let icon = tintColor !== 'yellow'
                    ? icons.home
                    : icons.homeActive;
                return <Image source={{
                    uri: icon
                }} style={{
                    width: 100,
                    height: 100
                }}/>
            }
        }
    },
    USA: {
        screen: USAMovieRouter,
        navigationOptions: {
            tabBarLabel: 'USAMoviea',
            tabBarIcon: ({tintColor}) => {
                let icon = tintColor !== 'yellow'
                    ? icons.USAMovie
                    : icons.USAMovieActive;
                return <Image source={{
                    uri: icon
                }} style={{
                    width: 100,
                    height: 100,
                }}/>
            }
        }
    },
    Search: {
        screen: SearchFormRouter,
        navigationOptions: {
            tabBarLabel: '电影搜索',
            tabBarIcon: ({tintColor}) => {
                let icon = tintColor !== 'yellow'
                    ? icons.search
                    : icons.searchActive;
                return <Image source={{
                    uri: icon
                }} style={{
                  width:100,
                  height:100
                }} />
            }
        }
    }
}, {
    tabBarPosition: 'bottom',
    lazy:true,
    swipeEnabled: false,  //是否滑动切换
    tabBarOptions: {
        // tabBarComponent: TabBarBottom,
        showLabel: false,
        showIcon:true,
        activeTintColor: 'yellow',
        iconStyle:{
          width:50,
          height:50,
          top:-15
        },
        style: {
            height: 48.5,
            borderTopWidth: 1,
            borderTopColor: '#ccc',
            backgroundColor:'white'
        }
    }
})
