import BalloonGroups from './BalloonGroups'

export default function HintPanel({ a, b, onClose }) {
  const answer = a * b

  return (
    <div className="mw-hint-overlay" onClick={onClose}>
      <div className="mw-hint-panel" onClick={e => e.stopPropagation()}>
        <div className="mw-hint-head">
          <h3 className="mw-hint-title">💡 רֶמֶז: {a} × {b} = ?</h3>
          <button className="mw-hint-close" onClick={onClose}>✕</button>
        </div>

        {/* Balloon groups — multiplication = times */}
        <BalloonGroups a={a} b={b} autoPlay />

        {/* Multiplication table */}
        <div className="mw-table-section">
          <p className="mw-table-title">📊 לוּחַ הַכֶּפֶל — מְצָא אֶת הַתְּשׁוּבָה:</p>
          <div className="mw-table-scroll">
            <table className="mw-mult-table">
              <thead>
                <tr>
                  <th className="mw-th-corner">×</th>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <th key={n} className={n === a || n === b ? 'mw-th-hi' : ''}>{n}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(row => (
                  <tr key={row}>
                    <th className={row === a || row === b ? 'mw-th-hi' : ''}>{row}</th>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(col => (
                      <td
                        key={col}
                        className={
                          (row === a && col === b) || (row === b && col === a)
                            ? 'mw-td-answer'
                            : row === a || col === a || row === b || col === b
                            ? 'mw-td-dim'
                            : ''
                        }
                      >
                        {row * col}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button className="mw-hint-got-it" onClick={onClose}>הֵבַנְתִּי! ✓</button>
      </div>
    </div>
  )
}
