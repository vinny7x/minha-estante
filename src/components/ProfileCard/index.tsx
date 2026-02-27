'use client';

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type ProfileCardProps = {
  image?: string;
  username: string;
  realname: string;
  bio: string;
};

export function ProfileCard({
  image,
  username,
  realname,
  bio,
}: ProfileCardProps) {
  return (
    <Card className="max-w-sm rounded-2xl shadow-md">
      <CardHeader className="flex flex-col items-center text-center gap-3">
        {image && (
          <div className="w-20 h-20 rounded-md overflow-hidden border-2 border-blue-500 ">
            <Image
              src={image}
              alt={`Foto de ${username}`}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div>
          <CardTitle className="text-lg">
            {username}
          </CardTitle>

          <CardDescription>
            {realname}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="text-center text-sm text-muted-foreground">
        {bio}
      </CardContent>
    </Card>
  );
}