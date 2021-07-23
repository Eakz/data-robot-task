import React from 'react'
import './styles.css'

const LoadingScreen = ({reversed}) => {
    return (
        <div className={reversed?"loadingScreenReversed":"loadingScreen"}><h1>loading...</h1></div>
    )
}

export default LoadingScreen;