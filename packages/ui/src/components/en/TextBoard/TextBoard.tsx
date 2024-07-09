import Style, { IStyleTextBoard } from './TextBoard.style';

interface ITextBoardProps extends IStyleTextBoard {
  children?: React.ReactNode;
}

export const TextBoard = ({ color, width, children }: ITextBoardProps) => {
  return (
    <Style.Container color={color} width={width}>
      {children}
    </Style.Container>
  );
};

export default TextBoard;
