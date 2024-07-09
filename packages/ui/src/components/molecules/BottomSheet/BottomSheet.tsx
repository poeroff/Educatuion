import { FC, HTMLAttributes, PropsWithChildren, useEffect, useState } from 'react';
import { BottomSheetContainer, ChildrenContainer, StyledSvg } from './BottomSheet.style';
import CancelSVG from '@maidt-cntn/assets/icons/bottomSheet/Cancel.svg';

interface IBottomSheetProps extends HTMLAttributes<HTMLDivElement> {
  show: boolean;
  bottomSheetTargetId: string;
  height: number | string;
  marginTop?: number;
  closeOption?: {
    useYn: boolean;
    onClose?: React.MouseEventHandler<HTMLImageElement>;
  };
}

export const BottomSheet: FC<PropsWithChildren<IBottomSheetProps>> = ({
  bottomSheetTargetId,
  show,
  height,
  marginTop = 0,
  closeOption,
  children,
  ...rest
}) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const parentNode = document.getElementById(bottomSheetTargetId)?.parentElement;
    if (show) {
      setShouldRender(true);
    }
    if (parentNode && show) {
      parentNode.scrollTo({ top: parentNode.scrollHeight, behavior: 'smooth' });
    } else if (parentNode && !show) {
      parentNode.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [show, shouldRender]);

  const handleAnimationEnd = () => {
    if (!show) {
      setShouldRender(false);
    }
  };
  return (
    shouldRender && (
      <BottomSheetContainer show={show} height={height} onAnimationEndCapture={handleAnimationEnd}>
        <ChildrenContainer marginTop={marginTop}>
          {children}
          {closeOption?.useYn && <StyledSvg src={CancelSVG} onClick={closeOption.onClose} />}
        </ChildrenContainer>
      </BottomSheetContainer>
    )
  );
};

export default BottomSheet;
