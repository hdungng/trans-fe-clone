export enum ImagePath {
  LANDING = 'landing',
  USERS = 'users',
  ORDERS = 'users',
  ECOMMERCE = 'e-commerce',
  PROFILE = 'profile',
  CLIENTS = 'clients'
}

// ==============================|| NEW URL - GET IMAGE URL ||============================== //

export function getImageUrl(name: string, path: string) {
  return new URL(`/src/assets/images/${path}/${name}`, import.meta.url).href;
}
