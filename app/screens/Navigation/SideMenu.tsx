import * as React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native'
import {
  RkStyleSheet,
  RkText,
  RkTheme,
} from 'react-native-ui-kitten'
import { NavigationActions } from 'react-navigation'
import { FontAwesome } from '../../assets/icons'
import { MainRoutes } from '../../config/navigation/routes'

interface SideMenuProps {
  navigation: any
}

interface SideMenuState {
  /* */
}

export class SideMenu extends React.Component<SideMenuProps, SideMenuState> {
  private navigateAction

  constructor(props) {
    super(props)
    this.navigateAction = this._navigate.bind(this)
  }

  _navigate(route) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: route.id }),
      ],
    })
    this.props.navigation.dispatch(resetAction)
  }

  _renderIcon() {
    if (RkTheme.current.name === 'light') {
      return <Image style={styles.icon} source={require('../../assets/images/smallLogo.png')} />
    }
    return <Image style={styles.icon} source={require('../../assets/images/smallLogoDark.png')} />
  }

  render() {
    const menu = MainRoutes.map((route) => {
      return (
        <TouchableHighlight
          style={styles.container}
          key={route.id}
          underlayColor={RkTheme.current.colors.button.underlay}
          activeOpacity={1}
          onPress={() => this.navigateAction(route)}>
          <View style={styles.content}>
            <View style={styles.content}>
              <RkText style={styles.icon}
                rkType="moon primary xlarge">{route.icon}</RkText>
              <RkText>{route.title}</RkText>
            </View>
            <RkText rkType="awesome secondaryColor small">{FontAwesome.chevronRight}</RkText>
          </View>
        </TouchableHighlight>
      )
    })

    return (
      <View style={styles.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <View style={[styles.container, styles.content]}>
            {this._renderIcon()}
            <RkText rkType="logo">UI Kitten</RkText>
          </View>
          {menu}
        </ScrollView>
      </View>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    height: 80,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
  },
  root: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: theme.colors.screen.base,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 13,
  },
}))