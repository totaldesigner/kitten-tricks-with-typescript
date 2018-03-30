import * as React from 'react'
import { Switch } from 'react-native'
import { RkComponent } from 'react-native-ui-kitten'

interface RkSwitchProps {
  onValueChange: any
  style: any
  value: any
}

interface RkSwitchState {
  alignItems: string
  left: number
  name: string
  offLeftValue?: number
  onLeftValue?: number
  toggleable: boolean
  value: boolean
  handlerAnimation: any
  switchAnimation: any
}

export class RkSwitch extends RkComponent<RkSwitchProps, RkSwitchState> {
  componentName = 'RkSwitch';
  typeMapping = {
    container: {
      onColor: 'onColor',
      offColor: 'offColor',
    },
    main: {},
  };
  selectedType = 'selected';
  private onChange

  constructor(props) {
    super(props)
    this.onChange = this.props.onValueChange ?
      this.props.onValueChange
      : () => true
  }

  render() {
    const { container } = this.defineStyles()
    const onColor = this.extractNonStyleValue(container, 'onColor')

    return (
      <Switch style={this.props.style}
        value={this.props.value}
        onValueChange={(value) => this.onChange(value)}
        onTintColor={onColor} />
    )
  }
}