import React from 'react'
import './style.scss'

const Spinner = () => {
    return (
        <>
            <div className="loading">
                <div className="spinner-border spinner" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default Spinner
