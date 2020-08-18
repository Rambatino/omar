import React from 'react'
import './Symbols.sass'

const Awaiting = ({
  onClick,
  isFocused,
  value,
  onChange,
}: {
  onClick: () => {}
  onChange: (e: React.FormEvent<HTMLInputElement>) => {}
  isFocused?: boolean
  value?: number
}) => {
  return (
    <div className="Awaiting" onClick={onClick}>
      <div className={'box' + (isFocused ? ' isFocused' : '')}>
        <input type="text" maxLength={1} value={value} onChange={onChange} />
      </div>
    </div>
  )
}

export default Awaiting
