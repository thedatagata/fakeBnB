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
    return City.getCitiesOfState('US', stateCode).map((usCity)=> ({
      cityName: usCity.name
    }))
  }

  const selectCity = (stateCode: string, value: string) => {
    const formattedCities = City.getCitiesOfState('US', stateCode).map((usCity)=> ({
      cityName: usCity.name
    }))
    return formattedCities.find((item) => item.cityName === value);
  }

  return {
    getUSStates,
    selectUSState, 
    getCities,
    selectCity
  }
};

export default useStateCitiesLookup;