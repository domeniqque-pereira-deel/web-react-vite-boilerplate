import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import { FullLoading } from '~/components/FullLoading';
import { useScreen } from '~/hooks/useScreen';
import { Sidebar } from './components/Sidebar';
import { DRAWER_WIDTH } from './config';
import { TopAppBar } from './components/TopAppBar';

type Props = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  const { isTablet } = useScreen();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = React.useCallback(() => {
    setMobileOpen((open) => !open);
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <TopAppBar onToggleSidebar={handleDrawerToggle} />

      <Drawer
        variant={isTablet ? 'temporary' : 'permanent'}
        open={mobileOpen || !isTablet}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
        }}
      >
        <Sidebar />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <React.Suspense fallback={<FullLoading />}>{children}</React.Suspense>
      </Box>
    </Box>
  );
};
