import { State, City } from 'country-state-city';

const formattedStates = State.getStatesOfCountry('US').map((usState) => ({
  stateName: usState.name, 
  stateCode: usState.isoCode
}));

const useStateCitiesLookup = () => {
  const getUSStates = () => formattedStates; 

  const selectUSState = (value: string) => {
    return formattedStates.find((item) => item.stateName === value);
  }

  const getCities = (stateCode: string) => { 
    const cities = City.getCitiesOfState('US', stateCode);
    console.log(cities[0])
    return cities
  }

  const selectCity = (stateCode: string, value: string) => {
    return City.getCitiesOfState('US', stateCode).find((item) => item.name === value);
  }

  return {
    getUSStates,
    selectUSState, 
    getCities,
    selectCity
  }
};

export default useStateCitiesLookup;