import React, { useEffect, useState } from 'react'
import ApiService from '../services/ApiService'
import { getBetweenDates } from './helpers'
import { useDispatch, useStore } from '../services/Store'
import './main.css'
import Column from '../components/Column'
import CurrencyList from '../components/CurrencyList/Column'
import LoadingScreen from '../components/LoadingScreen'
import CurrencyExchangeForm from '../components/CurrencyExchangeForm'
import ZoomableLineChart from '../components/Chart/ZoomableLineChart'
import moment from 'moment'

const App = () => {
    const { theme, currencyData, primaryCurrency, secondaryCurrency } = useStore()
    const [graphData, setGraphData] = useState([[], [], []])
    const dispatch = useDispatch()
    const today = moment().format('YYYY-MM-DD')
    const monthAgo = moment(new Date().setMonth(new Date().getMonth() - 1)).format('YYYY-MM-DD')
    useEffect(() => {
        ApiService.apiCall({
            url: getBetweenDates(primaryCurrency, monthAgo, today)
        }).then(response => pData(response))


    }, [dispatch, primaryCurrency, secondaryCurrency])

    const pData = (response) => {
        const daysDataPrimary = []
        const daysDataSecondary = []
        const daysDatesData = []
        Object.keys(response.data).map(day => {
            daysDataPrimary.push(response.data[day][primaryCurrency])
            daysDataSecondary.push(response.data[day][secondaryCurrency || primaryCurrency])
            daysDatesData.push(day)
        })
        setGraphData([daysDataPrimary, daysDataSecondary, daysDatesData])
    }
    const themeChange = () => dispatch({ type: 'SET_THEME', payload: theme === 'light' ? 'dark' : 'light' })

    const date = Object.keys(currencyData)?.[0]

    return (<div className={`${theme}`}>

        <div id="pageLayout">
            <Column>

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
                    days={graphData[2]}
                />}
            </Column>
            <button id="themeButton" onClick={themeChange}>{theme}</button>

        </div>

    </div>)

}


export default App