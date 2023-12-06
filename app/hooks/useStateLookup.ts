import { State } from "country-state-city";

const states = State.getStatesOfCountry("US");

const formattedStates = states.map((state) => ({
  stateName: state.name,
  countryCode: state.countryCode
}));

const useStateLookup = () => {
  const getAllStates = () => formattedStates;

  const getStateValue = (value: string) => {
    return formattedStates.find((state) => state.stateName === value);
  }

  return {
    getAllStates,
    getStateValue
  }
};

export default useStateLookup;