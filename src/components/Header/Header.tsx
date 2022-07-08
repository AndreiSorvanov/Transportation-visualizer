import { AppBar, Typography } from '@mui/material';

export function Header() {
  return (
    <AppBar position='static' sx={{
      mb: 3,
      padding: {
        xs: '10px 0',
        md: '20px 0',
        xl: '30px 0',
      }
    }}>
      <Typography variant='h1' color='inherit' component='h1' align='center' sx={{
        fontSize: {
          xs: '20px',
          xl: '30px',
        },
      }}>
        Модуль отображения заявок на перевозку
      </Typography>
    </AppBar>
  );
}
