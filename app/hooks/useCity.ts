import { City } from "country-state-city";

const useCity = () => {
  const getAllCities = (stateName: string) => {
      const cities = City.getCitiesOfState("US", stateName);
      const formattedCities = cities.map((city) => ({
        label: city.name,
        stateCode: city.stateCode, 
        latitude: city.latitude,
        longitude: city.longitude
      }))
      return formattedCities;
  }

  const getCityValue = (stateName: string, cityName: string) => {
    return City.getCitiesOfState("US", stateName).find((city) => city.name === cityName)
  }

  return {
    getAllCities,
    getCityValue
  }
};

export default useCity;