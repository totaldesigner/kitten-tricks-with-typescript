import * as React from 'react'
import { Animated, Easing, StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    height: 3,
  },
  value: {
    height: 3,
  },
})

interface ProgressBarProps {
  color: string,
  progress: number,
  style: any,
  width?: number,
}

interface ProgressBarState {
  progress: any
}

export class ProgressBar extends React.Component<ProgressBarProps, ProgressBarState> {
  constructor(props) {
    super(props)
    this.state = {
      progress: new Animated.Value(0),
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.progress >= 0 && this.props.progress !== prevProps.progress) {
      this.animate()
    }
  }

  animate() {
    Animated.timing(this.state.progress, {
      easing: Easing.inOut(Easing.ease),
      duration: 500,
      toValue: this.props.progress,
    }).start()
  }

  render() {
    const width = this.state.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.props.width],
    })

    return (
      <View>
        <Animated.View style={[styles.value, { width }, { backgroundColor: this.props.color }]} />
      </View>
    )
  }
}
