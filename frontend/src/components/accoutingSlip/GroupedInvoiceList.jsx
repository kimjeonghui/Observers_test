import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';

const GroupedInvoiceList = ({ groupedData }) => {
  const [selected, setSelected] = useState([]);
  const handleCheckboxChange = (invoiceNum) => {
    const selectedIndex = selected.indexOf(invoiceNum);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, invoiceNum);
    } else {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };
  return (
    <div>
      <GroupedInvoiceList groupedData={groupedData} />;
      <FormGroup>
        {Object.keys(groupedData).map((invoiceNumGroup) => (
          <div key={invoiceNumGroup}>
            <Typography variant='h6' gutterBottom>
              {`Invoice Group: ${invoiceNumGroup}`}
            </Typography>
            {groupedData[invoiceNumGroup].map((item) => (
              <FormControlLabel
                key={item.invoice_num}
                control={
                  <Checkbox
                    checked={selected.indexOf(item.invoice_num) !== -1}
                    onChange={() => handleCheckboxChange(item.invoice_num)}
                  />
                }
                label={item.description}
              />
            ))}
          </div>
        ))}
      </FormGroup>
    </div>
  );
};

export default GroupedInvoiceList;
