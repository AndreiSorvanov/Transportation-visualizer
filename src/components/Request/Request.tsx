import { Card, CardHeader, CardContent, Typography, CardActions, Button } from '@mui/material';
import { IPoint } from '../../api/types';
import { MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateChosenRequestAction } from '../../store';
import { EditRequestDialog } from '../EditRequestModal';
import { DeleteRequestDialog } from '../DeleteRequestModal';

export interface IRequestProps {
  id: string;
  from: IPoint;
  to: IPoint;
  isChosen: boolean;
}

export function Request({ id, from, to, isChosen }: IRequestProps) {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    dispatch(updateChosenRequestAction({ id, fromId: from.id, toId: to.id }));
  }

  const onEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEditOpen(true);
  }

  const onDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDeleteOpen(true);
  }

  const onEditClose = () => {
    setIsEditOpen(false);
  }

  const onDeleteClose = () => {
    setIsDeleteOpen(false);
  }

  return (
    <Card sx={{
      width: '100%',
      mr: '20px',
      border: '1px solid black',
      cursor: 'pointer',
      backgroundColor: isChosen ? 'aquamarine' : 'white',
    }} onClick={onClick}>
      <CardHeader title={`Заявка ${id}`} titleTypographyProps={{ variant: 'h6',component: 'h2' }}></CardHeader>
      <CardContent>
        <Typography variant='body1' color='inherit' component='p' sx={{
          fontSize: {
            xs: '15px',
            xl: '20px',
          },
        }}>
          {`Точка погрузки: ${from.name}`}
        </Typography>
        <Typography variant='body1' color='inherit' component='p' sx={{
          fontSize: {
            xs: '15px',
            xl: '20px',
          },
        }}>
          {`Точка разгрузки: ${to.name}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onEdit}>Редактировать</Button>
        <Button size="small" onClick={onDelete}>Удалить</Button>
      </CardActions>

      <EditRequestDialog open={isEditOpen} requestId={id} from={from} to={to} onClose={onEditClose} />
      <DeleteRequestDialog open={isDeleteOpen} requestId={id} onClose={onDeleteClose} />
    </Card>
  );
}
