'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { differenceInDays } from 'date-fns';

import useSearchModal from '@/app/hooks/useSearchModal';
import useStateCitiesLookup from '@/app/hooks/useStateCitiesLookup';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const  USStateValue = params?.get('region_name');
  const  startDate = params?.get('startDate');
  const  endDate = params?.get('endDate');
  const  guestCount = params?.get('guestCount');

  const USStateLabel = useMemo(() =>{
    if(USStateValue){
      return USStateValue;
    }
    return 'Any State'
  }, [USStateValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return 'Any Week'
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return 'Add Guests';
  }, [guestCount]);

  return (  
    <div
      className="
        border-[1px] 
        w-full 
        md:w-auto 
        py-2 
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
      "
    >
      <div
        className="
          flex 
          flex-row 
          items-center 
          justify-between
        "
      >
        <div
          onClick={(event)=> {event.stopPropagation(); searchModal.onOpen(0)}}
          className="
            state-city-select
            text-sm 
            font-semibold 
            px-6
          "
        >
          {USStateLabel}
        </div>
        <div
          onClick={(event)=> {event.stopPropagation(); searchModal.onOpen(1)}}
          className="
            date-select
            hidden 
            sm:block 
            text-sm 
            font-semibold 
            px-6 
            border-x-[1px] 
            flex-1 
            text-center
          "
        >
          {durationLabel}
        </div>
        <div
          className="
            text-sm 
            pl-6 
            pr-2 
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-3
          "
        >
          <div
          onClick={(event)=> {event.stopPropagation(); searchModal.onOpen(2)}}
            className="hidden sm:block info-select">
              {guestLabel}
            </div>
          <div 
            className="
              p-2 
              bg-rose-500 
              rounded-full 
              text-white
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Search;