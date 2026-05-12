'use server';

import { getServerSession } from "next-auth";
import { updateUserProfile } from "@/lib/db/queries/user/updateUser";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function updateProfile(formData: FormData) {
  try {
    const username = formData.get("username") as string;
    const realname = formData.get("realname") as string;
    const bio = (formData.get("bio") as string) || "";

    if (!username || username.length < 3) {
      return {
        success: false,
        error: "Username deve ter pelo menos 3 caracteres",
      };
    }

    if (username.length > 20) {
      return {
        success: false,
        error: "Username muito longo",
      };
    }

    if (!realname || realname.length < 2) {
      return {
        success: false,
        error: "Nome muito curto",
      };
    }

    if (realname.length > 50) {
      return {
        success: false,
        error: "Nome muito longo",
      };
    }

    if (bio.length > 200) {
      return {
        success: false,
        error: "Bio muito grande",
      };
    }

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Usuário não autenticado",
      };
    }
    await updateUserProfile(session.user.id, {
      username,
      realname,
      bio,
    });

    return { success: true };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Erro inesperado",
    };
  }
}