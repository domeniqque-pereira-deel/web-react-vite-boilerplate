import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { memo } from 'react';
import { DRAWER_WIDTH } from '../config';
import { ElevationScroll } from '~/components/ElevationScroll';

type Props = {
  onToggleSidebar(): void;
};

export const TopAppBar = memo(({ onToggleSidebar }: Props) => {
  return (
    <ElevationScroll>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer - 1,
          display: {
            md: 'none',
          },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open menu options"
            edge="start"
            onClick={onToggleSidebar}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            Logo
          </Typography>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
});
