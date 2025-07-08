
/* eslint @typescript-eslint/no-explicit-any: 0 */  // --> OFF
//import getConfig from 'next/config';

export function fetchAPI(method: string, path: string, object: any | undefined = undefined): Promise<Response> {
  //const { publicRuntimeConfig } = getConfig();
  
  return fetch(`${ process.env.NEXT_PUBLIC_API_URL }${ path }`, {
    method: method,
    body: object ? JSON.stringify(object) : undefined,
    headers: object ? {'Content-Type': 'application/json'} : undefined,
  });
}

export function postTextAPI(method: string, path: string, text: string): Promise<Response> {
  return fetch(`${ process.env.NEXT_PUBLIC_API_URL }${ path }`, {
    method: method,
    body: text,
    headers: {'Content-Type': 'text/plain'},
  });
}