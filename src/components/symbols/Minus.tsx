import React from 'react'
import minus from './svgs/minus.svg'
import Base, { SymbolProps } from './Base'

class Minus extends React.Component<SymbolProps> implements Base {
  childCount = 2

  render() {
    return (
      <div className="Minus">
        {this.props.children === undefined ? (
          <img src={minus} />
        ) : (
          <div className="horizontal">
            {this.props.children[0]}
            <img src={minus} />
            {this.props.children[1]}
          </div>
        )}
      </div>
    )
  }
}

export default Minus
