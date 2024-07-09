//02_c_c07_13.html
import { IGameProps, GameContainer } from '../GameCommonElement';

const Game01 = ({ width = 1280, height = 720 }: IGameProps) => {
  return (
    <GameContainer width={width} height={height}>
      {/* iframe size must be bigger than 1280 * 720 */}
      <iframe src='/html/Games/L03/game01.html' width={width} height={height} title='game01' />
    </GameContainer>
  );
};

export default Game01;
