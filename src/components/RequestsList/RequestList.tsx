import styles from './RequestList.module.css';
import { List } from '@mui/material';
import { IPoint, IRequest } from '../../api/types';
import { useSelector } from 'react-redux';
import { IState } from '../../store';
import { RequestItem } from '../RequestItem';

export interface IRequestListProps {
  requests: Array<IRequest>;
  chosenRequest?: IRequest;
}

export function RequestList({ requests, chosenRequest }: IRequestListProps) {
  let chosenIndex = -1;
  if (chosenRequest) {
    chosenIndex = requests.findIndex((request) => request.id === chosenRequest.id);
  }

  const points = useSelector<IState, Array<IPoint>>((state) => state.points);

  const requestsWithPoints = requests
    .map((req) => {
      const fromPoint = points.find((point) => point.id === req.fromId);
      const toPoint = points.find((point) => point.id === req.toId);
      return { id: req.id, from: fromPoint, to: toPoint };
    })
    .filter((req) => req.from && req.to);

  return (
    <>
      {
        requestsWithPoints.length > 0
        ? <List disablePadding={true}>
            {requestsWithPoints.map((req, index) => {
              return <RequestItem key={req.id} id={req.id} from={req.from!} to={req.to!} isChosen={index === chosenIndex} />
            })}
          </List>
        : <span className={styles.empty}>Список заявок пуст</span>
      }
    </>
  );
}
