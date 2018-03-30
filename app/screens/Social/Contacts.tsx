import * as _ from 'lodash'
import * as React from 'react'
import { ListView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { RkStyleSheet, RkText, RkTextInput } from 'react-native-ui-kitten'
import { FontAwesome } from '../../assets/icons'
import { Avatar } from '../../components/Avatar'
import { data } from '../../data'

interface ContactsProps {
  navigation: any;
}

interface ContactsState {
  data: any;
}

export class Contacts extends React.Component<ContactsProps, ContactsState> {
  static navigationOptions = {
    title: 'Contacts'.toUpperCase(),
  };
  private users
  private filter
  private setData
  private renderHeader
  private renderRow

  constructor(props) {
    super(props)

    this.users = data.getUsers()

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      data: ds.cloneWithRows(this.users),
    }

    this.filter = this._filter.bind(this)
    this.setData = this._setData.bind(this)
    this.renderHeader = this._renderHeader.bind(this)
    this.renderRow = this._renderRow.bind(this)
  }

  _setData(d) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.setState({
      data: ds.cloneWithRows(d),
    })
  }

  _renderRow(row) {
    const name = `${row.firstName} ${row.lastName}`
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileV1', { id: row.id })}>
        <View style={styles.container}>
          <Avatar style={styles.avatar} img={row.photo} />
          <RkText>{name}</RkText>
        </View>
      </TouchableOpacity>
    )
  }

  renderSeparator() {
    return (
      <View style={styles.separator} />
    )
  }

  _renderHeader() {
    return (
      <View style={styles.searchContainer}>
        <RkTextInput autoCapitalize="none"
          autoCorrect={false}
          onChange={(event) => this._filter(event.nativeEvent.text)}
          label={<RkText rkType="awesome">{FontAwesome.search}</RkText>}
          rkType="row"
          placeholder="Search" />
      </View>
    )
  }

  _filter(text) {
    const pattern = new RegExp(text, 'i')
    const users = _.filter(this.users, (user) => {

      if (user.firstName.search(pattern) !== -1
        || user.lastName.search(pattern) !== -1) {
        return user
      }
    })

    this.setData(users)
  }

  render() {
    return (
      <ListView
        style={styles.root}
        dataSource={this.state.data}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        renderHeader={this.renderHeader}
        enableEmptySections={true} />
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  searchContainer: {
    backgroundColor: theme.colors.screen.bold,
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 60,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    marginRight: 16,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border.base,
  },
}))