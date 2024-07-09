import styled from '@emotion/styled';
import { Box, Button, Dialog, EStyleButtonTypes, EStyleFontSizes, Input, Label, Question, Typography } from '@maidt-cntn/ui';
import { BingoGame, HContainer, MathExpression } from '@maidt-cntn/ui/math';
import { useState } from 'react';

export interface BingoData {
  title: string;
  question: string;
  answer: React.ReactNode;
}

const HM03202 = () => {
  const bingoData: BingoData[] = [
    {
      title: '다음 빈칸에 알맞은 식은?',
      question: `\\((2x^2-5x+1)-(3x^2+x-8)=\\)`,
      answer: 'answer',
    },
    {
      title: '다음 빈칸에 알맞은 식은?',
      question: `\\((2x^2-5x+1)-(3x^2+x-8)=\\)`,
      answer: 'answer',
    },
    {
      title: '다음 빈칸에 알맞은 식은?',
      question: `\\((2x^2-5x+1)-(3x^2+x-8)=\\)`,
      answer: 'answer',
    },
    {
      title: '다음 빈칸에 알맞은 식은?',
      question: `\\((2x^2-5x+1)-(3x^2+x-8)=\\)`,
      answer: 'answer',
    },
    {
      title: '다음 빈칸에 알맞은 식은?',
      question: `\\((2x^2-5x+1)-(3x^2+x-8)=\\)`,
      answer: 'answer',
    },
    {
      title: '다음 빈칸에 알맞은 식은?',
      question: `\\((2x^2-5x+1)-(3x^2+x-8)=\\)`,
      answer: 'answer',
    },
    {
      title: '다음 빈칸에 알맞은 식은?',
      question: `\\((2x^2-5x+1)-(3x^2+x-8)=\\)`,
      answer: 'answer',
    },
    {
      title: '다음 빈칸에 알맞은 식은?',
      question: `\\((2x^2-5x+1)-(3x^2+x-8)=\\)`,
      answer: 'answer',
    },
    {
      title: '다음 빈칸에 알맞은 식은?',
      question: `\\((2x^2-5x+1)-(3x^2+x-8)=\\)`,
      answer: 'answer',
    },
  ];

  const title = [
    { chapter: 'I-1', chapterName: '다항식의 연산' },
    { chapter: '', chapterName: '속담' },
    { chapter: 'I-2', chapterName: '나머지정리와\n인수분해' },
  ];

  const [openBingoIndex, setOpenBingoIndex] = useState<number | null>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(true);
  const [team, setTeam] = useState<string | null>(null);
  const [bingo, setBingo] = useState<string[]>([]);

  const onClickBingo = (index: number) => {
    setModalOpen(true);
    setOpenBingoIndex(index);
  };

  const onClickTeamButton = (team: string) => {
    setTeam(team);
  };

  const handleModal = (openBingoIndex: number | null) => {
    setModalOpen(false);
    setOpenBingoIndex(null);
    if (openBingoIndex !== null && team) {
      const newBingo = bingo;
      newBingo[openBingoIndex] = team;
      setBingo(newBingo);
    }
  };

  return (
    <HContainer headerInfo={null}>
      <Box useFull display='flex'>
        <Box flex={1} display='flex' justifyContent='center' flexDirection='column'>
          <Typography>팀을 선택하세요</Typography>
          <Box padding='0 12px' display='flex' width='fit-content'>
            <RedTeamButton
              type='button'
              isClick={team === null ? true : team === ' var(--color-red-700)'}
              onClick={() => onClickTeamButton(' var(--color-red-700)')}
            >
              홍팀
            </RedTeamButton>
            <BlueTeamButton
              type='button'
              isClick={team === null ? true : team === 'var(--color-blue-700)'}
              onClick={() => onClickTeamButton('var(--color-blue-700)')}
            >
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
                <Question mark={'correct'}>
                  <Box vAlign='center' padding='10px 0'>
                    <Label value={openBingoIndex + 1} marginLeft={-12} />
                    <Typography>{bingoData[openBingoIndex].title}</Typography>
                  </Box>
                </Question>
              </Box>
            )}
            useFooter
            onClose={() => handleModal(openBingoIndex)}
            closeLabel='닫기'
          >
            <Box>
              <Typography fontSize='36px' lineHeight='54px'>
                <MathExpression equation={bingoData[openBingoIndex].question} />
              </Typography>
              <Input inputSize='x-small' width='192px' value='' onChange={() => {}} />

              <Box marginTop='48px' vAlign='center'>
                <Button color={EStyleButtonTypes.SECONDARY}>
                  <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-grey-900)' weight='var(--font-weight-bold)'>
                    채점하기
                  </Typography>
                </Button>
                {/* 정답일때 문구 */}
                <Typography color='var(--color-h-math-primary-strong)'>정답입니다</Typography>
                {/* 오답일때 문구 */}
                <Typography color='var(--color-red-800)'>오답입니다</Typography>
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

export default HM03202;
