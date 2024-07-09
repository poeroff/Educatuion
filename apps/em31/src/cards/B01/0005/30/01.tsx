import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, Image, Label, List, Symbol, Tag, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B01_0005_30 } from './store';

const P01 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(B01_0005_30);
  const [radio, setRadio] = useState<number>(parseInt(cardData.p01.answer));
  const { changeData, initData, submitData, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        차가 더 큰 식을 찾아 ○표 하세요.
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShow(show => !show);
      return;
    }

    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        answer: cardData.p01.answer,
        isCorrect: cardData.p01.answer === cardData.p01.solution,
        isSubmitted: true,
      },
    }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer,
          },
        ],
        isCorrect: cardData.p01.answer === cardData.p01.solution,
      },
    ];
    submitData('P01', userSubmission);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value.toString(),
            isCorrect: userSubmissionList[0].isCorrect,
            isSubmitted,
          },
        }));
        setRadio(parseInt(userSubmissionList[0].inputData[0]?.value));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleClick = (index: number) => {
    if (cardData.p01.isSubmitted) return;
    setRadio(index);
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        answer: index.toString(),
        isCorrect: index.toString() === cardData.p01.solution,
      },
    }));
    changeData('P01', 1, 1, index);
  };

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      background={'var(--color-white)'}
      onSubmit={handleSubmit}
      submitDisabled={!cardData.p01.answer}
      useRound
      submitBtnColor={cardData.p01.answer ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
    >
      <Box hAlign='center' position='relative'>
        <Image
          src={'/C01/0005/10/EA31104.png'}
          height='300px'
          width='80%'
          alt='왼쪽에는 792-511을 나타내는 세로셈, 오른쪽에는 638-304를 나타내는 세로셈이 있습니다.'
        />
        {cardData.p01.isSubmitted && radio === 0 && (
          <Box background='red' position='absolute' useRound height={300} width={400} marginRight={400} opacity={0.4}></Box>
        )}
        {cardData.p01.isSubmitted && radio === 1 && (
          <Box background='red' position='absolute' useRound height={300} width={400} marginLeft={400} opacity={0.4}></Box>
        )}
      </Box>
      <Box useFull marginLeft={240}>
        <List
          gap={30}
          data={['281', '334']}
          align='horizontal'
          row={({ index = 1 }) => (
            <Box hAlign='center' justifyContent='center' key={index}>
              <Box vAlign='right' hAlign='right'>
                <Typography>(</Typography>
                <CircleCheck type='button' onClick={() => handleClick(index - 1)}>
                  {index - 1 === radio && <Symbol type='correct' />}
                </CircleCheck>
                <Typography>)</Typography>
              </Box>
            </Box>
          )}
        />
      </Box>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>( &nbsp;&nbsp;&nbsp;&nbsp;)( {<Symbol type='correct' />} )</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{`792-511=281, 638-304=334`}</Typography>
              <Typography>{`=>281<334`}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const CircleCheck = styled.button`
  width: 140px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default P01;
