import * as React from 'react'
import { ListView, StyleSheet, TouchableHighlight, View } from 'react-native'
import { RkStyleSheet, RkText } from 'react-native-ui-kitten'
import { MainRoutes } from '../../config/navigation/routes'

interface ListMenuProps {
  navigation: any
}

interface ListMenuState {
  /* */
}

export class ListMenu extends React.Component<ListMenuProps, ListMenuState> {
  static navigationOptions = {
    title: 'List Menu'.toUpperCase(),
  };
  private data
  private renderRow

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    this.data = ds.cloneWithRows(MainRoutes)
    this.renderRow = this._renderRow.bind(this)
  }

  _renderRow(row) {
    return (
      <TouchableHighlight
        style={styles.item}
        activeOpacity={1}
        onPress={() => {
          this.props.navigation.navigate(row.id)
        }}>
        <View style={styles.container}>
          <RkText style={styles.icon}
            rkType="primary moon xxlarge">{row.icon}</RkText>
          <RkText>{row.title}</RkText>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <ListView
        style={styles.list}
        dataSource={this.data}
        renderRow={this.renderRow}
      />
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  item: {
    height: 80,
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    paddingHorizontal: 16,
  },
  list: {
    backgroundColor: theme.colors.screen.base,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 34,
    textAlign: 'center',
    marginRight: 16,
  },
}))