import { ListItem } from '@mui/material';
import { IRequestProps, Request } from '../Request';

interface IRequestItemProps extends IRequestProps {
  isChosen: boolean;
}

export function RequestItem(props: IRequestItemProps) {
  return (
    <ListItem disableGutters={true}>
      <Request {...props} />
    </ListItem>
  );
}
