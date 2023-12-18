import { State, City } from 'country-state-city';

const formattedStates = State.getStatesOfCountry('US').map((usState) => ({
  stateName: usState.name
}));

const useStateCitiesLookup = () => {
  const getUSStates = () => formattedStates; 

  const selectUSState = (value: string) => {
    return formattedStates.find((item) => item.stateName === value);
  }

  const getCities = (state: string) => {
    return City.getCitiesOfState('US', state);
  }

  const selectCity = (state: string, value: string) => {
    return City.getCitiesOfState('US', state).find((item) => item.name === value);
  }

  return {
    getUSStates,
    selectUSState, 
    getCities,
    selectCity
  }
};

export default useStateCitiesLookup;