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
      <ButtonComponent width='120px'>거래내역 재작성</ButtonComponent>
    </Box>
  );
}
