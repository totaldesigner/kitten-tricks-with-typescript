import * as _ from 'lodash'
import * as React from 'react'
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native'
import {
  RkButton,
  RkStyleSheet,
  RkText,
} from 'react-native-ui-kitten'
import { FontAwesome } from '../assets/icons'
import { UIConstants } from '../config/appConstants'

interface NavBarProps {
  headerProps: any
  navigation: any
}

interface NavBarState {
  width?: number
}

export class NavBar extends React.Component<NavBarProps, NavBarState> {
  constructor(props) {
    super(props)
    this.state = { width: undefined }
  }

  _renderRight(headerRight) {
    const windowWidth = Dimensions.get('window').width
    const width = this.state.width
      ? (windowWidth - this.state.width) / 2
      : undefined

    return headerRight && (
      <View style={[{ width }, styles.right]}>{headerRight}</View>
    )
  }

  _renderLeft(headerLeft) {
    if (headerLeft) {
      return (
        <View style={styles.left}>{headerLeft}</View>
      )
    }

    const windowWidth = Dimensions.get('window').width
    const width = this.state.width
      ? (windowWidth - this.state.width) / 2
      : undefined

    const renderLeftContent = () => {
      const index = _.findIndex(this.props.headerProps.scenes, { isActive: true })
      if (index > 0) {
        return <RkButton
          rkType="clear"
          style={styles.menu}
          onPress={() => {
            this.props.navigation.goBack()
          }}>
          <RkText rkType="awesome hero">{FontAwesome.chevronLeft}</RkText>
        </RkButton>
      }
      else {
        return <RkButton
          rkType="clear"
          style={styles.menu}
          onPress={() => {
            this.props.navigation.navigate('DrawerOpen')
          }}>
          <RkText rkType="awesome">{FontAwesome.bars}</RkText>
        </RkButton>
      }
    }

    return (
      <View style={[{ width }, styles.left]}>
        {renderLeftContent()}
      </View>
    )
  }

  _renderTitle(title, headerTitle) {
    const onLayout = (e) => {
      this.setState({
        width: e.nativeEvent.layout.width,
      })
    }

    if (headerTitle) {
      return (
        <View style={styles.title} onLayout={onLayout}>{headerTitle}</View>)
    }

    return (
      <View style={styles.title} onLayout={onLayout}>
        <RkText>{title}</RkText>
      </View>
    )
  }

  render() {
    const options = this.props.headerProps.getScreenDetails(this.props.headerProps.scene).options
    return (
      <View style={styles.layout}>
        <View style={styles.container}>
          {this._renderTitle(options.title, options.headerTitle)}
          {this._renderLeft(options.headerLeft)}
          {this._renderRight(options.headerRight)}
        </View>
      </View>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  layout: {
    backgroundColor: theme.colors.screen.base,
    paddingTop: UIConstants.StatusbarHeight,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border.base,
  },
  container: {
    flexDirection: 'row',
    height: UIConstants.AppbarHeight,

  },
  left: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  right: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  title: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    width: 40,
  },
}))