'use client';
import useStateLookup from '@/app/hooks/useStateLookup';
import Select from 'react-select'


export type StateSelectValue = {
  stateName: string;
  countryCode: string;
}

interface StateSelectProps {
  value?: StateSelectValue;
  onChange: (value: StateSelectValue) => void;
}

const StateSelect: React.FC<StateSelectProps> = ({
  value,
  onChange
}) => {
  const { getAllStates } = useStateLookup();

  return ( 
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAllStates()}
        value={value}
        onChange={(value) => onChange(value as StateSelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="
          flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.stateName},
              <span className="text-neutral-500 ml-1">
                {option.countryCode}
              </span>
            </div>
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
   );
}
 
export default StateSelect;