import { auth } from "./firebase"

export const authenticatedFetch = async (url: string, opts: RequestInit = {}) => {
  const idToken = await auth.currentUser.getIdToken();

  opts.headers = {
    ...opts.headers, 
    Authorization: `Bearer ${idToken}`,
  };

  return await fetch(
    url,
    opts
  )
}