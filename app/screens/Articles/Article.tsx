import * as React from 'react'
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  RkCard,
  RkStyleSheet,
  RkText,
} from 'react-native-ui-kitten'
import { Avatar } from '../../components'
import { SocialBar } from '../../components'
import { data } from '../../data'

import * as moment from 'moment'

interface ArticleProps {
  navigation: any;
}

interface ArticleState {
  /* */
}

export class Article extends React.Component<ArticleProps, ArticleState> {
  static navigationOptions = {
    title: 'Article View'.toUpperCase(),
  };
  private data

  constructor(props) {
    super(props)
    const { params } = this.props.navigation.state
    const id = params ? params.id : 1
    this.data = data.getArticle(id)
  }

  handlePress = () => {
    this.props.navigation.navigate('ProfileV1', { id: this.data.user.id })
  }

  render() {
    return (
      <ScrollView style={styles.root}>
        <RkCard rkType="article">
          <Image source={this.data.photo} />
          <View>
            <View>
              <RkText style={styles.title} rkType="header4">{this.data.header}</RkText>
              <RkText rkType="secondary2 hintColor">{moment().add(this.data.time, 'seconds').fromNow()}</RkText>
            </View>
            <TouchableOpacity onPress={this.handlePress}>
              <Avatar img={this.data.user.photo} />
            </TouchableOpacity>
          </View>
          <View>
            <View>
              <RkText rkType="primary3 bigLine">{this.data.text}</RkText>
            </View>
          </View>
          <View>
            <SocialBar />
          </View>
        </RkCard>
      </ScrollView>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  title: {
    marginBottom: 5,
  },
}))