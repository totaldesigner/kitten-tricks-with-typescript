import * as React from 'react'
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  RkCard,
  RkStyleSheet,
  RkText,
} from 'react-native-ui-kitten'
import { SocialBar } from '../../components'
import { data } from '../../data'

interface Articles4Props {
  navigation: any
}

interface Articles4State {
  /* */
}

export class Articles4 extends React.Component<Articles4Props, Articles4State> {
  static navigationOptions = {
    title: 'Article List'.toUpperCase(),
  }
  private data
  private renderItem

  constructor(props) {
    super(props)
    this.data = data.getArticles('fact')
    this.renderItem = this._renderItem.bind(this)
  }

  _keyExtractor(post) {
    return post.id.toString()
  }

  _renderItem(info) {
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('Article', { id: info.item.id })}>
        <RkCard rkType="horizontal" style={styles.card}>
          <Image source={info.item.photo} />

          <View>
            <RkText numberOfLines={1} rkType="header6">{info.item.header}</RkText>
            <RkText rkType="secondary6 hintColor">{`${info.item.user.firstName} ${info.item.user.lastName}`}</RkText>
            <RkText style={styles.post} numberOfLines={2} rkType="secondary1">{info.item.text}</RkText>
          </View>
          <View>
            <SocialBar rkType="space" showLabel={true} />
          </View >
        </RkCard>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.data}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
          style={styles.container} />
      </View>
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
  post: {
    marginTop: 13,
  },
}))
