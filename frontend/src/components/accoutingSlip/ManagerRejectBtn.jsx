import { Box } from '@mui/material';
import ButtonComponent from '../global/Button';

export default function RejectBtn() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ButtonComponent width='120px'>반려</ButtonComponent>
    </Box>
  );
}
