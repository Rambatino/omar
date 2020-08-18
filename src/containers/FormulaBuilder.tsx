import React, { useState, SyntheticEvent } from 'react'
import Awaiting from '../components/symbols/Awaiting'
import './FormulaBuilder.sass'
import SumOf from '../components/symbols/SumOf'
import Sum from '../components/symbols/Sum'
import Divide from '../components/symbols/Divide'
import Minus from '../components/symbols/Minus'
import Multiply from '../components/symbols/Multiply'
import SquareRoot from '../components/symbols/SquareRoot'
import Squared from '../components/symbols/Squared'
import MathML from 'react-math'

const k = () => Math.random().toString(36).substring(7)

interface Tree {
  subEl: SymbolStore[]
}

interface SymbolStore {
  el: any
  active: boolean
  subEl: SymbolStore[]
  key: string
  value?: string
}

const symbolList = [
  <Sum />,
  <Minus />,
  <Multiply />,
  <Divide />,
  <SquareRoot />,
  <Squared />,
  <SumOf />,
]

const tree: Tree = {
  subEl: [
    {
      el: Awaiting,
      subEl: [],
      active: true,
      key: k(),
    },
  ],
}

const modifyElements = (el: SymbolStore, newElement: string): SymbolStore => {
  if (el.active == true) {
    return {
      el: newElement,
      active: false,
      key: k(),
      subEl: [
        { el: Awaiting, subEl: [], active: true, key: k() },
        { el: Awaiting, subEl: [], active: false, key: k() },
      ],
    }
  }

  return {
    ...el,
    subEl: el.subEl.map((sel) => modifyElements(sel, newElement)),
  }
}

const modifyForKey = (
  el: SymbolStore,
  key: string,
  before: {},
  after: {}
): SymbolStore => {
  if (el.active == true && el.key !== key) {
    return {
      ...el,
      ...before,
    }
  } else if (el.key === key) {
    return {
      ...el,
      ...after,
    }
  }
  return {
    ...el,
    subEl: el.subEl.map((sel) => modifyForKey(sel, key, before, after)),
  }
}

const FormulaBuilder = () => {
  const [formulaList, setFormulaList] = useState(tree)

  const addSymbol = (el: JSX.Element) => () => {
    setFormulaList({
      subEl: formulaList.subEl.map((s) => modifyElements(s, el.type)),
    })
  }

  const elements = (el: SymbolStore): JSX.Element => {
    return React.createElement(
      el.el,
      {
        onClick: awaitingPressed(el.key),
        key: el.key,
        isFocused: el.active,
        value: el.value,
        onChange: (e: React.FormEvent<HTMLInputElement>) => {
          setFormulaList({
            subEl: formulaList.subEl.map((s) =>
              modifyForKey(s, el.key, {}, { value: e.currentTarget.value })
            ),
          })
        },
      },
      el.subEl.map((e) => elements(e))
    )
  }

  const returnElements = (tree: Tree) => {
    return tree.subEl.map((s) => elements(s))
  }

  const awaitingPressed = (key: string) => () => {
    setFormulaList({
      subEl: formulaList.subEl.map((s) =>
        modifyForKey(s, key, { active: false }, { active: true })
      ),
    })
  }

  return (
    <div className="FormulaBuilder">
      <div className="Formula">
        {symbolList.map((el, i) => (
          <div key={i} onClick={addSymbol(el)} className="symbol">
            {el}
          </div>
        ))}
      </div>
      <div className="Builder">{returnElements(formulaList)}</div>

      <MathML text="e^(i pi)=-1" />
    </div>
  )
}

export default FormulaBuilder
