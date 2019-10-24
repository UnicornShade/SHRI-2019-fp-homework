/**
 * Необходимо имплементировать компонент и его логику путем композиции хоков и stateless компонента BaseButton
 */
import { compose, withState, withHandlers, withProps } from 'recompose';
import { juxt, ifElse, always } from 'ramda'
import BaseButton from './BaseButton';

const setAllColors = (setOuterColor, setInnerColor) => juxt([setOuterColor, setInnerColor])

const isEven = number => number % 2
const getColor = ifElse(
  isEven,
  always('gray'),
  always('green')
)

export default compose(
  withState('counter', 'setCounter', 0),
  withHandlers({
    onClick: ({ setCounter, counter, setOuterColor, setInnerColor }) => () => {
      setAllColors(setOuterColor, setInnerColor)(getColor(counter))

      setCounter(n => ++n)
    }
  }),
  withProps(({ children, counter }) => ({ children: `${counter} ${children}` }))
)(BaseButton)
