import React from 'react';
import { Link } from 'react-router-dom';
import LogoImg from '../../assets/posco_logo.png';

export default function Logo(props) {
  const { width, url, height } = props;
  const styles = {
    width: width,
    height: height,
    background: `center / contain no-repeat url('${LogoImg}')`,
  };

  return (
    <Link to={url}>
      <div style={styles}></div>
    </Link>
  );
}
