import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, List, SvgIcon, Symbol, Tag, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C03_0005_50 } from './store';

const P01 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(C03_0005_50);
  const [radio, setRadio] = useState<number>(parseInt(cardData.p01.answer));
  const { changeData, initData, submitData, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        차가 더 작은 것을 찾아 ○표 하세요.
      </>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
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

  const isAnswerUnfilled = () => {
    if (isNotEmptyString(cardData.p01.answer)) {
      return false;
    } else {
      return true;
    }
  };

  const setSubmitBtnColor = () => {
    if (isAnswerUnfilled()) {
      return EStyleButtonTypes.SECONDARY;
    } else {
      if (isShow) {
        return EStyleButtonTypes.GRAY;
      } else {
        return EStyleButtonTypes.YELLOW;
      }
    }
  };

  const setSubmitLabel = () => {
    if (cardData.p01.isSubmitted && isShow) {
      return '답안닫기';
    } else if (cardData.p01.isSubmitted && !isShow) {
      return '답안보기';
    } else {
      return '채점하기';
    }
  };

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
        isCorrect: cardData.p01.isCorrect,
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
      background={'var(--color-white)'}
      submitLabel={setSubmitLabel()}
      onSubmit={handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={isAnswerUnfilled()}
      useRound
    >
      <Box useFull marginTop={70} marginLeft={40}>
        <List
          gap={70}
          data={['5×4=20', '8×5=40', '8×4=32']}
          align='horizontal'
          row={({ value, index = 1 }) => (
            <Box vAlign='center' justifyContent='center' key={index} flexDirection='column'>
              {cardData.p01.isSubmitted && index - 1 === radio ? (
                <Box background='red' padding='16px 44px' useRound marginRight='5px'>
                  <Typography>{value}</Typography>
                </Box>
              ) : (
                <Box background='yellow' padding='16px 44px' useRound marginRight='5px'>
                  <Typography>{value}</Typography>
                </Box>
              )}
              <Box vAlign='center' marginTop={10}>
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
              <Typography>( &nbsp;&nbsp; &nbsp; )( {<Symbol type='correct' />} )( &nbsp;&nbsp; &nbsp; )</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>40÷8의 몫은 8×5=40을 이용하여 구할 수 있습니다.</Typography>
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
