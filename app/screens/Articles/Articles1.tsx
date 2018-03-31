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

import * as moment from 'moment'

interface Articles1Props {
  navigation: any;
}

interface Articles1State {
  /* */
}

export class Articles1 extends React.Component<Articles1Props, Articles1State> {
  static navigationOptions = {
    title: 'Article List'.toUpperCase(),
  };
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
        <RkCard rkType="backImg">
          <Image source={info.item.photo} />
          <View style={styles.overlay}>
            <RkText rkType="header2 inverseColor">{info.item.header}</RkText>
            <RkText rkType="secondary2 inverseColor">{moment().add(info.item.time, 'seconds').fromNow()}</RkText>
            <View style={styles.footer}>
              <SocialBar rkType="leftAligned" />
            </View >
          </View>
        </RkCard>
      </TouchableOpacity>
    )
  }

  render() {
    const info = {
      item: this.data[0],
    }
    return (
      <FlatList data={this.data}
        renderItem={this.renderItem}
        keyExtractor={this._keyExtractor}
        style={styles.root} />

    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  overlay: {
    justifyContent: 'flex-end',
  },
  footer: {
    width: 240,
  },
}))