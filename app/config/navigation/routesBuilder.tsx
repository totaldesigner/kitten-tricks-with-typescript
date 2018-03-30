import * as _ from 'lodash'
import * as React from 'react'
import { withRkTheme } from 'react-native-ui-kitten'
import { StackNavigator } from 'react-navigation'
import { NavBar } from '../../components/index'
import {
  MainRoutes,
  MenuRoutes,
} from './routes'
import transition from './transitions'

const main = {}
const flatRoutes = {};
(MenuRoutes).map((route) => {

  const wrapToRoute = (r) => {
    return {
      screen: withRkTheme(r.screen),
      title: r.title,
    }
  }

  flatRoutes[route.id] = wrapToRoute(route)
  main[route.id] = wrapToRoute(route)
  for (const child of route.children) {
    flatRoutes[child.id] = wrapToRoute(child)
  }
})

const ThemedNavigationBar = withRkTheme(NavBar) as any

const DrawerRoutes = Object.keys(main).reduce((routes, name) => {
  const stackName = name
  routes[stackName] = {
    name: stackName,
    screen: StackNavigator(flatRoutes, {
      initialRouteName: name,
      headerMode: 'screen',
      cardStyle: { backgroundColor: 'transparent' },
      transitionConfig: transition,
      navigationOptions: ({ navigation, screenProps }) => ({
        gesturesEnabled: false,
        header: (headerProps) => <ThemedNavigationBar navigation={navigation} headerProps={headerProps} />
      }),
    }),
  }
  return routes
}, {})

export const AppRoutes = DrawerRoutes
export const LoginRoutes = _.find(MainRoutes, { id: 'LoginMenu' }).children
export const NavigationRoutes = _.find(MainRoutes, { id: 'NavigationMenu' }).children
export const SocialRoutes = _.find(MainRoutes, { id: 'SocialMenu' }).children
export const ArticleRoutes = _.find(MainRoutes, { id: 'ArticlesMenu' }).children
export const MessagingRoutes = _.find(MainRoutes, { id: 'MessagingMenu' }).children
export const DashboardRoutes = _.find(MainRoutes, { id: 'DashboardsMenu' }).children
export const WalkthroughRoutes = _.find(MainRoutes, { id: 'WalkthroughMenu' }).children
export const EcommerceRoutes = _.find(MainRoutes, { id: 'EcommerceMenu' }).children
export const OtherRoutes = _.find(MainRoutes, { id: 'OtherMenu' }).children
