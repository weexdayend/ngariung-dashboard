import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

type Props = {
  isLoggedIn: boolean;
};

function withAuth<P extends Props>(Component: React.ComponentType<P>) {
  return function WrappedWithAuth(props: P) {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
      const checkLoginStatus = async () => {
        try {
          const response = await axios.get(`https://sakapulse.vercel.app/api/auth`);
          const data = response.data;
          setIsLoggedIn(data.isLoggedIn); // Set the isLoggedIn state based on API response
        } catch (error) {
          console.log('Authentication required');
          router.replace('/auth');
        }
      };

      checkLoginStatus();
    }, [router]);

    // Don't render the component if the user is not logged in
    if (!isLoggedIn) {
      return null;
    }

    // Pass the isLoggedIn value and other props to the wrapped component
    return <Component {...props} isLoggedIn={isLoggedIn} />;
  };
}

export default withAuth;
