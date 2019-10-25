import React from 'react'

export default function withWrap(WrapperComponent) {
  return BaseComponent => props => (
    <WrapperComponent {...props}>
      <BaseComponent {...props} />
    </WrapperComponent>
  )
}
