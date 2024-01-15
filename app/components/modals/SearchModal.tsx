'use client';

import qs from 'query-string';
import { useCallback, useMemo, useState } from "react";
import { Range } from 'react-date-range';
import { formatISO, set } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';

import useSearchModal from '@/app/hooks/useSearchModal';

import Modal from "./Modal";
import Calender from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import USStateSelect, { USStateValue } from "../inputs/StateSelect";
import USCitySelect, { USCityValue } from "../inputs/CitySelect";
import Heading from '../Heading';

const SearchModal = () => { 
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const [usState, setUSState] = useState<USStateValue>();
  const [usCity, setUSCity] = useState<USCityValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const onSubmit = useCallback(async () => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      region_name: usState?.stateName,
      place_name: usCity?.cityName,
      guestCount,
      roomCount,
      bathroomCount
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }
    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery,
    }, { skipNull: true });
    searchModal.onClose();
    // looks like filters are applied here
    console.log('search params: -> ', updatedQuery)
    router.push(url);
  }, 
  [
    searchModal,
    usState,
    usCity,
    router,
    params, 
    guestCount,
    roomCount,
    bathroomCount,
    dateRange
  ]);

  let bodyContent;
  switch (searchModal.stepNumber) {
    case 0: 
      bodyContent = (<div className="flex flex-col gap-8">
        <Heading
          title="Which US state are you visiting?"
          subtitle="Find the perfect location!"
        />
        <USStateSelect 
          value={usState} 
          onChange={(value) => setUSState(value as USStateValue)}
        />
        {!!usState !== false && usState && (
          <USCitySelect
            stateCode={usState.stateCode}
            value={usCity} 
            onChange={(value) => setUSCity(value as USCityValue)}
          />
        )}
      </div>
    )
      break;
    case 1:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="When do you plan to go?"
            subtitle="Make sure everyone is free!"
          />
          <Calender
            onChange={(value) => setDateRange(value.selection)}
            value={dateRange}
          />
        </div>
      )
      break;
    case 2:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="More information"
            subtitle="Find your perfect place!"
          />
          <Counter 
            onChange={(value) => setGuestCount(value)}
            value={guestCount}
            title="Guests" 
            subtitle="How many guests are coming?"
          />
          <hr />
          <Counter 
            onChange={(value) => setRoomCount(value)}
            value={roomCount}
            title="Rooms" 
            subtitle="How many rooms do you need?"
          />        
          <hr />
          <Counter 
            onChange={(value) => {
              setBathroomCount(value)
            }}
            value={bathroomCount}
            title="Bathrooms"
            subtitle="How many bahtrooms do you need?"
          />
        </div>
      )
      break;
  }


  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel="Submit"
      onSubmit={onSubmit}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
}

export default SearchModal;