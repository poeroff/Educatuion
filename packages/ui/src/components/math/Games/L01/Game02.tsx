//03_c_c07_16.html
import { IGameProps, GameContainer } from '../GameCommonElement';

const Game02 = ({ width = 1280, height = 720 }: IGameProps) => {
  return (
    <GameContainer width={width} height={height}>
      {/* iframe size must be bigger than 1280 * 720 */}
      <iframe src='/html/Games/L01/game02.html' width={width} height={height} title='game02' />
    </GameContainer>
  );
};

export default Game02;
