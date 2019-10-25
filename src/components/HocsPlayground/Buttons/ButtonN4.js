
/**
 * Необходимо имплементировать компонент и его логику путем композиции хоков и stateless компонента BaseButton
 */
import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import { dec, juxt } from 'ramda'

import withWrap from '../hocs/withWrap'

import BaseButton from './BaseButton'

const withZeroCounter = Component => props => {
  const { counter, setCounter, setOuterColor, setInnerColor } = props

  if (counter === 0) {
    juxt([setOuterColor, setInnerColor])('orange')
    setCounter(() => 5)
  }

  return <Component {...props} />
}

export default compose(
  withState('counter', 'setCounter', 5),
  withZeroCounter,
  withHandlers({ onClick: ({ setCounter }) => () => setCounter(dec) }),

  withWrap(({ children, counter }) => <>{counter}{children}</>)
)(BaseButton)
