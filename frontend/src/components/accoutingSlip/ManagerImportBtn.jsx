import { Box } from '@mui/material';
import ButtonComponent from '../global/Button';

export default function ImportBtn() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ButtonComponent width='120px'>ERP AP전송</ButtonComponent>
    </Box>
  );
}
