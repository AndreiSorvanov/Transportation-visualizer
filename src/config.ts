export type TPointCoords = [number, number];

const API_KEY = 'b9ef43a3a57944fd97f65ae094c837c8';
export const routing_api_url = (pointA: TPointCoords, pointB: TPointCoords) => `https://api.geoapify.com/v1/routing?waypoints=${pointA.join('%2C')}%7C${pointB.join('%2C')}&mode=drive&apiKey=${API_KEY}`;
