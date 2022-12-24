import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url, cookies }) => {

  cookies.delete('access_token', { path: '/' })
  cookies.delete('refresh_token', { path: '/' })

  return new Response(null, { headers: { location: '/', }, status: 302 })

};
