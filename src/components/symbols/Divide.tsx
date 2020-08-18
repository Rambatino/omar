import React from 'react'
import divide from './svgs/divide.svg'
import minus from './svgs/minus.svg'
import Base, { SymbolProps } from './Base'

class Divide extends React.Component<SymbolProps> implements Base {
  childCount = 2

  render() {
    return (
      <div className="Divide">
        {this.props.children === undefined ? (
          <img src={divide} />
        ) : (
          <div className="vertical">
            {this.props.children[0]}
            <div id="minus" />
            {this.props.children[1]}
          </div>
        )}
      </div>
    )
  }
}

export default Divide
