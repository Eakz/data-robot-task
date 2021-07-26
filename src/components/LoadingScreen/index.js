import React from 'react'
import './styles.css'

const LoadingScreen = ({reversed}) => {
    return (
        <div id="loading" className={reversed?"loadingScreenReversed":"loadingScreen"} />
    )
}

export default LoadingScreen;