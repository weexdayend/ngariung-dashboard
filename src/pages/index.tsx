import { parse } from 'cookie';
import { GetServerSideProps } from 'next';

const Index = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parse(context.req.headers.cookie || '');
  
  // Check if a specific cookie exists
  if (cookies['token'] || cookies['refreshtoken']) {
    // Redirect logic
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
};

export default Index;
