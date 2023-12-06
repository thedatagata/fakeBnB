'use client';

import Image from "next/image";


import { SafeUser } from "@/app/types";

import Heading from "../Heading";
import HeartButton from "../HeartButton";
import { useState } from "react";
import useStateLookup from "@/app/hooks/useStateLookup";

interface ListingHeadProps {
  title: string;
  stateName: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  stateName,
  imageSrc,
  id,
  currentUser
}) => {
  const { getStateValue } = useStateLookup();

  const location = getStateValue(stateName);

  return ( 
    <>
      <Heading
        title={title}
        subtitle={`${location?.stateName}, ${location?.countryCode}`}
      />
      <div className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <HeartButton 
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
   );
}
 
export default ListingHead;