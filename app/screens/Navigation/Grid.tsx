import * as React from 'react'
import { Dimensions, ScrollView } from 'react-native'
import { RkButton, RkStyleSheet, RkText } from 'react-native-ui-kitten'
import { MainRoutes } from '../../config/navigation/routes'

const paddingValue = 8

interface GridV1Props {
  navigation: any
}

interface GridV1State {
  /* */
}

export class GridV1 extends React.Component<GridV1Props, GridV1State> {
  static navigationOptions = () => ({
    title: 'Grid Menu'.toUpperCase(),
  });

  constructor(props) {
    super(props)
  }

  _calculateItemSize() {
    const { width } = Dimensions.get('window')
    return (width - paddingValue * 6) / 2
  }

  render() {
    const size = this._calculateItemSize()
    const navigate = this.props.navigation.navigate

    const items = MainRoutes.map((route, index) => {
      return (
        <RkButton
          rkType="square shadow"
          style={{ width: size, height: size }}
          key={index}
          onPress={() => {
            navigate(route.id)
          }}>

          <RkText style={styles.icon} rkType="primary moon menuIcon">
            {route.icon}
          </RkText>
          <RkText>{route.title}</RkText>

        </RkButton>
      )
    })

    return (
      <ScrollView style={styles.root}
        contentContainerStyle={styles.rootContainer}>
        {items}
      </ScrollView>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.scroll,
    padding: paddingValue,
  },
  rootContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  icon: {
    marginBottom: 16,
  },
}))