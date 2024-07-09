//09_c_c05_14.html
import { IGameProps, GameContainer } from '../GameCommonElement';

const Game08 = ({ width = 1280, height = 720 }: IGameProps) => {
  return (
    <GameContainer width={width} height={height}>
      {/* iframe size must be bigger than 1280 * 720 */}
      <iframe src='/html/Games/L06/game08.html' width={width} height={height} title='game08' />
    </GameContainer>
  );
};

export default Game08;
