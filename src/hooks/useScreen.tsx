import { Theme, useMediaQuery } from '@mui/material';

export const useScreen = () => {
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return { isMobile, isTablet };
};
