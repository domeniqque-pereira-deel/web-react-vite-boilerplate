import { Box, CircularProgress, BoxProps } from '@mui/material';

type Props = {
  size?: number;
};

export const FullLoading = ({ size, ...props }: BoxProps & Props) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    }}
    {...props}
  >
    <CircularProgress size={size} />
  </Box>
);
