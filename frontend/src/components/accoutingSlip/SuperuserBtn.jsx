import { Box } from '@mui/material';
import ButtonComponent from '../global/Button';

export default function ConfirmRejectBtn() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ButtonComponent width='120px' sx={{ margin: '0 32px' }}>
        승인
      </ButtonComponent>
      <ButtonComponent width='120px' sx={{ margin: '0 32px' }}>
        반려
      </ButtonComponent>
    </Box>
  );
}
