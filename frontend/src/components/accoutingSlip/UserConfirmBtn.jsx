import { Box } from '@mui/material';
import ButtonComponent from '../global/Button';

export default function UserConfirmBtn() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ButtonComponent width='120px'>결재 요청</ButtonComponent>
    </Box>
  );
}
