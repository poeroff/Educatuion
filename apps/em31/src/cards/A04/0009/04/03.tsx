import oIcon from '@/assets/example/EM-019-01/o_icon.png';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { BottomSheet, Box, EStyleButtonTypes, ESvgType, ETagLine, IQuestionProps, Label, List, SvgIcon, Tag, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A04000904_Atom } from './store';

const P03 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(A04000904_Atom);
  const [radio, setRadio] = useState<number>(cardData.p03.answer);
  const { changeData, initData, submitData, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='middle' value='3' />
        계산 결과가 더 작은 것에 ○표 하세요.
      </>
    ),
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setShow(show => !show);
      return;
    }

    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        answer: cardData.p03.answer,
        isCorrect: cardData.p03.answer === cardData.p03.solution,
        isSubmitted: true,
      },
    }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p03.answer,
          },
        ],
        isCorrect: cardData.p03.isCorrect,
      },
    ];
    submitData('P03', userSubmission);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData[0]?.value.toString(),
            isCorrect: userSubmissionList[0].isCorrect,
            isSubmitted,
          },
        }));
        setRadio(parseInt(userSubmissionList[0].inputData[0]?.value));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleClick = (index: number) => {
    if (cardData.p03.isSubmitted) return;
    setRadio(index);
    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        answer: index,
        isCorrect: index === cardData.p03.solution,
      },
    }));
    changeData('P03', 1, 1, index);
  };

  useEffect(() => {
    return () => {
      saveData('P03');
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
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      background={'var(--color-white)'}
      onSubmit={handleSubmit}
      submitDisabled={!cardData.p03.answer}
      useRound
      submitBtnColor={cardData.p03.answer ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
    >
      <Box useFull marginLeft={200} height={130} marginTop={0}>
        <List
          gap={0}
          data={['38×5', '31×6']}
          align='horizontal'
          row={({ value, index = 1 }) => (
            <Box key={index}>
              <Box justifyContent='center'>
                <Box background='yellow' padding='12px 80px' useRound marginRight='24px' borderRadius='50px'>
                  <Typography>{value}</Typography>
                </Box>
                <Box vAlign='right' hAlign='right' width={200} marginLeft='30px'>
                  <Typography>(</Typography>
                  <CircleCheck type='button' onClick={() => handleClick(index)} aria-label={`${value}를 선택하는 버튼`}>
                    {index === radio && <SvgIcon type={ESvgType.IMG} size='27px' src={oIcon} alt='O 아이콘' />}
                  </CircleCheck>
                  <Typography>)</Typography>
                </Box>
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
              <Typography>( &nbsp;&nbsp;&nbsp;&nbsp;)( O )</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{`38×5=190, 31×6=186이므로 31×6에 ○표합니다.`}</Typography>
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

export default P03;
