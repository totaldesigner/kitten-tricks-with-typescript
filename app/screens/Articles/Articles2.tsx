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

interface Articles2Props {
  navigation: any;
}

interface Articles2State {
  /* */
}

export class Articles2 extends React.Component<Articles2Props, Articles2State> {
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
        <RkCard rkType="imgBlock" style={styles.card}>
          <Image source={info.item.photo} />
          <View style={styles.overlay}>
            <RkText rkType="header4 inverseColor">{info.item.header}</RkText>
            <RkText style={styles.time}
              rkType="secondary2 inverseColor">{moment().add(info.item.time, 'seconds').fromNow()}</RkText>
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
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  card: {
    marginVertical: 8,
  },
  time: {
    marginTop: 5,
  },
}))