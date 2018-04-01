import * as React from 'react'
import { Text, View } from 'react-native'
import { withRkTheme } from 'react-native-ui-kitten'
import { DrawerNavigator, StackNavigator } from 'react-navigation'

import { AppLoading, Font } from 'expo'

import track from './config/analytics'
import bootstrap from './config/bootstrap'
import { AppRoutes } from './config/navigation/routesBuilder'

import { data } from './data'
import * as Screens from './screens'

bootstrap()
data.populateData()

function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getCurrentRouteName(route)
  }
  return route.routeName
}

const SideMenu = withRkTheme(Screens.SideMenu) as any
const renderSideMenu = (props) => <SideMenu {...props} />
const KittenApp = StackNavigator({
  First: {
    screen: Screens.SplashScreen,
  },
  Home: {
    screen: DrawerNavigator({ ...AppRoutes }, {
      drawerOpenRoute: 'DrawerOpen',
      drawerCloseRoute: 'DrawerClose',
      drawerToggleRoute: 'DrawerToggle',
      contentComponent: (props) => renderSideMenu(props),
    }),
  },
}, {
    headerMode: 'none',
  })

export default class App extends React.Component {
  state = {
    loaded: false,
  }

  componentWillMount() {
    this.loadAssets()
  }

  loadAssets = async () => {
    await Font.loadAsync({
      'fontawesome': require('./assets/fonts/fontawesome.ttf'),
      'icomoon': require('./assets/fonts/icomoon.ttf'),
      'Righteous-Regular': require('./assets/fonts/Righteous-Regular.ttf'),
      'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    })
    this.setState({ loaded: true })
  }

  handleNavigationStateChange = (prevState, currentState) => {
    const currentScreen = getCurrentRouteName(currentState)
    const prevScreen = getCurrentRouteName(prevState)

    if (prevScreen !== currentScreen) {
      track(currentScreen)
    }
  }

  render() {
    if (!this.state.loaded) {
      return <AppLoading startAsync={null} onFinish={null} />
    }

    return (
      <View style={{ flex: 1 }}>
        <KittenApp
          onNavigationStateChange={this.handleNavigationStateChange}
        />
      </View>
    )
  }
}

Expo.registerRootComponent(App)