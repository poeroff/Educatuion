//07_c_c06_14.html
import { IGameProps, GameContainer } from '../GameCommonElement';

const Game06 = ({ width = 1280, height = 720 }: IGameProps) => {
  return (
    <GameContainer width={width} height={height}>
      {/* iframe size must be bigger than 1280 * 720 */}
      <iframe src='/html/Games/L05/game06.html' width={width} height={height} title='game06' />
    </GameContainer>
  );
};

export default Game06;
