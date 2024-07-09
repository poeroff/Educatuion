//02_c_c08_14.html
import { IGameProps, GameContainer } from '../GameCommonElement';

const Game01 = ({ width = 1280, height = 720 }: IGameProps) => {
  return (
    <GameContainer width={width} height={height}>
      {/* iframe size must be bigger than 1280 * 720 */}
      <iframe src='/html/Games/L06/game01.html' width={width} height={height} title='game01' />
    </GameContainer>
  );
};

export default Game01;
