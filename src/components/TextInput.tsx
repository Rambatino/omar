import React from 'react'
import './textInput.sass'

const TextInput = ({
  locked,
  label,
  setValue,
  value,
}: {
  value: string
  locked: boolean
  label: string
  setValue: (s: string) => void
}) => {
  const [active, setActive] = React.useState(false)
  const [error, setError] = React.useState('')

  const fieldClassName = `field ${
    (locked ? active : active || value) && 'active'
  } ${locked && !active && 'locked'}`

  const changeValue = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  return (
    <div className="TextInput">
      <div className={fieldClassName}>
        <input
          id="1"
          type="text"
          value={value}
          placeholder={label}
          onChange={changeValue}
          onFocus={() => !locked && setActive(true)}
          onBlur={() => !locked && setActive(false)}
        />
        <label htmlFor="1" className={error && 'error'}>
          {error || label}
        </label>
      </div>
    </div>
  )
}

export default TextInput
