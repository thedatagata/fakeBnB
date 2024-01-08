'use client'; 

import useStateCitiesLookup from '@/app/hooks/useStateCitiesLookup';
import Select from 'react-select';

export type USCityValue = {
  cityName?: string;
}

interface CitySelectProps {
    value?: USCityValue;
    stateCode: string;
    onChange: (value: USCityValue) => void;
}

const USCitySelect: React.FC<CitySelectProps> = ({ value, stateCode, onChange }) => {
    const { getCities } = useStateCitiesLookup();
    return (
        <div>
          <Select 
            placeholder="Select a City" 
            isClearable 
            options={getCities(stateCode)}
            value={value}
            onChange={(value) => onChange(value)}
            formatOptionLabel={(option: any) => (
                <div className="
                flex flex-row items-center gap-3">
                  <div>{option.cityName}</div>
                </div>
              )}
              classNames={{
                control: () => 'p-3 border-2',
                input: () => 'text-lg',
                option: () => 'text-lg'
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                  ...theme.colors,
                  primary: 'black',
                  primary25: '#ffe4e6'
                }
              })}
            />
          </div>
    )
};

export default USCitySelect;