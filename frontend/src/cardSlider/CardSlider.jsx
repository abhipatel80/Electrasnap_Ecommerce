import React from 'react';
import Card from '../../src/components/cards/Card'
import { NavLink } from 'react-router-dom';
import './style.scss';

const CardSlider = ({ title, data, navlink }) => {

    return (
        <>
            <div className="cardslider-main">
                <div className="cardslider-heading">
                    <h3 className='mobile-head'>{title}</h3>
                    {title === "Similar Products" ?
                        null :
                        <NavLink to={navlink} className="viewallbtn-div">
                            <button className="btn btn-primary viewallbtn">VIEW ALL</button>
                        </NavLink>
                    }
                </div>
                <div className="cardslider-cards">
                    <Card data={data.slice(0, 8)} />
                </div>
            </div>
        </>
    )
}

export default CardSlider
