'use client';

import Image from "next/image";
import clsx from "clsx";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { AtSignIcon, ExternalLinkIcon, PencilIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { ProfileEditModal } from "../ProfileEditModal";
import Link from "next/link";

type ProfileCardProps = {
  image?: string;
  username: string;
  realname: string;
  bio: string;
  pagesRead?: number;
  booksRead?: number;
  isOwner?: boolean;
  publicProfileLink?: string;
};

export function ProfileCard({
  image,
  username,
  realname,
  bio,
  publicProfileLink,
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
        "w-full",
        "max-w-3xl",
        "overflow-hidden",
        "rounded-2xl",
        "border-border/60",
        "shadow-sm",
        "p-0"
      )}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/40 sm:h-20 sm:w-20">
              {image ? (
                <Image
                  src={image}
                  alt={`Foto de ${username}`}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted text-sm font-semibold text-muted-foreground">
                  {username.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold sm:text-xl">{realname || username}</h2>
                {publicProfileLink && (
                  <Link
                    href={publicProfileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Ver perfil público"
                  >
                    <ExternalLinkIcon size={16} />
                  </Link>
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <AtSignIcon size={14} />
                <span>{username}</span>
              </div>
              {bio && (
                <p className="mt-1 max-w-xl text-sm text-muted-foreground line-clamp-2">
                  {bio}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <span className="text-base font-semibold sm:text-lg">
                  {booksRead.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground">Livros lidos</span>
              </div>
              <Separator orientation="vertical" className="h-8" />
              <div className="flex flex-col items-center">
                <span className="text-base font-semibold sm:text-lg">
                  {pagesRead.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground">Páginas lidas</span>
              </div>
            </div>
            {isOwner && (
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setModalOpen(true)}
              >
                <PencilIcon size={14} />
                Editar perfil
              </Button>
            )}
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