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
  const {
    leftRadius,
    rightRadius,
    width,
    height,
    placeholder: customPlaceholder,
    value,
    setValue,
    searchValue,
  } = props;
  const theme = useTheme();
  const placeholder = customPlaceholder || 'Search';
  const onChangeValue = (e) => {
    setValue(e.target.value);
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <CustomInput
        type='text'
        placeholder={placeholder}
        leftRadius={leftRadius}
        rightRadius={rightRadius}
        width={width}
        height={height}
        onChange={onChangeValue}
      />
      <div onClick={searchValue}>
        <SearchIcon
          sx={{
            color: theme.palette.posco_gray_300,
            cursor: 'pointer',
          }}
        />
      </div>
    </div>
  );
}
