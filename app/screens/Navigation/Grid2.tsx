import * as React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { RkButton, RkStyleSheet, RkText } from 'react-native-ui-kitten'
import { MainRoutes } from '../../config/navigation/routes'

interface GridV2Props {
  navigation: any
}

interface GridV2State {
  dimensions?: any
  height?: number
}

export class GridV2 extends React.Component<GridV2Props, GridV2State> {
  static navigationOptions = {
    title: 'Grid Menu'.toUpperCase(),
  };

  constructor(props) {
    super(props)
    this.state = { dimensions: undefined }
  }

  onLayout = event => {
    if (this.state.height) {
      return
    }
    const dimensions = event.nativeEvent.layout
    this.setState({ dimensions })
  };

  _getEmptyCount(size) {
    const rowCount = Math.ceil((this.state.dimensions.height - 20) / size)
    return rowCount * 3 - MainRoutes.length
  }

  render() {
    const navigate = this.props.navigation.navigate
    let items = [<View key={0} />]

    if (this.state.dimensions) {
      const size = this.state.dimensions.width / 3
      const emptyCount = this._getEmptyCount(size)

      items = MainRoutes.map((route, index) => {
        return (
          <RkButton rkType="tile"
            style={{ height: size, width: size }}
            key={index}
            onPress={() => {
              navigate(route.id)
            }}>
            <RkText style={styles.icon} rkType="primary moon xxlarge">
              {route.icon}
            </RkText>
            <RkText rkType="small">{route.title}</RkText>
          </RkButton>
        )
      })

      for (let i = 0; i < emptyCount; i++) {
        items.push(<View key={'empty' + i} style={[{ height: size, width: size }, styles.empty]} />)
      }
    }

    return (
      <ScrollView
        style={styles.root}
        onLayout={this.onLayout}
        contentContainerStyle={styles.rootContainer}>
        {items}
      </ScrollView>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  rootContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  empty: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
  },
  icon: {
    marginBottom: 16,
  },
}))