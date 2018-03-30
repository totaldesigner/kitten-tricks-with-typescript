import * as React from 'react'
import { FlatList, Image, View } from 'react-native'
import { RkCard, RkStyleSheet, RkText } from 'react-native-ui-kitten'
import { Avatar } from '../../components/Avatar'
import { SocialBar } from '../../components/SocialBar'
import { data } from '../../data'

import * as moment from 'moment'

export class Feed extends React.Component {
  static navigationOptions = {
    title: 'Feed'.toUpperCase(),
  };
  private data

  constructor(props) {
    super(props)

    this.data = data.getArticles('post')
  }

  _keyExtractor(post) {
    return post.id
  }

  _renderItem(info) {
    return (
      <RkCard style={styles.card}>
        <View>
          <Avatar rkType="small"
            style={styles.avatar}
            img={info.item.user.photo} />
          <View>
            <RkText rkType="header4">{`${info.item.user.firstName} ${info.item.user.lastName}`}</RkText>
            <RkText rkType="secondary2 hintColor">{moment().add(info.item.time, 'seconds').fromNow()}</RkText>
          </View>
        </View>
        <Image source={info.item.photo} />
        <View>
          <RkText rkType="primary3">{info.item.text}</RkText>
        </View>
        <View>
          <SocialBar />
        </View >
      </RkCard>
    )
  }

  render() {
    return (
      <FlatList data={this.data}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        style={styles.container} />
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  card: {
    marginVertical: 8,
  },
  avatar: {
    marginRight: 16,
  },
}))