import React from 'react'
import plus from './svgs/plus.svg'
import Base, { SymbolProps } from './Base'
import './Symbols.sass'

class Sum extends React.Component<SymbolProps> implements Base {
  childCount = 2

  render() {
    return (
      <div className="Sum">
        {this.props.children === undefined ? (
          <img src={plus} />
        ) : (
          <div className="horizontal">
            {this.props.children[0]}
            <img src={plus} />
            {this.props.children[1]}
          </div>
        )}
      </div>
    )
  }
}

export default Sum
