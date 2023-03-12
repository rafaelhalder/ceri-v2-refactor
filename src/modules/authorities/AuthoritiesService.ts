import { ref, query, orderByKey, limitToFirst, get } from "firebase/database";
import { database } from "../../core/utils/firebase-connect";
import { Authority } from "./authority.interface";

export async function getList(
  path: string,
  limit: number = 10
): Promise<Record<string, Omit<Authority, 'id'>>> {
  const databaseRef = ref(database, path);
  const orderedQuery = query(databaseRef, orderByKey());
  const limitedQuery = query(orderedQuery, limitToFirst(limit));
  const snapshot = await get(limitedQuery);
  const results = snapshot.val();

  return results;
}

export async function getById(
  path: string,
  id: string
): Promise<Authority | null> {
  try {
    const dataRef = ref(database, `${path}/${id}`);

    const snapshot = await get(dataRef);
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar dados do Realtime Database:", error);
    return null;
  }
}
