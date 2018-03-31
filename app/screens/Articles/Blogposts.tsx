import * as React from 'react'
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  RkCard, RkStyleSheet,
  RkText,
} from 'react-native-ui-kitten'
import {Avatar} from '../../components'
import {data} from '../../data'

import * as moment from 'moment'

interface BlogpostsProps {
  navigation: any;
}

interface BlogpostsState {
  data: any
}

export class Blogposts extends React.Component<BlogpostsProps, BlogpostsState> {
  static navigationOptions = {
    title: 'Blogposts'.toUpperCase(),
  };
  private data
  private renderItem

  constructor(props) {
    super(props)

    this.renderItem = this._renderItem.bind(this)
    this.state = {
      data: data.getArticles('post'),
    }
  }

  _keyExtractor(post) {
    return post.id.toString()
  }

  _renderItem(info) {
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('Article', {id: info.item.id})}>
        <RkCard rkType="blog" style={styles.card}>
          <Image source={info.item.photo}/>
          <View style={styles.content}>
            <RkText style={styles.section} rkType="header4">{info.item.title}</RkText>
          </View>
          <View>
            <View>
              <RkText rkType="primary3 mediumLine" numberOfLines={2}>{info.item.text}</RkText>
            </View>
          </View>
          <View>
            <View style={styles.userInfo}>
              <Avatar style={styles.avatar} img={info.item.user.photo}/>
              <RkText rkType="header6">{`${info.item.user.firstName} ${info.item.user.lastName}`}</RkText>
            </View>
            <RkText rkType="secondary2 hintColor">{moment().add(info.item.time, 'seconds').fromNow()}</RkText>
          </View>
        </RkCard>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={this._keyExtractor}
        style={styles.container}/>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  card: {
    marginVertical: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 17,
  },
}))