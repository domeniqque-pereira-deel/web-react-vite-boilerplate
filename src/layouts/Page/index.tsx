import { Container } from '@mui/material';
import React from 'react';
import { FullLoading } from '~/components/FullLoading';

type Props = {
  children: React.ReactNode;
};

export const PageLayout = ({ children }: Props) => (
  <React.Suspense fallback={<FullLoading />}>
    <Container component="main" maxWidth="xs">
      {children}
    </Container>
  </React.Suspense>
);
