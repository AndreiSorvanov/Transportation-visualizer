import dbRequests from '../db/requests.json';
import { IRequest } from './types';

export function getRequests(): Array<IRequest> {
  const requestsString = localStorage.getItem('requests');
  if (requestsString) {
    return JSON.parse(requestsString);
  }
  else {
    localStorage.setItem('requests', JSON.stringify(dbRequests));
    return dbRequests;
  }
}

