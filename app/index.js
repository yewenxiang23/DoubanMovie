import React,{Component} from 'react';
import {
  AppRegistry,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Tabs} from './config/Router';
import Swiper from './screens/Swiper.js';
let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

class Root extends Component{
  constructor(props){
    super(props);
    this.state={
      booted:true,
      isShowIndex:false
    }
  }
  handleShowIndex(){
    this.setState({
      isShowIndex:true
    })
  }
  render(){
    if (!this.state.booted){
      return (
        <View style={rootStyle.bootPage}>
          <ActivityIndicator color="#4c4400"/>
        </View>
      )
    }else{
      if(this.state.isShowIndex){
        return <Tabs/>
      }else{
        return <Swiper handleShowIndex={this.handleShowIndex.bind(this)}/>
      }
    }
  }
}
const rootStyle = StyleSheet.create({
  bootPage:{
    width:width,
    height:height,
    flex:1,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignContent:'center',
  }
})
AppRegistry.registerComponent('DoubanMovie',()=>Root);
