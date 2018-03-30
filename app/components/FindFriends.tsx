import * as React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  RkText,
  RkTheme,
} from 'react-native-ui-kitten'
import { FontAwesome } from '../assets/icons'

interface FindFriendsProps {
  color: string
  icon: string
  onPress: () => any
  selected: boolean
  style: string
  text: string
}

interface FindFriendsState {
}

export class FindFriends extends React.Component<FindFriendsProps, FindFriendsState> {
  constructor(props) {
    super(props)
  }

  render() {
    const color = { color: this.props.selected ? this.props.color : RkTheme.current.colors.disabled }

    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.container}>
          <View style={styles.text}>
            <RkText rkType="awesome" style={[styles.icon, color]}>{this.props.icon}</RkText>
            <RkText rkType="header6" style={color}>{`Find Friends With ${this.props.text}`}</RkText>
          </View>
          <RkText rkType="awesome small" style={color}>{FontAwesome.chevronRight}</RkText>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
  },
  text: {
    flexDirection: 'row',
  },
  icon: {
    width: 35,
  },
})