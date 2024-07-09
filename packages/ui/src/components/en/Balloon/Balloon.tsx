import Style, { IStyleBalloon } from './Balloon.style';

interface IBalloon extends IStyleBalloon {
  children?: React.ReactNode;
  ariaLabel?: string;
  whiteSpace?: boolean;
}

export const Balloon = ({ children, ariaLabel, backgroundColor, isShadow, place, whiteSpace = true }: IBalloon) => {
  return (
    <Style.Container aria-label={ariaLabel} backgroundColor={backgroundColor} place={place} isShadow={isShadow} whiteSpace={whiteSpace}>
      {children}
    </Style.Container>
  );
};

export default Balloon;
