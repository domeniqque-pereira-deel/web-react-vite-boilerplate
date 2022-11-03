import { Stack, Typography } from '@mui/material';
import { useProfile } from '~/hooks/useProfile';

const Home = () => {
  const { data } = useProfile();
  return (
    <Stack>
      <h1>Welcome {data?.name}</h1>
      <Stack spacing={1}>
        {Array.from({ length: 50 }).map((_, index) => (
          <Typography component="p" key={`${index}-p`}>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et.
          </Typography>
        ))}
      </Stack>
    </Stack>
  );
};

export default Home;
