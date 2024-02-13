import { Box } from '@mui/material';
import ButtonComponent from '../global/Button';

export default function VerificationBtn() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ButtonComponent width='120px'>검증</ButtonComponent>
    </Box>
  );
}
