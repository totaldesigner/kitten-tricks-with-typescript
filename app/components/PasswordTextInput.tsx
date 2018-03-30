import * as React from 'react'
import { RkButton, RkStyleSheet, RkText, RkTextInput } from 'react-native-ui-kitten'
import { FontAwesome } from '../assets/icons'

const styles = RkStyleSheet.create(() => ({
  icon: {
    fontSize: 24,
  },
  button: {
    right: 17,
  },
}))

interface PasswordTextInputProps {
}

interface PasswordTextInputState {
  hidden: boolean
}

export class PasswordTextInput extends React.Component<PasswordTextInputProps, PasswordTextInputState> {

  constructor(props) {
    super(props)
    this.state = { hidden: true }
  }

  render() {
    const button = (
      <RkButton style={styles.button} rkType="clear"
        onPress={() => {
          this.setState({ hidden: !this.state.hidden })
        }}>
        <RkText style={styles.icon} rkType="awesome secondaryColor">{FontAwesome.slashEye}</RkText>
      </RkButton>
    )

    const {
      ...inputProps
    } = this.props

    return (
      <RkTextInput
        autoCapitalize="none"
        rkType="bordered rounded iconRight"
        autoCorrect={false}
        label={button}
        secureTextEntry={this.state.hidden}
        {...inputProps}
      />
    )
  }
}
