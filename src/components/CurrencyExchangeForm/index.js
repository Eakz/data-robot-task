import React, { useState, useEffect, useMemo } from 'react'
import { getAlltoOne } from '../../app/helpers'
import ApiService from '../../services/ApiService'
import { useDispatch, useStore } from '../../services/Store'
import CurrencySelect from '../CurrencySelect'
import LoadingScreen from '../LoadingScreen'
import './styles.css'

const CurrencyExchangeForm = () => {
    const { primaryCurrency, secondaryCurrency, currencyData } = useStore()
    const dispatch = useDispatch()
    const [primaryValue, setPrimaryValue] = useState(1);
    const [secondaryValue, setSecondaryValue] = useState(1);
    const handlePrimaryChange = (v) => dispatch({ type: 'SET_PRIMARY', payload: v })
    const handleSecondaryChange = (v) => dispatch({ type: 'SET_SECONDARY', payload: v })
    const [loading, setLoading] = useState(false)

    const date = useMemo(() => Object.keys(currencyData)[0], [currencyData[0], loading])
    const handleP = e => {
        if (Number(e?.target?.value)) {
            setPrimaryValue(Math.round(Number(e?.target?.value)));
            setSecondaryValue(Number(Number(e?.target?.value) * currencyData?.[date]?.[secondaryCurrency]).toFixed(2))
        } else {
            setPrimaryValue(e?.target?.value)
        }

    }
    useEffect(() => {
        if (Number(primaryValue)) {
            setLoading(true)

            ApiService.apiCall({
                url: getAlltoOne(primaryCurrency),
            }).then(response => { dispatch({ type: 'SET_CURRENCY', payload: response.data }); setLoading(false) })
        }

    }, [dispatch, primaryCurrency])
    useEffect(() => {
        if (Object.keys(currencyData).length) {
            setSecondaryValue(Number(primaryValue * currencyData?.[date]?.[secondaryCurrency]).toFixed(2))
        }

    }, [secondaryCurrency, primaryValue, primaryCurrency])


    return (
        <form className="currencyForm" >
            {!loading ? <><div className="formRow"><h5>Primary</h5>
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
                <div className="formRow">
                    <h1>
                        {`${primaryValue} ${primaryCurrency} = ${secondaryValue} ${secondaryCurrency}`}
                    </h1>

                </div>
            </> : <LoadingScreen />}
        </form>
    )
}

export default CurrencyExchangeForm