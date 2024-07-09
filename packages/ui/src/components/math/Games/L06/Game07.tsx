//08_c_c06_18.html
import { IGameProps, GameContainer } from '../GameCommonElement';

const Game07 = ({ width = 1280, height = 720 }: IGameProps) => {
  return (
    <GameContainer width={width} height={height}>
      {/* iframe size must be bigger than 1280 * 720 */}
      <iframe src='/html/Games/L06/game07.html' width={width} height={height} title='game07' />
    </GameContainer>
  );
};

export default Game07;
