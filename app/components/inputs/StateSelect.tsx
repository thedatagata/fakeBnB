'use client'; 

import useStateCitiesLookup from '@/app/hooks/useStateCitiesLookup';
import Select from 'react-select';

export type USStateValue = {
  stateName: string;
  stateCode: string;
}

interface StateSelectProps {
    value?: USStateValue; 
    onChange: (value: USStateValue) => void;
}

const USStateSelect: React.FC<StateSelectProps> = ({ value, onChange }) => {
    const { getUSStates } = useStateCitiesLookup();

    return (
        <div>
          <Select 
            placeholder="Select a state" 
            isClearable 
            options={getUSStates()}
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

export default USStateSelect;