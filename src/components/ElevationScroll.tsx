import { useScrollTrigger } from '@mui/material';
import React from 'react';

interface Props {
  children: React.ReactElement;
}

// https://mui.com/pt/material-ui/react-app-bar/#elevate-app-bar
export function ElevationScroll(props: Props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}
