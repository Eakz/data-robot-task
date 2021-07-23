import React from 'react'
import './styles.css'


const CurrencyList = ({ currencyData, date, }) => {
    return (
        <ul style={{ width: '100%' }}>
            {currencyData?.[date] && Object.keys(currencyData?.[date]).map(cur => {
                return (
                    <li className="listItem" key={cur}>
                        <span className="listLeftHalf">{cur}</span><span className="listRightHalf">{`     ${currencyData?.[date][cur]}`}</span>
                    </li>
                )
            })}
        </ul>
    )
}


export default CurrencyList