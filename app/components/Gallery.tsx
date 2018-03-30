import * as React from 'react'
import {
  Dimensions,
  ListView,
  StyleSheet,
  View,
} from 'react-native'
import {
  RkButton,
  RkModalImg,
  RkText,
} from 'react-native-ui-kitten'
import { Ellipsis } from './Ellipsis'
import { SocialBar } from './SocialBar'

interface GalleryProps {
  items: any[]
}

interface GalleryState {
  images: any
  items?: any[]
}

export class Gallery extends React.Component<GalleryProps, GalleryState> {

  constructor(props) {
    super(props)
    const source = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id })
    this.state = {
      images: source.cloneWithRows(this.props.items),
    }
  }

  _renderHeader(options) {
    return (
      <View style={styles.header}>
        <RkButton rkType="clear contrast" onPress={options.closeImage}>Close</RkButton>
        <RkText rkType="header4">{`${options.pageNumber}/${options.totalPages}`}</RkText>
        <RkButton rkType="clear">
          <Ellipsis />
        </RkButton>
      </View>
    )
  }

  _renderFooter() {
    return (
      <SocialBar />
    )
  }

  render() {
    const size = (Dimensions.get('window').width - 12) / 3
    return (
      <View style={styles.images}>
        <ListView
          dataSource={this.state.images}
          pageSize={3}
          contentContainerStyle={styles.images}
          renderRow={(rowData, sectionID, rowID) => {
            return (
              <RkModalImg
                style={{ width: size, height: size }}
                renderHeader={this._renderHeader}
                renderFooter={this._renderFooter}
                source={this.props.items}
                index={rowID} />
            )
          }} />
      </View>)
  }
}

const styles = StyleSheet.create({
  images: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 0.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})