import React from 'react'
import './style.scss'

const Spinner = () => {
    return (
        <>
            <div className="loading">
                <div class="spinner-border spinner" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default Spinner
