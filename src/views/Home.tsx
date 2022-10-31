import { useProfile } from '~/hooks/useProfile';

const Home = () => {
  const { data } = useProfile();
  return <h1>Welcome {data?.name}</h1>;
};

export default Home;
