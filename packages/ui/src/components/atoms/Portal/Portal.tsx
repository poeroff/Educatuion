import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export interface IPortalProps {
  isShow: boolean;
  children?: React.ReactNode;
}
/**
 *
 * @param createPortal
 * @returns
 */
function Portal({ isShow, children }: IPortalProps) {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setVisible(isShow);
    return () => {};
  }, [isShow]);

  return visible ? ReactDOM.createPortal(<>{children}</>, document.body) : null;
}

export default Portal;
