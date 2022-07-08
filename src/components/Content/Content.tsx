import { Button, Container, Grid, CircularProgress } from '@mui/material';
import { RoadMap } from '../RoadMap';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
import { IPoint, IRequest, IRouteResponse } from '../../api/types';
import { getRoute } from '../../api/getRoute';
import { MouseEvent, useEffect, useState } from 'react';
import { RequestList } from '../RequestsList';
import { TPointCoords } from '../../config';
import { CreateRequestDialog } from '../CreateRequestModal';

export function Content() {
  const points = useSelector<IState, Array<IPoint>>((state) => state.points);
  const requests = useSelector<IState, Array<IRequest>>((state) => state.requests);
  const chosenRequest = useSelector<IState, IRequest | undefined>((state) => state.chosenRequest);
  const isRequestsListLoading = useSelector<IState, boolean>((state) => state.isRequestsListLoading);

  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [start, setStart] = useState<IPoint | undefined>();
  const [end, setEnd] = useState<IPoint | undefined>();
  const [route, setRoute] = useState<Array<TPointCoords>>([]);

  const dispatch = useDispatch();

  const onCreate = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsCreateOpen(true);
  }

  const onCreateClose = () => {
    setIsCreateOpen(false);
  }

  if (chosenRequest) {
    const startId = chosenRequest.fromId;
    const endId = chosenRequest.toId;

    const newStart = points.find((point) => point.id === startId);
    const newEnd = points.find((point) => point.id === endId);
    if (newStart !== start || newEnd !== end) {
      setRoute([]);
    }

    if (newStart !== start) {
      setStart(newStart);
    }

    if (newEnd !== end) {
      setEnd(newEnd);
    }
  }
  else {
    if (start || end) {
      setStart(undefined);
      setEnd(undefined);
    }
  }

  useEffect(() => {
    function fetchRoute(start: IPoint, end: IPoint): void {
      const resp: Promise<IRouteResponse> = getRoute(start.coordinates, end.coordinates);

      resp.then((res) => {
        if (res.status === 'OK') {
          setRoute(res.route);
        }
      })
    }

    if (start && end) {
      fetchRoute(start, end);
    }
  }, [start, end, dispatch]);

  return (
    <main>
      <Container maxWidth='xl' sx={{
          height: '80vh',
          pt: '24x',
          pb: '24px',
          backgroundColor: 'white',
        }}>
        <Grid container spacing={3} sx={{
          height: '100%'
        }}>
          <Grid item xs={12} md={6} sx={{
            height: '100%',
            overflowY: 'scroll',
          }}>
            {
              isRequestsListLoading
              ? <Container sx={{
                display: 'flex',
                justifyContent: 'center',
              }}>
                  <CircularProgress />
                </Container>
              : <>
                  <Button onClick={onCreate}>Создать заявку</Button>
                  <CreateRequestDialog open={isCreateOpen} onClose={onCreateClose} />
                  <RequestList requests={requests} chosenRequest={chosenRequest} />
                </>
            }
          </Grid>
          <Grid item xs={12} md={6} sx={{
            height: '100%',
          }}>
            <RoadMap start={start} end={end} route={route} />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
