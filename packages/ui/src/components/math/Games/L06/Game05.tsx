//06_c_c06_15.html
import { IGameProps, GameContainer } from '../GameCommonElement';

const Game05 = ({ width = 1280, height = 720 }: IGameProps) => {
  return (
    <GameContainer width={width} height={height}>
      {/* iframe size must be bigger than 1280 * 720 */}
      <iframe src='/html/Games/L06/game05.html' width={width} height={height} title='game05' />
    </GameContainer>
  );
};

export default Game05;
