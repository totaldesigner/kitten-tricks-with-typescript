import * as React from 'react'
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  RkCard,
  RkStyleSheet, RkText,
} from 'react-native-ui-kitten'
import { SocialBar } from '../../components'
import { data } from '../../data'

import * as moment from 'moment'

interface Articles3Props {
  navigation: any
}

interface Articles3State {
  /* */
}

export class Articles3 extends React.Component<Articles3Props, Articles3State> {
  static navigationOptions = {
    title: 'Article List'.toUpperCase(),
  }
  private data
  private renderItem

  constructor(props) {
    super(props)
    this.data = data.getArticles()
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
        <RkCard style={styles.card}>
          <View>
            <View>
              <RkText rkType="header4">{info.item.header}</RkText>
              <RkText rkType="secondary2 hintColor">{moment().add(info.item.time, 'seconds').fromNow()}</RkText>
            </View>
          </View>
          <Image source={info.item.photo} />
          <View style={styles.footer}>
            <SocialBar />
          </View >
        </RkCard>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <FlatList
        data={this.data}
        renderItem={this.renderItem}
        keyExtractor={this._keyExtractor}
        style={styles.container} />
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  card: {
    marginVertical: 8,
  },
  footer: {
    paddingTop: 16,
  },
  time: {
    marginTop: 5,
  },
}))