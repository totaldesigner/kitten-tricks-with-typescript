import * as _ from 'lodash'
import * as React from 'react'
import { FlatList, Image, Keyboard, Platform, TouchableOpacity, View } from 'react-native'
import { InteractionManager } from 'react-native'
import { RkAvoidKeyboard, RkButton, RkStyleSheet, RkText, RkTextInput, RkTheme } from 'react-native-ui-kitten'
import { FontAwesome } from '../../assets/icons'
import { Avatar } from '../../components/Avatar'
import { data } from '../../data'
import { scale } from '../../utils/scale'

import * as moment from 'moment'

const getUserId = (navigation) => {
  return navigation.state.params ? navigation.state.params.userId : undefined
}

interface ChatProps {
  navigation: any
}

interface ChatState {
  data: any
  message?: string
}

export class Chat extends React.Component<ChatProps, ChatState> {
  static navigationOptions = ({ navigation }) => {
    const renderAvatar = (u) => {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('ProfileV1', { id: u.id })}>
          <Avatar style={styles.avatar} img={u.photo} />
        </TouchableOpacity>
      )
    }

    const renderTitle = (u) => {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('ProfileV1', { id: u.id })}>
          <View style={styles.header}>
            <RkText rkType="header5">{`${u.firstName} ${u.lastName}`}</RkText>
            <RkText rkType="secondary3 secondaryColor">Online</RkText>
          </View>
        </TouchableOpacity>
      )
    }

    const user = data.getUser(getUserId(navigation))
    const rightButton = renderAvatar(user)
    const title = renderTitle(user)
    return (
      {
        headerTitle: title,
        headerRight: rightButton,
      })
  };
  private list

  constructor(props) {
    super(props)
    const conversation = data.getConversation(getUserId(this.props.navigation))

    this.state = {
      data: conversation,
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.list.scrollToEnd()
    })
  }

  _keyExtractor(post) {
    return post.id
  }

  _renderItem(info) {
    const inMessage = info.item.type === 'in'
    const backgroundColor = inMessage
      ? RkTheme.current.colors.chat.messageInBackground
      : RkTheme.current.colors.chat.messageOutBackground
    const itemStyle = inMessage ? styles.itemIn : styles.itemOut

    const renderDate = (time) => (
      <RkText style={styles.time} rkType="secondary7 hintColor">
        {moment().add(time, 'seconds').format('LT')}
      </RkText>)

    return (
      <View style={[styles.item, itemStyle]}>
        {!inMessage && renderDate(info.item.time)}
        <View style={[styles.balloon, { backgroundColor }]}>
          <RkText rkType="primary2 mediumLine chat" style={{ paddingTop: 5 }}>{info.item.text}</RkText>
        </View>
        {inMessage && renderDate(info.item.time)}
      </View>
    )
  }

  _scroll() {
    if (Platform.OS === 'ios') {
      this.list.scrollToEnd()
    } else {
      _.delay(() => this.list.scrollToEnd(), 100)
    }
  }

  _pushMessage() {
    if (!this.state.message) {
      return
    }

    this.state.data.messages.push({ id: this.state.data.messages.length, time: 0, type: 'out', text: this.state.message })
    this.setState({ message: '' })
    this._scroll()
  }

  render() {
    return (
      <RkAvoidKeyboard style={styles.container} onResponderRelease={() => {
        Keyboard.dismiss()
      }}>
        <FlatList ref={(c) => this.list = c}
          extraData={this.state}
          style={styles.list}
          data={this.state.data.messages}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem} />
        <View style={styles.footer}>
          <RkButton style={styles.plus} rkType="clear">
            <RkText rkType="awesome secondaryColor">{FontAwesome.plus}</RkText>
          </RkButton>

          <RkTextInput
            onFocus={() => this._scroll()}
            onBlur={() => this._scroll()}
            onChangeText={(message) => this.setState({ message })}
            value={this.state.message}
            rkType="row sticker"
            placeholder="Add a comment..." />

          <RkButton onPress={() => this._pushMessage()} style={styles.send} rkType="circle highlight">
            <Image source={require('../../assets/icons/sendIcon.png')} />
          </RkButton>
        </View>
      </RkAvoidKeyboard>

    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  header: {
    alignItems: 'center',
  },
  avatar: {
    marginRight: 16,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.screen.base,
  },
  list: {
    paddingHorizontal: 17,
  },
  footer: {
    flexDirection: 'row',
    minHeight: 60,
    padding: 10,
    backgroundColor: theme.colors.screen.alter,
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: 'row',
  },
  itemIn: {},
  itemOut: {
    alignSelf: 'flex-end',
  },
  balloon: {
    maxWidth: scale(250),
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 20,
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
  },
  plus: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 7,
  },
  send: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
}))