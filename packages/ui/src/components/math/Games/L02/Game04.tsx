//05_c_c05_11.html
import { IGameProps, GameContainer } from '../GameCommonElement';

const Game04 = ({ width = 1280, height = 720 }: IGameProps) => {
  return (
    <GameContainer width={width} height={height}>
      {/* iframe size must be bigger than 1280 * 720 */}
      <iframe src='/html/Games/L02/game04.html' width={width} height={height} title='game04' />
    </GameContainer>
  );
};

export default Game04;
