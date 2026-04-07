'use client';

import Image from "next/image";
import clsx from "clsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { AtSignIcon, PencilIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { ProfileEditModal } from "../ProfileEditModal";

type ProfileCardProps = {
  image?: string;
  username: string;
  realname: string;
  bio: string;
  pagesRead?: number;
  booksRead?: number;
  isOwner?: boolean;
};
export function ProfileCard({
  image,
  username,
  realname,
  bio,
  pagesRead = 0,
  booksRead = 0,
  isOwner = false,
}: ProfileCardProps) {

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <Card
      className={clsx(
        "mt-4",
        "mx-auto",
        "max-w-2xl",
        "overflow-hidden",
        "rounded-2xl",
        "shadow-md",
        "p-0"
      )}
    >
      <CardHeader
        className={clsx(
          "flex justify-between items-end p-6",
          "bg-gray-500 text-white"
        )}
      >
        <div className="flex items-center gap-6">
          {image && (
            <div
              className={clsx(
                "w-24 h-24 shrink-0 overflow-hidden rounded-md",
                "border-4 border-blue-500 shadow-lg"
              )}
            >
              <Image
                src={image}
                alt={`Foto de ${username}`}
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="flex flex-col justify-center">
            <CardTitle className="text-xl font-bold flex items-center gap-1">
              <AtSignIcon size={16} /> {username}
            </CardTitle>
            <CardDescription className="text-sm text-white/80">
              {realname}
            </CardDescription>
          </div>
        </div>

        {isOwner && (
          <Button
            className="self-end cursor-pointer"
            variant="secondary"
            size="icon"
            aria-label="Editar perfil"
            onClick={() => setModalOpen(true)}
          >
            <PencilIcon size={16} />
          </Button>
        )}
      </CardHeader>

      <CardContent
        className={clsx(
          "flex items-center justify-around gap-6",
          "px-6 py-4 text-center",
          "flex-col sm:flex-row"
        )}
      >
        <div className="flex flex-col items-center bg-muted p-2 rounded-sm text-balance">
          <ScrollArea className=" text-wrap">
            {bio}
          </ScrollArea>
        </div>

        <Separator className="sm:hidden" />

        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold">{pagesRead.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">
              Páginas lidas
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-lg font-bold">{booksRead.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">
              Livros lidos
            </span>
          </div>
        </div>
      </CardContent>
      <ProfileEditModal
      key={`${username}-${realname}-${bio}`}
        open={isModalOpen}
        onOpenChange={setModalOpen}
        username={username}
        realname={realname}
        bio={bio}
  
      />
    </Card>

  );
}