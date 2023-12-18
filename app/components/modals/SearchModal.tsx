'use client';

import qs from 'query-string';
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

import useSearchModal from '@/app/hooks/useSearchModal';

import Modal from "./Modal";
import StateSelect, { USStateValue } from "../inputs/StateSelect";
import Heading from '../Heading';

enum STEPS {
  USSTATE = 0
}

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const [step, setStep] = useState(STEPS.USSTATE);
  const [usState, setUSState] = useState<USStateValue>();

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.USSTATE) {
      return onNext();
    }
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      region_name: usState?.stateName,
    };

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery,
    }, { skipNull: true });
    searchModal.onClose();
    router.push(url);
  }, 
  [
    step, 
    onNext,
    searchModal,
    usState,
    router,
    params
  ]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which US state are you visiting?"
        subtitle="Find the perfect location!"
      />
      <StateSelect 
        value={usState} 
        onChange={(value) => 
          setUSState(value as USStateValue)}
      />
      {!!usState !== false && (
      <CitySelect
        usState={usState}
        value={stateCity} 
        onChange={(value) => 
          setStateCity(value as StateCityValue)}
      />
      )}
    </div>
  )

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