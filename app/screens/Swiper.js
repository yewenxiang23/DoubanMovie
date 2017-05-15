import React from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native'
import Swiper from 'react-native-swiper';
import {styles} from '../styles/Main.js';
let width = Dimensions.get('window').width
let height = Dimensions.get('window').height
class Rotate extends React.Component{
  constructor(props){
    super(props);
    this.state={
      loop:false
    }
  }
  _enter(){
    this.props.handleShowIndex()
  }
  render(){
    return (
      <View style={{flex:1}}>
        <StatusBar translucent={true} backgroundColor="transparent"/>
        <Swiper
              style={styles2.wrapper}
              loop={this.state.loop}
              // dot={<View style={styles2.dot}/>}
              // activeDot={<View style={styles2.activeDot}/>}
        >
          <View style={styles2.slide}>
            <Image style={styles2.slideImage} source={require('../image/startPageOne.jpg')}/>
          </View>
          <View style={styles2.slide}>
            <Image style={styles2.slideImage} source={require('../image/startPageTwo.jpg')}/>
          </View>
          <View style={styles2.slide}>
            <Image style={styles2.slideImage} source={require('../image/startPageThree.png')}/>
            <TouchableOpacity
                onPress={this._enter.bind(this)}
                style={styles2.enterTouch}
                activeOpacity={0.8}
             >
             <Image style={styles2.enterBtn} source={require('../image/enterBtn.png')}>
             </Image>
             </TouchableOpacity>
          </View>
        </Swiper>
      </View>

    )
  }
}
var styles2 = StyleSheet.create({
  enterTouch:{
    position:'absolute',
    bottom:101,
    flex:1,
    left:(width-146)/2,
    width: 146,
  },
  slideImage:{
    flex:1,
    width:width,
    height:height
  },
    enterBtn:{
        width: 146,
        height:40.5,
        backgroundColor:'rgba(0,0,0,0.1)',
    },
  dot:{
        backgroundColor:'transparent',
        borderColor:'#ccc',
        borderWidth:1,
        borderRadius:7,
        width:13,
        height:13,
        marginLeft:12,
        marginRight:12,
    },
    activeDot:{
        width:14,
        height:14,
        borderWidth:1,
        borderRadius:7,
        marginLeft:12,
        marginRight:12,
        backgroundColor:'#ee735c'
    },
  slide:{
    flex:1
  }
})
export default Rotate
