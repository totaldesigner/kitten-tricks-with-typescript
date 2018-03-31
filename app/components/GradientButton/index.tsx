import { LinearGradient } from 'expo'
import * as React from 'react'
import {
  RkButton,
  RkComponent,
  RkText,
} from 'react-native-ui-kitten'

interface GradientButtonProps {
  colors?: any
  style?: any
  rkType?: string
  text: string
  onPress: () => any
}

interface GradientButtonState {
  /* */ 
}

export class GradientButton extends RkComponent<GradientButtonProps, GradientButtonState> {
  componentName = 'GradientButton'
  typeMapping = {
    button: {},
    gradient: {},
    text: {},
  }

  renderContent(textStyle) {
    if (this.props.text) {
      return (
        <RkText style={textStyle}>
          {this.props.text}
        </RkText>
      )
    } else {
      return this.props.children
    }
  }

  render() {
    const { button, gradient, text: textStyle } = this.defineStyles()
    let colors = this.extractNonStyleValue(gradient, 'colors')
    const { style, ...otherProps } = this.props

    colors = this.props.colors ? this.props.colors : colors

    return (
      <RkButton rkType="stretch"
        style={[button, style]}
        {...otherProps}>
        <LinearGradient colors={colors}
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[gradient]}>
          {this.renderContent(textStyle)}
        </LinearGradient>
      </RkButton>
    )
  }
}