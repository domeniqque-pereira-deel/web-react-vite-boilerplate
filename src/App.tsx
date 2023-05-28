import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@mui/material/styles';
import { Routes } from './routes/Routes';
import { AuthProvider } from './context/AuthContext';

import { theme } from './config/theme';

import { SWRConfig } from 'swr';

import { fetcher } from './config/client';

function App() {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster position="bottom-center" />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </SWRConfig>
  );
}

export default App;
