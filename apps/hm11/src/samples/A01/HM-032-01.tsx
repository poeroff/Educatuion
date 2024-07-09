import styled from '@emotion/styled';
import { Box, Button, Dialog, EStyleButtonTypes, EStyleFontSizes, Input, InputStatus, Label, Question, Typography } from '@maidt-cntn/ui';
import { BingoGame, HContainer, MathExpression } from '@maidt-cntn/ui/math';
import { useState } from 'react';

export interface IBingoData {
  title: string;
  question: string;
  answer: string;
  solution: string | undefined;
  isCorrect: boolean | null;
}

type TTeam = 'red' | 'blue' | '';

const HM03201 = () => {
  const data: IBingoData[] = [
    {
      title: '다음 빈칸에 알맞은 식은?',
      question: `\\((2x^2-5x+1)-(3x^2+x-8)=\\)`,
      answer: '',
      solution: '-x^2-6x+9',
      isCorrect: null,
    },
    {
      title: '다음 빈칸에 알맞은 식은?',
      question: `\\((2x^2-5x+1)-(3x^2+x-8)=\\)`,
      answer: '',
      solution: '-x^2-6x+9',
      isCorrect: null,
    },
    {
      title: '다음 빈칸에 알맞은 식은?',
      question: `\\((2x^2-5x+1)-(3x^2+x-8)=\\)`,
      answer: '',
      solution: '-x^2-6x+9',
      isCorrect: null,
    },
    {
      title: '다음 빈칸에 알맞은 식은?',
      question: `\\((2x^2-5x+1)-(3x^2+x-8)=\\)`,
      answer: '',
      solution: '-x^2-6x+9',
      isCorrect: null,
    },
    {
      title: '다음 빈칸에 알맞은 식은?',
      question: `\\((2x^2-5x+1)-(3x^2+x-8)=\\)`,
      answer: '',
      solution: '-x^2-6x+9',
      isCorrect: null,
    },
    {
      title: '다음 빈칸에 알맞은 식은?',
      question: `\\((2x^2-5x+1)-(3x^2+x-8)=\\)`,
      answer: '',
      solution: '-x^2-6x+9',
      isCorrect: null,
    },
    {
      title: '다음 빈칸에 알맞은 식은?',
      question: `\\((2x^2-5x+1)-(3x^2+x-8)=\\)`,
      answer: '',
      solution: '-x^2-6x+9',
      isCorrect: null,
    },
    {
      title: '다음 빈칸에 알맞은 식은?',
      question: `\\((2x^2-5x+1)-(3x^2+x-8)=\\)`,
      answer: '',
      solution: '-x^2-6x+9',
      isCorrect: null,
    },
    {
      title: '다음 빈칸에 알맞은 식은?',
      question: `\\((2x^2-5x+1)-(3x^2+x-8)=\\)`,
      answer: '',
      solution: '-x^2-6x+9',
      isCorrect: null,
    },
  ];

  const title = [
    { chapter: 'I-1', chapterName: '다항식의 연산' },
    { chapter: '', chapterName: '속담' },
    { chapter: 'I-2', chapterName: '나머지정리와\n인수분해' },
  ];
  const [bingoData, setBingoData] = useState<IBingoData[]>(data);
  const [openBingoIndex, setOpenBingoIndex] = useState<number | null>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [team, setTeam] = useState<TTeam>('');
  const [bingo, setBingo] = useState<string[]>([]);

  const onClickBingo = (index: number) => {
    if (team === '') return;
    setModalOpen(true);
    setOpenBingoIndex(index);
  };

  const onClickTeamButton = (team: TTeam) => {
    bingoData.map(data => {
      if (!data.isCorrect) {
        data.answer = '';
        data.isCorrect = null;
      }
    });
    setTeam(team);
  };

  const handleModal = () => {
    setModalOpen(false);
    setOpenBingoIndex(null);
  };
  const handleInputOnChange = (index: number, value: string) => {
    const newValue = value;
    setBingoData(prevData => {
      const updatedData = [...prevData];
      updatedData[index] = { ...updatedData[index], answer: newValue, isCorrect: null };
      return updatedData;
    });
  };

  const isDisableSubmitBtn = (index: number) => {
    return (bingoData[index].isCorrect !== null && bingoData[index].isCorrect) || bingoData[index].answer === '';
  };

  const onSubmit = (answer: string, index: number) => {
    const isCorrect = answer === bingoData[index].solution;
    setBingoData(prevData => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        isCorrect: isCorrect,
      };
      return updatedData;
    });
    if (isCorrect) {
      setBingo(prevData => {
        const newBingo = [...prevData];
        newBingo[index] = team;
        return newBingo;
      });
    }
  };
  return (
    <HContainer headerInfo={null}>
      <Box useFull vAlign='center'>
        <Box flex={1} vAlign='start' flexDirection='column'>
          <Typography fontSize='var(--font-size-24)' lineHeight='36px'>
            팀을 선택하세요
          </Typography>
          <Box padding='0 12px' display='flex' width='fit-content'>
            <RedTeamButton type='button' isClick={team === '' ? true : team === 'red'} onClick={() => onClickTeamButton('red')}>
              홍팀
            </RedTeamButton>
            <BlueTeamButton type='button' isClick={team === '' ? true : team === 'blue'} onClick={() => onClickTeamButton('blue')}>
              청팀
            </BlueTeamButton>
          </Box>
        </Box>
        <BingoGame bingoColorData={bingo} title={title} onClickBingo={onClickBingo} />
        {openBingoIndex !== null && (
          <Dialog
            width={808}
            height={334}
            isShow={modalOpen}
            useHeader
            header={() => (
              <Box padding='0 20px' marginTop='-10px'>
                <Question
                  mark={bingoData[openBingoIndex].isCorrect ? 'correct' : bingoData[openBingoIndex].isCorrect === null ? 'none' : 'incorrect'}
                >
                  <Box vAlign='center' padding='10px 0'>
                    <Label value={openBingoIndex + 1} marginLeft={-12} />
                    <Typography>{bingoData[openBingoIndex].title}</Typography>
                  </Box>
                </Question>
              </Box>
            )}
            tabIndex={101}
            useFooter
            onClose={() => handleModal()}
            closeLabel='닫기'
          >
            <Box marginTop='-10px'>
              <Typography fontSize='36px' lineHeight='54px' tabIndex={101 + openBingoIndex}>
                <MathExpression equation={bingoData[openBingoIndex].question} />
              </Typography>
              <Input
                inputSize='x-small'
                width='192px'
                value={bingoData[openBingoIndex].answer}
                readOnly={bingoData[openBingoIndex].isCorrect !== null && bingoData[openBingoIndex].isCorrect}
                status={
                  bingoData[openBingoIndex].isCorrect === null
                    ? InputStatus.ENABLE
                    : bingoData[openBingoIndex].answer === ''
                    ? InputStatus.ENABLE
                    : InputStatus.DEFAULT
                }
                onChange={e => {
                  handleInputOnChange(openBingoIndex, e.target.value);
                }}
                ariaLabel={`${openBingoIndex}번째 답 입력란`}
                tabIndex={101}
              />
              <Box marginTop='48px' vAlign='center'>
                <Button
                  color={EStyleButtonTypes.SECONDARY}
                  onClick={() => {
                    onSubmit(bingoData[openBingoIndex].answer, openBingoIndex);
                  }}
                  disabled={isDisableSubmitBtn(openBingoIndex)}
                  tabIndex={101}
                  ariaLabel={`${openBingoIndex}번째 답 채점하기`}
                >
                  <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-grey-900)' weight={700}>
                    채점하기
                  </Typography>
                </Button>
                {bingoData[openBingoIndex].isCorrect && <Typography color='var(--color-h-math-primary-strong)'>정답입니다</Typography>}
                {bingoData[openBingoIndex].isCorrect !== null && !bingoData[openBingoIndex].isCorrect && (
                  <Typography color='var(--color-red-800)'>오답입니다</Typography>
                )}
              </Box>
            </Box>
          </Dialog>
        )}
      </Box>
    </HContainer>
  );
};

const TeamButton = styled.button<{ isClick: boolean }>`
  width: 97px;
  height: 90px;

  color: var(--color-white);
  font-weight: 700;
  line-height: 42px;

  ${({ isClick }) =>
    isClick === false &&
    `
  background-color : var(--color-grey-400);
`};
`;

const BlueTeamButton = styled(TeamButton)`
  border-radius: 0 8px 8px 0;

  ${({ isClick }) =>
    isClick &&
    `
  background-color : var(--color-blue-700);
`};
`;

const RedTeamButton = styled(TeamButton)`
  border-radius: 8px 0 0 8px;

  ${({ isClick }) =>
    isClick &&
    `
  background-color : var(--color-red-700);
`};
`;

export default HM03201;
