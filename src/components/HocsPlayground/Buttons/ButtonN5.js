/**
 * Необходимо имплементировать компонент и его логику путем композиции хоков и stateless компонента BaseButton
 */
import React from 'react'
import { juxt } from 'ramda'
import { sample } from 'lodash'
import { compose, withState, withHandlers, lifecycle } from 'recompose'

import BaseButton from './BaseButton'

const colors = ['green', 'blue', 'gray', 'red', 'purple', 'pink', 'orange', 'aliceblue', 'mediumaquamarine']

const withRotateTransformation = Component => props => {
  const transform = {
    transform: `rotate(${props.degrees}deg)`,
    display: 'inline-block'
  }

  return <span style={transform}><Component {...props} /></span>
}

export default compose(
  withState('degrees', 'setDegrees', 0),
  withHandlers({ onClick: ({ setDegrees }) => () => setDegrees(n => n + 30) }),
  withRotateTransformation,
  lifecycle({
    componentDidUpdate() {
      const { degrees, setOuterColor, setInnerColor } = this.props

      degrees % 360 === 0 && juxt([setOuterColor, setInnerColor])(sample(colors))
    }
  })
)(BaseButton)
