import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { RkText, RkTheme } from 'react-native-ui-kitten'
import { RkSwitch } from './Switch/index.android'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 35,
    alignItems: 'center',
  },
})

interface SocialSettingProps {
  icon: string,
  name: string,
  selected?: boolean,
  tintColor: string,
}

interface SocialSettingState {
  progress?: any
  selected?: boolean
}

export class SocialSetting extends React.Component<SocialSettingProps, SocialSettingState> {

  constructor(props) {
    super(props)
    this.state = {
      selected: this.props.selected,
    }
  }

  render() {
    const color = this.state.selected ? this.props.tintColor : RkTheme.current.colors.disabled

    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <RkText rkType="awesome large" style={[styles.icon, { color }]}>{this.props.icon}</RkText>
          <RkText rkType="small" style={{ color }}>{this.props.name}</RkText>
        </View>
        <RkSwitch name={''} value={this.state.selected} onValueChange={(selected) => this.setState({ selected })} />
      </View>
    )
  }
}
