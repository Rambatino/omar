import React from 'react'
import sumof from './svgs/sumof.svg'
import pLeft from './svgs/pLeft.svg'
import pRight from './svgs/pRight.svg'
import Base, { SymbolProps } from './Base'
import './Symbols.sass'

class SumOf extends React.Component<SymbolProps> implements Base {
  childCount = 1

  render() {
    return (
      <div className="SumOf">
        {this.props.children === undefined ? (
          <img src={sumof} />
        ) : (
          <div className="horizontal">
            <img style={{ width: 65 }} src={sumof} />
            <img className="p" src={pLeft} />
            {this.props.children[0]}
            <img className="p" src={pRight} />
          </div>
        )}
      </div>
    )
  }
}

export default SumOf
