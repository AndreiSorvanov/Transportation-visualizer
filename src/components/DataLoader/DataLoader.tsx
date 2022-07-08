import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchPointsAction, fetchRequestsAction } from '../../store';

interface IDataLoaderProps {
  children?: React.ReactNode;
}

export function DataLoader({ children }: IDataLoaderProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPointsAction());
    dispatch(fetchRequestsAction());
  }, [dispatch]);

  return (
    <>
      {children}
    </>
  );
}
