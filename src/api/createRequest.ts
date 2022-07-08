import { IRequest } from './types';

function ID() {
  return Math.random().toString(36).substring(2, 9);
};

export function createRequest(fromId: string, toId: string): Array<IRequest> {
  const requests: Array<IRequest> = JSON.parse(localStorage.getItem('requests')!);
  requests.push({ id: ID(), fromId, toId })
  localStorage.setItem('requests', JSON.stringify(requests));
  return requests;
}
