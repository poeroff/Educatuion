//04_c_c07_13.html
import { IGameProps, GameContainer } from '../GameCommonElement';

const Game03 = ({ width = 1280, height = 720 }: IGameProps) => {
  return (
    <GameContainer width={width} height={height}>
      {/* iframe size must be bigger than 1280 * 720 */}
      <iframe src='/html/Games/L02/game03.html' width={width} height={height} title='game03' />
    </GameContainer>
  );
};

export default Game03;
