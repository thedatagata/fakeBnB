'use client'; 

import useStateCitiesLookup from '@/app/hooks/useStateCitiesLookup';
import Select from 'react-select';

export type StateCityValue = {
  cityName: string;
}

interface CitySelectProps {
    value?: StateCityValue;
    usState?: string;
    onChange: (value: StateCityValue) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({ value, usState, onChange }) => {
    const { getCities } = useStateCitiesLookup();
    return (
        <div>
          <Select 
            placeholder="Select a City" 
            isClearable 
            options={getCities(usState.stateCode)}
            value={value}
            onChange={(value) => onChange(value)}
            formatOptionLabel={(option: any) => (
                <div className="
                flex flex-row items-center gap-3">
                  <div>{option.name}</div>
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

export default CitySelect;