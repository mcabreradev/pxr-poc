import { useEffect, useState } from 'react';

function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return { isHydrated, notHydrated: !isHydrated };
}

export default useHydration;
