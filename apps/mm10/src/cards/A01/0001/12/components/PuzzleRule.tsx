import styled from 'styled-components';
import RuleSVG from '@/assets/A01/0001/12/rule.svg';
import ExampleSVG from '@/assets/A01/0001/12/example.svg';
import { Box, ESvgType, Label, SvgIcon } from '@maidt-cntn/ui';

type PuzzleCell = {
  value: number | null;
  color: string;
  showIndex: number;
};

const PuzzleRule = () => {
  return (
    <Box display='flex' flexDirection='column' gap='20px'>
      <Box display='flex' gap='48px'>
        <SvgIcon src={RuleSVG} type={ESvgType.IMG} width='67px' height='36px' />
        <OrderedList>
          <LIElement>
            <Label value='1' color='#FFFFFF' background='#6A6D73' />
            <Box>주어진 수만큼의 정사각형을 같은 색으로 칠하여 직사각형을 만든다.</Box>
          </LIElement>
          <LIElement>
            <Label value='2' color='#FFFFFF' background='#6A6D73' />
            <Box>같은 색으로 칠한 직사각형에는 숫자가 하나만 포함되어야 한다.</Box>
          </LIElement>
          <LIElement>
            <Label value='3' color='#FFFFFF' background='#6A6D73' />
            <Box>색칠한 직사각형은 서로 겹쳐지면 안 된다.</Box>
          </LIElement>
        </OrderedList>
      </Box>
      <Box display='flex' flexDirection='column'>
        <Box display='flex' gap='48px' alignItems='center'>
          <SvgIcon src={ExampleSVG} type={ESvgType.IMG} width='67px' height='36px' />
          <Box>다음은 규칙에 따라 퍼즐을 푼 것이다.</Box>
        </Box>
        <PuzzleBox>{PUZZLE_DATA.map(row => row.map(({ value, color }) => <PuzzleCell $bgColor={color}>{value ?? ''}</PuzzleCell>))}</PuzzleBox>
      </Box>
    </Box>
  );
};

const OrderedList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LIElement = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PuzzleBox = styled.div`
  align-self: center;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  width: 247px;
  height: 190px;
  margin: 20px;
  border-top: 1px solid var(--color-grey-900);
  border-left: 1px solid var(--color-grey-900);
`;

const PuzzleCell = styled.div<{ $bgColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $bgColor }) => $bgColor};
  border-right: 1px solid var(--color-grey-900);
  border-bottom: 1px solid var(--color-grey-900);
`;

const PUZZLE_DATA: PuzzleCell[][] = [
  [
    { value: null, color: '#d0e1f4', showIndex: 0 },
    { value: 5, color: '#d0e1f4', showIndex: 0 },
    { value: null, color: '#d0e1f4', showIndex: 0 },
    { value: null, color: '#d0e1f4', showIndex: 0 },
    { value: null, color: '#d0e1f4', showIndex: 0 },
  ],
  [
    { value: null, color: '#d4ecee', showIndex: 1 },
    { value: null, color: '#fad9df', showIndex: 2 },
    { value: null, color: '#fad9df', showIndex: 2 },
    { value: null, color: '#fdebc6', showIndex: 3 },
    { value: null, color: '#fdebc6', showIndex: 3 },
  ],
  [
    { value: 3, color: '#d4ecee', showIndex: 1 },
    { value: null, color: '#fad9df', showIndex: 2 },
    { value: 6, color: '#fad9df', showIndex: 2 },
    { value: 4, color: '#fdebc6', showIndex: 3 },
    { value: null, color: '#fdebc6', showIndex: 3 },
  ],
  [
    { value: null, color: '#d4ecee', showIndex: 1 },
    { value: null, color: '#fad9df', showIndex: 2 },
    { value: null, color: '#fad9df', showIndex: 2 },
    { value: null, color: '#dbd7eb', showIndex: 4 },
    { value: 2, color: '#dbd7eb', showIndex: 4 },
  ],
];

export default PuzzleRule;
