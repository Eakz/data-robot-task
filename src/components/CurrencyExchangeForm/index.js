import React, { useState, useEffect } from 'react'
import { getAlltoOne } from '../../app/constants'
import ApiService from '../../services/ApiService'
import { useDispatch, useStore } from '../../services/Store'
import CurrencySelect from '../CurrencySelect'
import './styles.css'

const CurrencyExchangeForm = () => {
    const { primaryCurrency, secondaryCurrency, currencyData } = useStore()
    const dispatch = useDispatch()
    const [primaryValue, setPrimaryValue] = useState(1);
    const [secondaryValue, setSecondaryValue] = useState(0);
    const handlePrimaryChange = (v) => dispatch({ type: 'SET_PRIMARY', payload: v })
    const handleSecondaryChange = (v) => dispatch({ type: 'SET_SECONDARY', payload: v })
    useEffect(() => {
        ApiService.apiCall({
            url: getAlltoOne(primaryCurrency)
        }).then(response => dispatch({ type: 'SET_CURRENCY', payload: response.data }))


    }, [dispatch, primaryCurrency])
    const date = Object.keys(currencyData)[0]
    const handleP = e => {
        setPrimaryValue(Math.round(Number(e.target.value)));
        setSecondaryValue(Number(Number(e.target.value) * currencyData?.[date]?.[secondaryCurrency]).toFixed(2))
    }
    const handleS = e => {
        setSecondaryValue(Math.round(Number(e.target.value)));
        setPrimaryValue(Number(Number(e.target.value) / currencyData?.[date]?.[secondaryCurrency]).toFixed(2))
    }

    return (
        <form className="currencyForm" >
            <div className="formRow"><h5>Primary</h5>
                <CurrencySelect
                    value={primaryCurrency}
                    handlePrimaryChange={handlePrimaryChange}
                />
                <h5>Secondary</h5>
                <CurrencySelect
                    value={secondaryCurrency}
                    handlePrimaryChange={handleSecondaryChange}
                /></div>

            <br />
            <label about="primaryV">{primaryCurrency}

                <input name="primaryV" value={primaryValue} type="number" onChange={handleP} min="0" step="1" /></label>
            <br />
            {secondaryCurrency && <label about="secondaryV">{secondaryCurrency}
                <input name="secondaryV" value={secondaryValue} type="number" onChange={handleS} min="0" step="1" /></label>}

            <div className="formRow">
                <h1>
                    {`${primaryValue} ${primaryCurrency} = ${secondaryValue} ${secondaryCurrency}`}
                </h1>

            </div>
        </form>
    )
}

export default CurrencyExchangeForm