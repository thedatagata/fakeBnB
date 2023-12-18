'use client'; 

import useStateCitiesLookup from '@/app/hooks/useStateCitiesLookup';
import Select from 'react-select';

export type USStateValue = {
  stateName: string;
}

interface CitySelectProps {
    value?: StateCityValue; 
    onChange: (value: StateCityValue) => void;
}

const StateSelect: React.FC<StateSelectProps> = ({ value, usState, onChange }) => {
    const { getCities } = useStateCitiesLookup();

    return (
        <div>
          <Select 
            placeholder="Select a state" 
            isClearable 
            options={getCities(usState?.stateName)}
            value={value}
            onChange={(value) => onChange(value)}
            formatOptionLabel={(option: any) => (
                <div className="
                flex flex-row items-center gap-3">
                  <div>{option.stateName}</div>
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

export default StateSelect;