import { Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDeleteRequestAction } from '../../store';

export interface IDeleteRequestDialog {
  open: boolean;
  requestId: string;
  onClose: () => void;
}

export function DeleteRequestDialog({ open, requestId, onClose }: IDeleteRequestDialog) {
  const dispatch = useDispatch();

  const handleClick = (e: MouseEvent<Element>) => {
    e.stopPropagation();
  }

  const close = () => {
    onClose();
  }

  const handleClose = (e: Event, reason: string) => {
    close();
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(fetchDeleteRequestAction(requestId));
    close();
  };

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    close();
  };

  return (
    <Dialog open={open} onClose={handleClose} onClick={handleClick}>
      <DialogTitle>Удалить заявку</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Вы действительно хотите удалить заявку?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Удалить</Button>
        <Button onClick={handleCancel}>Отмена</Button>
      </DialogActions>
    </Dialog>
  );
}
