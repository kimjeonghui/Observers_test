import React from 'react';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
const CustomInput = styled('input')(
  ({ leftRadius, rightRadius, width, height, theme }) => ({
    borderTopLeftRadius: leftRadius,
    borderBottomLeftRadius: leftRadius,
    borderTopRightRadius: rightRadius,
    borderBottomRightRadius: rightRadius,
    backgroundColor: '#f5f6fa',
    border: `0.2px solid ${theme.palette.posco_lg_500}`,
    position: 'relative',
    height: height,
    width: width,
  })
);

export default function SearchInput(props) {
  const { leftRadius, rightRadius, width, height } = props;
  const theme = useTheme();
  return (
    <div>
      <CustomInput
        type='text'
        placeholder='Search'
        leftRadius={leftRadius}
        rightRadius={rightRadius}
        width={width}
        height={height}
      />
      <SearchIcon
        sx={{
          color: theme.palette.posco_gray_300,
        }}
      />
    </div>
  );
}
