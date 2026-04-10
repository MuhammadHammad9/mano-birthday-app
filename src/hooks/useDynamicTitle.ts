import { useEffect } from 'react';
import { RECIPIENT_NAME } from '../constants';

export function useDynamicTitle() {
  useEffect(() => {
    const originalTitle = `Happy Birthday, ${RECIPIENT_NAME}! 🎈`;
    const awayTitle = "✨ Come back! I miss you...";

    document.title = originalTitle;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = awayTitle;
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}
