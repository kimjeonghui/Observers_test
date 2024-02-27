import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import receipt_img from '../assets/spain2.jpeg';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import IconButton from '@mui/material/IconButton';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function EvidenceDetail(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [h, setH] = React.useState('5vh');
  const [w, setW] = React.useState('20vh');

  // useParams hook을 사용하여 URL 파라미터를 추출
  const { month } = useParams();

  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (expanded) {
      setH('5vh');
      setW('20vh');
    } else {
      setH('70vh');
      setW('60vh');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
      }}
    >
      <Typography variant='h6' style={{ fontSize: '25px', marginLeft: '12px' }}>
        {month}-03 14:23:11
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
        }}
      >
        <img
          src={receipt_img}
          alt='img'
          style={{ width: '500px', height: '600px', margin: '7px' }}
        />
        <div style={{ width: '40vh' }}>
          <TableContainer sx={{ maxHeight: 720 }} component={Paper}>
            <Table aria-label='spanning table'>
              <TableBody>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>
                    사무소코드
                  </TableCell>
                  <TableCell align='right' colSpan={2}>
                    HDF32
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>순번</TableCell>
                  <TableCell align='right' colSpan={2}>
                    1
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>회계월</TableCell>
                  <TableCell align='right' colSpan={2}>
                    {month}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>거래일자</TableCell>
                  <TableCell align='right'>{month}-03 14:23:11</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>출금통화</TableCell>
                  <TableCell align='right'>EUR</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>출금금액</TableCell>
                  <TableCell align='right'>33,80</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>식별코드</TableCell>
                  <TableCell align='right'>1106</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>거래내역</TableCell>
                  <TableCell align='right'>직원중식비</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>환산금액</TableCell>
                  <TableCell align='right'>48818.02</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <Card sx={{ height: h, width: w }}>
          <CardActions disableSpacing>
            OCR 결과 보기
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label='show ocr result'
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout='auto' unmountOnExit>
            <CardContent />
            <TableContainer sx={{ maxHeight: 720 }} component={Paper}>
              <Table aria-label='spanning table'>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>
                      MerchantName
                    </TableCell>
                    <TableCell align='right' colSpan={2}>
                      YIFAN HUANG S.L.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>Total</TableCell>
                    <TableCell align='right' colSpan={2}>
                      33.8
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>
                      TransactionDate
                    </TableCell>
                    <TableCell align='right' colSpan={2}>
                      2019-01-12
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>
                      1 Content
                    </TableCell>
                    <TableCell align='right' colSpan={2}>
                      2 MENU DE LA CASA 15,00 30,00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell rowSpan={4} />
                    <TableCell style={{ fontWeight: 'bold' }}>
                      Description
                    </TableCell>
                    <TableCell align='right'>MENU DE LA CASA</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>Price</TableCell>
                    <TableCell align='right'>15</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>
                      Quantity
                    </TableCell>
                    <TableCell align='right'>2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>
                      TotalPrice
                    </TableCell>
                    <TableCell align='right'>30</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>
                      2 Content
                    </TableCell>
                    <TableCell align='right' colSpan={2}>
                      1 CERVEZA JAPONESA 3,80 3,80
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell rowSpan={4} />
                    <TableCell style={{ fontWeight: 'bold' }}>
                      Description
                    </TableCell>
                    <TableCell align='right'>CERVEZA JAPONESA</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>Price</TableCell>
                    <TableCell align='right'>3.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>
                      Quantity
                    </TableCell>
                    <TableCell align='right'>1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>
                      TotalPrice
                    </TableCell>
                    <TableCell align='right'>3.8</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </Card>
      </Box>
    </Box>
  );
}

export default EvidenceDetail;
