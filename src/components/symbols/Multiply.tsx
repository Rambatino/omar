import React from 'react'
import multiply from './svgs/multiply.svg'
import Base, { SymbolProps } from './Base'

class Multiply extends React.Component<SymbolProps> implements Base {
  childCount = 2

  render() {
    return (
      <div className="Multiply">
        {this.props.children === undefined ? (
          <img src={multiply} />
        ) : (
          <div className="horizontal">
            {this.props.children[0]}
            <img src={multiply} />
            {this.props.children[1]}
          </div>
        )}
      </div>
    )
  }
}

export default Multiply
