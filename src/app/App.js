import React, { Suspense, useEffect, useState } from 'react'
import ApiService from '../services/ApiService'
import { getAlltoOne, getBetweenDates } from './constants'
import { useDispatch, useStore } from '../services/Store'
import './main.css'
import Column from '../components/Column'
import CurrencyList from '../components/CurrencyList/Column'
import LoadingScreen from '../components/LoadingScreen'
import CurrencyExchangeForm from '../components/CurrencyExchangeForm'
import ZoomableLineChart from '../components/Chart/ZoomableLineChart'

const App = () => {
    const { theme, currencyData, primaryCurrency, secondaryCurrency } = useStore()
    const [currency, setCurrency] = useState(primaryCurrency)
    const [graphData, setGraphData] = useState([[], []])
    const dispatch = useDispatch()
    useEffect(() => {
        ApiService.apiCall({
            url: getAlltoOne(currency)
        }).then(response => dispatch({ type: 'SET_CURRENCY', payload: response.data }))


    }, [dispatch, currency])
    useEffect(() => {
        ApiService.apiCall({
            url: getBetweenDates(currency)
        }).then(response => pData(response))


    }, [dispatch, primaryCurrency, secondaryCurrency])
    
    const pData = (response) => {
        const daysDataPrimary = []
        const daysDataSecondary = []
        Object.keys(response.data).map(day => {
            daysDataPrimary.push(response.data[day][primaryCurrency])
            daysDataSecondary.push(response.data[day][secondaryCurrency || primaryCurrency])
        })
        setGraphData([daysDataPrimary, daysDataSecondary])
    }
    const themeChange = () => dispatch({ type: 'SET_THEME', payload: theme === 'light' ? 'dark' : 'light' })

    const date = Object.keys(currencyData)?.[0]

    return (<div className={`${theme}`}>

        <div id="pageLayout">
            <Column>
                <h1>{date}</h1>
                <h1>{currency}</h1>
                {
                    Object.keys(currencyData).length ? <CurrencyList
                        currencyData={currencyData}
                        date={date}
                    /> : <LoadingScreen reversed />
                }


            </Column>
            <Column>
                <CurrencyExchangeForm />
                {graphData[0].length && graphData[1].length && <ZoomableLineChart
                    data={graphData[0]}
                    data2={graphData[1]}
                />}
            </Column>
            <button id="themeButton" onClick={themeChange}>{theme}</button>

        </div>

    </div>)

}


export default App