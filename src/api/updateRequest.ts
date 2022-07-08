import { IRequest } from './types';

export function updateRequest(id: string, fromId: string, toId: string): Array<IRequest> {
  const requests: Array<IRequest> = JSON.parse(localStorage.getItem('requests')!);
  const index = requests.findIndex((request) => request.id === id);
  requests[index] = { id, fromId, toId };
  localStorage.setItem('requests', JSON.stringify(requests));
  return requests;
}
