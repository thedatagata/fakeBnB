import {SearchBox} from "@mapbox/search-js-react"; 

interface SearchBoxProps {
    accessToken?: string;
    value?: object;
    placeholder?: string;
    onRetrieve: (value: string) => void;
  }

const AddressSearch: React.FC<SearchBoxProps> = ({ accessToken, value, placeholder, onRetrieve }) => {
    return (
        <form>
            <SearchBox
            accessToken={accessToken}
            value={value}
            placeholder={placeholder}
            onRetrieve={(result) => onRetrieve(result)}
            />
        </form>
    )
};

export default AddressSearch;