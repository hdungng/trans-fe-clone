import { useEffect, useRef } from 'react';

// ==============================|| ELEMENT REFERENCE HOOKS ||============================== //

export default function useScriptRef() {
  const scripted = useRef(true);

  useEffect(() => {
    return () => {
      // Khi component unmount, đặt scripted.current = false
      scripted.current = false;
    };
  }, []);

  return scripted;
}
