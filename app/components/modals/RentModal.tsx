'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMemo, useState, useCallback} from "react";

import useRentModal from '@/app/hooks/useRentModal';

import Modal from "./Modal";
import AddressSearch from '../inputs/AddressSearch';
import Counter from "../inputs/Counter";
import CategoryInput from '../inputs/CategoryInput';
import { categories } from '../navbar/Categories';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import Heading from '../Heading';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

type AddressProperties = {
  address?: string;
  full_address?: string;
  context: {
    country?: { country_code: string };
    region?: { name: string };
    postcode?: { name: string };
    district?: { name: string };
    place?: { name: string };
    neighborhood?: { name: string };
  };
  coordinates?: {
    latitude: number;
    longitude: number;
  };
};

type Feature = {
  properties?: AddressProperties;
};


type AddressData = {
  features?: Feature[];
};

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const { 
    register, 
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      address: '',
      full_address: '',
      country_code: '',
      region_name: '',
      postcode_name: 1,
      place_name: '',
      locality_name: '',
      latitude: 1,
      longitude: 1,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    }
  });

  const address = watch('address');
  const category = watch('category');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const setAddressData = (data: AddressData) => {
    const properties = data.features?.[0]?.properties;
    if (!properties) return;
    const keyValuePairs = {
      'address': properties.address,
      'full_address': properties.full_address,
      'country_code': properties.context?.country?.country_code ?? '',
      'region_name': properties.context?.region?.name ?? '',
      'postcode': properties.context?.postcode?.name ?? '',
      'district_name': properties.context?.district?.name || '',
      'place_name': properties.context?.place?.name || '',
      'neighborhood': properties.context?.neighborhood?.name || '',
      'latitude': properties?.coordinates?.latitude ?? 0,
      'longitude': properties?.coordinates?.longitude ?? 0
    };
    Object.entries(keyValuePairs).forEach(([id, value]) => {
      if (value !== null) {
        setCustomValue(id, value);
      }
    });
  }

  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    setIsLoading(true);
    console.log(data);
    axios.post('/api/listings', data)
    .then(() => {
      toast.success('Listing created!');
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY)
      rentModal.onClose();
    })
    .catch(() => {
      toast.error('Something went wrong.');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div 
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => 
                setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <AddressSearch
          accessToken="pk.eyJ1IjoiZGFzZ2F0YSIsImEiOiJjbHBzdjc4bGcwNjlsMmltbzNpZW5wcDhqIn0.LdzmmormD0IJygyu84VvjA"
          placeholder="Search for your property's address"
          onRetrieve={(res) => setAddressData(res)}
          value={address}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenitis do you have?"
        />
        <Counter 
          onChange={(value) => setCustomValue('guestCount', value)}
          value={guestCount}
          title="Guests" 
          subtitle="How many guests do you allow?"
        />
        <hr />
        <Counter 
          onChange={(value) => setCustomValue('roomCount', value)}
          value={roomCount}
          title="Rooms" 
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter 
          onChange={(value) => setCustomValue('bathroomCount', value)}
          value={bathroomCount}
          title="Bathrooms" 
          subtitle="How many bathrooms do you have?"
        />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue('imageSrc', value)}
          value={imageSrc}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          type="number" 
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="FakeBnB your home!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
}

export default RentModal;
