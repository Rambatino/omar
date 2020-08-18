import React from 'react'
import squared from './svgs/squared.svg'
import pLeft from './svgs/pLeft.svg'
import pRight from './svgs/pRight.svg'
import Base, { SymbolProps } from './Base'
import './Symbols.sass'

class Squared extends React.Component<SymbolProps> implements Base {
  childCount = 1

  render() {
    return (
      <div className="Squared">
        {this.props.children === undefined ? (
          <img src={squared} />
        ) : (
          <div className="horizontal">
            <img className="p" src={pLeft} />
            {this.props.children[0]}
            <img className="p" src={pRight} />
            <p className="squared">2</p>
          </div>
        )}
      </div>
    )
  }
}

export default Squared
