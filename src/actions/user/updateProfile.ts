'use server';

export async function updateProfile(formData: FormData) {
  try {
    const username = formData.get("username") as string;
    const realname = formData.get("realname") as string;
    const bio = (formData.get("bio") as string) || "";
console.log(username)
    // validações básicas
    // TODO: migrar para validação com zod
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

    // TODO: salvar no banco de dados

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Erro inesperado",
    };
  }
}