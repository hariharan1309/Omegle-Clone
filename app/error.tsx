'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Error = ({ error }) => {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
    router.replace('/not-found');
  }, [error, router]);

  return null;
};

export default Error;
