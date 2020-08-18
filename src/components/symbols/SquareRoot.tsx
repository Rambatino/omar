import React from 'react'
import root from './svgs/root.svg'
import pLeft from './svgs/pLeft.svg'
import pRight from './svgs/pRight.svg'
import Base, { SymbolProps } from './Base'
import './Symbols.sass'

class SquareRoot extends React.Component<SymbolProps> implements Base {
  childCount = 1

  render() {
    return (
      <div className="SquareRoot">
        {this.props.children === undefined ? (
          <img src={root} />
        ) : (
          <div className="horizontal">
            <img style={{ width: 65 }} src={root} />
            <img className="p" src={pLeft} />
            {this.props.children[0]}
            <img className="p" src={pRight} />
          </div>
        )}
      </div>
    )
  }
}

export default SquareRoot
