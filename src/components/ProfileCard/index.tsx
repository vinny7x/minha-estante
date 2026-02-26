'use client';

import clsx from "clsx";
import Image from "next/image";

type ProfileCardProps = {
  image: string;
  username: string;
  realname: string;
  bookCounter: number;
  bio: string;
};

export function ProfileCard({
  image,
  username,
  realname,
  bookCounter,
  bio
}: ProfileCardProps) {
  return (
    <div
      className={clsx(
        "max-w-sm p-6 rounded-2xl flex items-center gap-4 flex-col",
        "bg-white shadow-md shadow-black/5",
        "transition-all duration-200",
        
      )}
    >
      {image && (
        <div className="w-20 h-20 rounded-lg border-2 border-blue-500 overflow-hidden shrink-0">
          <Image
            src={image}
            alt="Profile image"
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div
        className={clsx(
          "flex flex-col",
          !image && "pl-1"
        )}
      >
        <span className="text-base font-medium text-blue-500">
          {username}
        </span>

        <span className="text-sm text-gray-500">
          {realname}
        </span>
             


      </div> <p className="">{bio}</p>
    </div>
  );
}