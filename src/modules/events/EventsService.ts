import {
  ref,
  query,
  orderByKey,
  limitToFirst,
  get,
  set,
  push,
} from "firebase/database";
import { database } from "../../core/utils/firebase-connect";

export async function getList<T>(
  path: string,
  limit: number = 10
): Promise<Record<string, Omit<T, "id">>> {
  const databaseRef = ref(database, path);
  const orderedQuery = query(databaseRef, orderByKey());
  const limitedQuery = query(orderedQuery, limitToFirst(limit));
  const snapshot = await get(limitedQuery);
  const results = snapshot.val();
  return results;
}

export async function getById<T>(path: string, id: string): Promise<T | null> {
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

export async function create<T>(
  path: string,
  payload: T & { id: string }
): Promise<T | null> {
  try {
    const dataRef = ref(database, path);

    const newItem = push(dataRef);

    payload.id = newItem.key;

    await set(dataRef, payload);
  } catch (error) {
    console.error("Erro ao cadastrar dados do Realtime Database:", error);
    return null;
  }
}

export async function update<T>(
  path: string,
  payload: T & { id: string }
): Promise<void> {
  try {
    const dataRef = ref(database, `${path}/${payload.id}`);

    return set(dataRef, payload);
  } catch (error) {
    console.error("Erro ao editar dados do Realtime Database:", error);
    return null;
  }
}
