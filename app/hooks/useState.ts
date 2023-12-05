import { State } from "country-state-city";

const states = State.getStatesOfCountry("US");

const formattedStates = states.map((state) => ({
  label: state.name,
  countryCode: state.countryCode
}));

const useState = () => {
  const getAllStates = () => formattedStates;

  const getStateValue = (value: string) => {
    return formattedStates.find((state) => state.label === value);
  }

  return {
    getAllStates,
    getStateValue
  }
};

export default useState;
