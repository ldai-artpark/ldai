import {useEffect, useRef} from "react";


const useGlobalKeyStrokeSequence = (sequence,onSequenceEntered ) => {
  const readChars = useRef([]);

  useEffect(() => {
    const readCharsAndSave = (e) => {
      readChars.current.push(e.key.toLowerCase());
      if(readChars.current.length > sequence.length){
        readChars.current.splice(0, 1);
      }

      if (readChars.current.join('') === sequence) {
        onSequenceEntered?.();
      }
    }
    window.addEventListener("keydown", readCharsAndSave);
    return () => {
      window.removeEventListener("keydown", readCharsAndSave);
    };
  }, []);

}

export default useGlobalKeyStrokeSequence;
