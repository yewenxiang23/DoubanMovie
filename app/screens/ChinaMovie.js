import React,{Component} from 'react';
import {styles} from '../styles/Main';
import {
    Text,
    View,
    Image,
    ListView,
    ScrollView,
    StatusBar,
    ActivityIndicator,  //加载时的转动圆圈
    TouchableHighlight, //按下时，封装的视图的不透明度会降低(只支持一个子节点)
} from 'react-native';



export default class ChinaMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: new ListView.DataSource({
              rowHasChanged:(row1,row2) => row1 !== row2
            }),
            loaded:false,
        }
    }
    componentDidMount(){
      const REQUST_URL = 'https://api.douban.com/v2/movie/top250'; //获取排行前25的电影数据
      this.fetchData(REQUST_URL);
    }
    fetchData(REQUST_URL){
      fetch(REQUST_URL)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          movies:this.state.movies.cloneWithRows(responseJson.subjects),
                  //ListView的数据源，我们要把数据处理一下，
          loaded:true,
        });
      })
      .done();
    }
    toChinaMovieDetail(movie){
      const { navigate } = this.props.navigation;
      navigate('ChinaMovieDetail',{MoviesInfo:movie});
    }
    renderMovieList(movie){
      return (
      <TouchableHighlight underlayColor="rgba(34,26,38,0.1)" onPress={()=>{
        this.toChinaMovieDetail(movie);
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
    render() {
        if (!this.state.loaded){
          return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#4659bf'/>
                <View style={styles.loading}>
                  <ActivityIndicator size="large" color="#6435c9"/>
                </View>
            </View>
          )
        }
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#4659bf'/>
                <ListView dataSource={this.state.movies} renderRow={this.renderMovieList.bind(this)}/>
            </View>
        );
    }
}
