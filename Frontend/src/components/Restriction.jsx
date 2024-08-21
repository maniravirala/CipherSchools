import { useEffect } from 'react';

const Restriction = () => {
  useEffect(() => {
    // Disable Copy-Paste
    const disableCopyPaste = (e) => {
      e.preventDefault();
      alert('Copy-Paste is not allowed during the test.');
    };
    document.addEventListener('copy', disableCopyPaste);
    document.addEventListener('paste', disableCopyPaste);

    // Disable Right-Click
    const disableRightClick = (e) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', disableRightClick);

    return () => {
      document.removeEventListener('copy', disableCopyPaste);
      document.removeEventListener('paste', disableCopyPaste);
      document.removeEventListener('contextmenu', disableRightClick);
    };
  }, []);

  return null;
};

export default Restriction;
