import * as React from 'react'
import { Dimensions, FlatList, StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  item: {
    flex: 1,
  },
})

interface WalkthroughProps {
  children: any[],
  onChanged: (pageNum: number) => void,
}

interface WalkthroughState {
}

export class Walkthrough extends React.Component<WalkthroughProps, WalkthroughState> {
  private onScrollEnd

  constructor(props) {
    super(props)

    this.onScrollEnd = this._onScrollEnd.bind(this)
  }

  renderItem = ({ item }) => {
    const { width } = Dimensions.get('window')
    return (
      <View style={[styles.item, { width }]}>
        {item}
      </View>
    )
  };

  _onScrollEnd(e) {
    const contentOffset = e.nativeEvent.contentOffset
    const viewSize = e.nativeEvent.layoutMeasurement
    const pageNum = Math.floor(contentOffset.x / viewSize.width)
    if (this.props.onChanged) {
      this.props.onChanged(pageNum)
    }
  }

  render() {
    const items = this.props.children

    return (
      <FlatList
        style={styles.list}
        data={items}
        onMomentumScrollEnd={this.onScrollEnd}
        keyExtractor={(item) => items.indexOf(item) as any}
        pagingEnabled={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        directionalLockEnabled={true}
        renderItem={this.renderItem}
      />
    )
  }
}
