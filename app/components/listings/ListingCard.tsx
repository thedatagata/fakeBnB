'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';


import { 
  SafeListing, 
  SafeReservation, 
  SafeUser 
} from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../Button";
import ClientOnly from "../ClientOnly";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null
};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId)
  }, [disabled, onAction, actionId]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
  
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div 
      onClick={() => router.push(`/listings/${data.id}`)} 
      className="flex py-7 px-2 border-b 
        cursor-pointer 
        hover:opacity-80 
        hover:shadow-lg 
        pr-4 
        transition duration-200 ease-out 
        first:border-t"
    >
      <div className="relative aspect-square w-40 h-24 md:h-52 md:w-80 overflow-hidden rounded-xl flex-shrink-0">
          <Image
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition"
            src={data.imageSrc}
            alt="Listing"
          /> 
      </div>
      <div className="flex flex-col flex-grow pl-5">
        <h4 className="font-semibold text-xl">{data.title}</h4>
        <div className="flex justify-between"> 
          <p>{data.place_name}, {data.region_name}</p>
          <HeartButton 
            listingId={data.id} 
            currentUser={currentUser}
          />
        </div>
        <div className="border-b w-10 pt-2"/>
        <div className="text-sm pt-2 font-light text-neutral-500 flex-grow">
          {data.roomCount} Rooms | {data.guestCount} Guests | {data.bathroomCount} Bathrooms
        </div>
        <div className="flex justify-between items-end pt-5">
          <div>
            <p className="text-gray-500 font-semibold text-lg">{reservationDate || data.category}</p>
          </div>
          <div className="text-lg pb-2">
            <div className="font-semibold">
              ${price}
            </div>
          </div>
        </div>
      </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel} 
            onClick={handleCancel}
          />
        )}
    </div>
   );
}
 
export default ListingCard;