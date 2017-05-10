import React,{Component} from 'react';
import {
  ListView,
  TouchableHighlight,
  View,
  Image,
  Text
} from 'react-native';
import {styles} from '../styles/Main';
class SearchResult extends Component{
  static navigationOptions = ({ navigation }) => ({
    title:navigation.state.params.resultTitle
  })
  constructor(props){
    super(props);
    let dataSource = new ListView.DataSource({
      rowHasChanged:(row1,row2) => row1 !== row2
    });
    this.state = {
      movies:dataSource.cloneWithRows(this.props.navigation.state.params.results)
    }
  }
  showMovieDetail(movie){
    const {navigate} = this.props.navigation;
    navigate('ChinaMovieDetail',{MoviesInfo:movie})
    // this.props.navigator.push({
    //   title:movie.title,     //显示的导航栏的标题
    //   component:MovieDetail, //要使用的组件
    //   passProps:{movie}
    // })
  }
  componentWillMount(){
    this.setState({movies:this.state.movies})
  }
  renderMovieList(movie){
    return (
      <TouchableHighlight underlayColor="rgba(34,26,38,0.1)" onPress={()=>{
        this.showMovieDetail(movie);
      }}>
        <View style={styles.item}>
          <View style={styles.itemImage}>
            <Image source={{uri:movie.images.large}} style={styles.image}/>
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemHeader}>{movie.title}</Text>
            <Text style={styles.itemMeta}>{movie.original_title} ({movie.year})</Text>
            <Text style={styles.redText}>{movie.rating.average}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
  render(){
    return (
      <View style={styles.container}>
        <ListView dataSource={this.state.movies} renderRow={this.renderMovieList.bind(this)}/>
      </View>
    )
  }
}
export default SearchResult
