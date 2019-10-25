/**
 * Необходимо имплементировать компонент и его логику путем композиции хоков и stateless компонента BaseButton
 */
import { compose, withState, withHandlers, withProps, lifecycle } from 'recompose';
import { juxt, ifElse, always, inc } from 'ramda'
import BaseButton from './BaseButton';

const isEven = number => number % 2 === 0

const getColor = ifElse(isEven, always('gray'), always('green'))

export default compose(
  withState('counter', 'setCounter', 0),
  withHandlers({
    onClick: ({ setCounter }) => () => setCounter(inc)
  }),
  withProps(({ children, counter }) => ({ children: `${counter} ${children}` })),
  lifecycle({
    componentDidUpdate() {
      const { setOuterColor, setInnerColor, counter } = this.props

      juxt([setOuterColor, setInnerColor])(getColor(counter))
    }
  })
)(BaseButton)
