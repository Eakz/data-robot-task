import React, { useMemo } from 'react'
import { useStore } from '../../services/Store'


const CurrencySelect = ({ handlePrimaryChange, value }) => {
    const { currencyData } = useStore()
    const date = useMemo(() => Object.keys(currencyData)[0], [currencyData[0]])
    return (
        <select value={value} onChange={e => handlePrimaryChange(e.target.value)}>
            {currencyData?.[date] && Object.keys(currencyData?.[date]).map((cur, index) => {
                return <option value={cur} key={index} >{cur}</option>
            })}

        </select>
    )
}

export default CurrencySelect