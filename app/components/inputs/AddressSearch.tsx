import {SearchBox} from "@mapbox/search-js-react"; 

interface SearchBoxProps {
    accessToken: string;
    value?: string;
    placeholder?: string;
    onRetrieve: (result: object) => void;
  }

const AddressSearch: React.FC<SearchBoxProps> = ({ accessToken, value, placeholder, onRetrieve }) => {
    if(!accessToken) return null;
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