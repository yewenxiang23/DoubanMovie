

import React from 'react';
import {
  View,
  Image,
  AppRegistry,

} from 'react-native';

class demo extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:{
        src:require('../app/image/aaaa_03.png')
      }
    }
  }
  render(){
    return (
      <View style={{flex:1,backgroundColor:'#ccc'}}>
        <Image
          source={this.state.data.src}
          style={{width:200,height:100}}
        />
      </View>
    )
  }
}
AppRegistry.registerComponent('DoubanMovie',()=>demo);
