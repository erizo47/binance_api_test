import { Spot } from '@binance/connector-typescript';

console.log(import.meta.env);

const baseURL = import.meta.env.API_BASE_URL as string ?? '';
const apiKey = import.meta.env.API_KEY as string ?? '';
const secretKey = import.meta.env.SECRET_KEY as string ?? '';
export const $client = new Spot(apiKey, secretKey, { baseURL });
