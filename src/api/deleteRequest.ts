import { IRequest } from './types';

export function deleteRequest(id: string): Array<IRequest> {
  const requests: Array<IRequest> = JSON.parse(localStorage.getItem('requests')!);
  const index = requests.findIndex((request) => request.id === id);
  requests.splice(index, 1);
  localStorage.setItem('requests', JSON.stringify(requests));
  return requests;
}
