import React, { useEffect, useState } from 'react'
import { City, Country, State } from 'country-state-city';

const Me = ({ dataOfStateAndCountry }) => {

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const getCountries = async () => {
        try {
            const result = await Country.getAllCountries();
            let allCountries = [];
            allCountries = result?.map(({ isoCode, name }) => ({
                isoCode,
                name
            }));
            const [{ isoCode: firstCountry } = {}] = allCountries;
            setCountries(allCountries);
            setSelectedCountry(firstCountry);
        } catch (error) {
            setCountries([]);
        }
    }

    const getStates = async () => {
        try {
            const result = await State.getStatesOfCountry(selectedCountry);
            let allStates = [];
            allStates = result?.map(({ isoCode, name }) => ({
                isoCode,
                name
            }));
            const [{ isoCode: firstState = '' } = {}] = allStates;
            setCities([]);
            setSelectedCity('');
            setStates(allStates);
            setSelectedState(firstState);
        } catch (error) {
            setStates([]);
            setCities([]);
            setSelectedCity('');
        }
    };

    const getCity = async () => {
        try {
            const result = await City.getCitiesOfState(
                selectedCountry,
                selectedState
            );
            let allCities = [];
            allCities = result?.map(({ name }) => ({
                name
            }));
            const [{ name: firstCity = "" } = {}] = allCities;
            setCities(allCities);
            setSelectedCity(firstCity);
        } catch (error) {
            setCities([]);
        }
    }

    useEffect(() => {
        getCountries();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        getStates();
        // eslint-disable-next-line
    }, [selectedCountry]);

    useEffect(() => {
        getCity();
        // eslint-disable-next-line
    }, [selectedState]);

    let country = countries.find((country) => country.isoCode === selectedCountry)?.name;
    let state = states.find((state) => state.isoCode === selectedState)?.name || "";
    let city = selectedCity;

    const thirdChange = (e) => {
        setSelectedCity(e.target.value);
        dataOfStateAndCountry(e.target.value, state, country);
    }

    const change = (e) => {
        setSelectedState(e.target.value);
        dataOfStateAndCountry(city, state, country);
    }

    const secondChange = (e) => {
        setSelectedCountry(e.target.value);
        dataOfStateAndCountry(city, state, country);
    }

    return (
        <>
            <div className="orderAddressInput">
                <label htmlFor="City">City</label>
                <select value={selectedCity} name="city" onChange={thirdChange} id="city">
                    {cities?.map(({ name }) => {
                        return (
                            <option key={name} value={name}>{name}</option>
                        )
                    })}
                </select>
            </div>
            <div className="orderAddressInput">
                <label htmlFor="State">State</label>
                <select defaultValue={selectedState} name="state" onChange={change} id="state">
                    {states?.map(({ isoCode, name }) => {
                        return (
                            <option key={isoCode} value={isoCode}>{name}</option>
                        )
                    })}
                </select>
            </div>
            <div className="orderAddressInput">
                <label htmlFor="Country">Country</label>
                <select defaultValue={selectedCountry} name="country" onChange={secondChange} id="country">
                    {countries?.map(({ isoCode, name }) => {
                        return (
                            <option key={isoCode} value={isoCode}>{name}</option>
                        )
                    })}
                </select>
            </div>
        </>
    )
}

export default Me;
