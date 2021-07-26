import React from 'react'
import { useDispatch, useStore } from '../../../services/Store'
import './styles.css'


const CurrencyList = ({ currencyData, date, }) => {
    const dispatch = useDispatch()
    const { primaryCurrency } = useStore()
    const handleClick = (v) => dispatch({ type: 'SET_PRIMARY', payload: v })
    return (<>
        <h1>{date}</h1>
        <h1>{primaryCurrency}</h1>
        <ul style={{ width: '100%' }}>
            {currencyData?.[date] && Object.keys(currencyData?.[date]).map(cur => {
                return (
                    <li className="listItem" key={cur} onClick={() => { handleClick(cur) }}>
                        <span className="listLeftHalf">{cur}</span><span className="listRightHalf">{`     ${currencyData?.[date][cur]}`}</span>
                    </li>
                )
            })}
        </ul >
    </>
    )
}


export default CurrencyList