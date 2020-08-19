import React from 'react'
import './Formula.sass'
import 'pretty-checkbox/src/pretty-checkbox.scss'

import { MathComponent } from 'mathjax-react'
import TextInput from '../components/TextInput'

declare var AsciiMathParser: any
const parser = new AsciiMathParser()

interface V {
  variable: string
  formula: F
  isName?: boolean
}

interface F {
  text: string
  variables?: V[]
}

interface Store {
  formulas: F[]
}

const vs = (s: string, vars?: V[]): V[] => {
  let matches = s
    .replace(/sum|su|of|bar|ba|sqrt|sqr|sq/g, '')
    .match(/[a-zA-Z=]/g) as Array<string>
  if (matches === null) {
    return []
  }

  if (matches[1] === '=') {
    matches.shift()
    matches.shift()
  }

  return matches
    .filter((v, i, a) => a.indexOf(v) === i)
    .map((m) => ({ variable: m, formula: { text: '' } }))
}

const Formula = () => {
  const [formulas, setFormulas] = React.useState({
    formulas: [{ text: '' }],
  } as Store)

  const textChange = (i: number) => (s: string) => {
    setFormulas({
      formulas: formulas.formulas.map((f, j) =>
        i === j ? { ...f, text: s, variables: vs(s, f.variables) } : f
      ),
    })
  }

  return (
    <div className="Formula">
      <div className="Creation">
        <h2>Formula Editor</h2>
        <p>
          Add ASCII math formula to the text box below to view the visual
          representation of it below. Variables will be picked out for you to
          define what they are
        </p>

        <p>
          See <a href="http://asciimath.org/#syntax">here</a> for help
        </p>

        {formulas.formulas.map((f, i) => (
          <div>
            <div key={i} style={{ margin: 20 }}>
              <TextInput
                value={f.text}
                setValue={textChange(i)}
                label="Formula"
                locked={false}
              />
            </div>
            {f.variables &&
              f.variables.map((v, k) => (
                <div
                  key={i}
                  style={{
                    margin: 20,
                    width: '40vw',
                    float: 'right',
                    display: 'flex',
                    alignItems: 'baseline',
                  }}
                >
                  <p style={{ width: 100 }}>
                    <i>{v.variable} = </i>
                  </p>
                  <div style={{ width: 1000 }}>
                    <TextInput
                      value={v.formula.text}
                      setValue={(s) => {
                        setFormulas({
                          formulas: formulas.formulas.map((f, j) =>
                            i === j
                              ? {
                                  ...f,
                                  variables:
                                    f.variables &&
                                    f.variables.map((v, l) =>
                                      k == l
                                        ? { ...v, formula: { text: s } }
                                        : v
                                    ),
                                }
                              : f
                          ),
                        })
                      }}
                      label={
                        v.isName ? 'Measure Name' : `Formula for ${v.variable}`
                      }
                      locked={false}
                    />
                  </div>
                  <div
                    style={{ marginLeft: 5 }}
                    className="pretty p-default p-curve p-toggle"
                  >
                    <input
                      type="checkbox"
                      onClick={() => {
                        setFormulas({
                          formulas: formulas.formulas.map((f, j) =>
                            i === j
                              ? {
                                  ...f,
                                  variables:
                                    f.variables &&
                                    f.variables.map((v, l) =>
                                      k == l ? { ...v, isName: !v.isName } : v
                                    ),
                                }
                              : f
                          ),
                        })
                      }}
                    />
                    <div className="state p-success p-on">
                      <label>Measure Name</label>
                    </div>
                    <div className="state p-danger p-off">
                      <label>Formula </label>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
      <div className="Display">
        {formulas.formulas.map((f, i) => (
          <div>
            <div key={i} className="DisplayFormula">
              <MathComponent tex={parser.parse(f.text)} />
            </div>
            <div>
              {f.variables &&
                f.variables.map((v, j) => (
                  <div key={j} className="DisplayFormula">
                    {v.isName ? (
                      <p className="MeasureNameText">
                        {`${v.variable} = ${v.formula.text}`}
                      </p>
                    ) : (
                      <MathComponent
                        tex={parser.parse(`${v.variable} = ${v.formula.text}`)}
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Formula

// t = (bar x_1 - bar x_2) / sqrt(s^2/n_1 + s^2/ n_2)
// s = sqrt((sum(x - x_1)^2 + sum(x - x_2)^2) / (n_1 + n_2 - 2))
// n = sum_(i = 0)^(n)x
