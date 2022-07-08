import { Button, Dialog, DialogTitle, DialogActions, DialogContent, InputLabel, Select, MenuItem, FormGroup, SelectChangeEvent } from '@mui/material';
import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IPoint } from '../../api/types';
import { fetchCreateRequestAction, IState } from '../../store';

export interface ICreateRequestDialog {
  open: boolean;
  onClose: () => void;
}

export function CreateRequestDialog({ open, onClose }: ICreateRequestDialog) {
  const dispatch = useDispatch();
  const points = useSelector<IState, Array<IPoint>>((state) => state.points);

  const [fromId, setFromId] = useState<string>('');
  const [toId, setToId] = useState<string>('');

  const handleClick = (e: MouseEvent<Element>) => {
    e.stopPropagation();
  }

  const handleFromChange = (e: SelectChangeEvent) => {
    setFromId(e.target.value as string);
  };

  const handleToChange = (e: SelectChangeEvent) => {
    setToId(e.target.value as string);
  };

  const close = () => {
    onClose();
  }

  const handleClose = (e: Event, reason: string) => {
    close();
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(fetchCreateRequestAction(fromId, toId));
    close();
  };

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    close();
  };

  useEffect(() => {
    if (open) {
      setFromId(points[0].id);
      setToId(points[1].id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} onClick={handleClick} fullWidth>
      <DialogTitle>Создать заявку</DialogTitle>
      <DialogContent>
        <FormGroup>
          <InputLabel id="fromLabel">Точка погрузки</InputLabel>
          <Select
            labelId="fromLabel"
            id="fromSelect"
            value={fromId}
            onChange={handleFromChange}
            sx={{
              mb: 2,
              width: '100%',
            }}
          >
            {points.filter((point) => point.id !== toId).map((point) => <MenuItem key={point.id} value={point.id}>{point.name}</MenuItem>)}
          </Select>
          <InputLabel id="toLabel">Точка разгрузки</InputLabel>
          <Select
            labelId="toLabel"
            id="toSelect"
            value={toId}
            onChange={handleToChange}
            sx={{
              width: '100%',
            }}
          >
            {points.filter((point) => point.id !== fromId).map((point) => <MenuItem key={point.id} value={point.id}>{point.name}</MenuItem>)}
          </Select>
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Сохранить</Button>
        <Button onClick={handleCancel}>Отмена</Button>
      </DialogActions>
    </Dialog>
  );
}
