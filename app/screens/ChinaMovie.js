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
    RefreshControl,
} from 'react-native';

export default class ChinaMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: new ListView.DataSource({
              rowHasChanged:(row1,row2) => row1 !== row2,
            }),
            loaded:false,      //页面初次载入状态
            isLoadingTail:false, //上拉刷新状态
            num:5, //获取电影条数，初始值为5
            count:0, //返回的电影条目总数
            isRefreshing:true, //下拉刷新状态
        }
    }
    componentDidMount(){
      this.fetchData();
    }
    fetchData(){
      let that = this;
      this.setState({
        isLoadingTail:true
      })
      const REQUST_URL = `https://api.douban.com/v2/movie/top250?count=${this.state.num}`; //获取排行前25的电影数据
      fetch(REQUST_URL)
      .then(response => response.json())
      .then(responseJson => {
        setTimeout(()=>{
          that.setState({
            movies:that.state.movies.cloneWithRows(responseJson.subjects),
            //ListView的数据源，我们要把数据处理一下，
            loaded:true,
            num:that.state.num !== 25?that.state.num+5:that.state.num,
            isLoadingTail:false,
            count:responseJson.count,
            isRefreshing:false
          });
        },1000)
      })
      .catch((error) => {
        this.setState({
          isLoadingTail:false
        })
        console.warn(error);
      })
      .done();
    }
    _hasMore(){
      return this.state.count !== 25
    }
    _fetchMoreData(){
      if(!this._hasMore() || this.state.isLoadingTail){
        return
      }
      this.fetchData();
    }
    _renderFooter(){
      if(!this._hasMore()){
        return (
          <View style={styles.loadingMore}>
            <Text style={styles.loadingText}>没有更多了</Text>
          </View>
        )
      }
      return (
        <ActivityIndicator size="small" color="#6435c9"/>
      )
    }
    _onRefresh(){
      if(!this._hasMore() || this.state.isRefreshing){
        return
      }
      this.fetchData();
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
                <ListView
                  dataSource={this.state.movies} renderRow={this.renderMovieList.bind(this)}
                  onEndReached={this._fetchMoreData.bind(this)} //当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用。
                  refreshControl={
                    <RefreshControl
                       refreshing={this.state.isRefreshing}
                       onRefresh={this._onRefresh.bind(this)}
                       tintColor="#4c4400"
                       title="拼命加载中"
                       titleColor="#4c4400"
                       colors={['#ff0000', '#00ff00', '#0000ff']}
                       progressBackgroundColor="#ffff00"
                     />
                  }
                  onEndReachedThreshold={20}
                  renderFooter={this._renderFooter.bind(this)}
                  showsVerticalScrollIndicator={false}//是否显示滚动条
                />
            </View>
        );
    }
}
