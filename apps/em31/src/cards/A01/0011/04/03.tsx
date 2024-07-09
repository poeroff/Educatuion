import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Container } from '@maidt-cntn/ui/math';
import { BottomSheet, Box, BoxWrap, EStyleButtonTypes, ETagLine, IQuestionProps, Input, Label, Tag, Typography } from '@maidt-cntn/ui';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { A01_0011_04 } from './store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';

import ConnectorLine from '../../../../assets/example/connector_line.svg';
import ConnectorArrow from '../../../../assets/example/connector_arrow.svg';

const P03 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0011_04);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={3} />
        빈칸에 알맞은 수를 써넣으세요.
      </>
    ),
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
      return;
    }

    const isCorrect1 = isAnswer(cardData.p03.answer1, cardData.p03.solution1);
    const isCorrect2 = isAnswer(cardData.p03.answer2, cardData.p03.solution2);
    const isCorrect = isCorrect1 && isCorrect2;

    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.answer1,
            isAnswer: true,
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p03.answer2,
            isAnswer: true,
            isCorrect: isCorrect2,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P03', userSubmission, isCorrect);
  };

  const getButtonStatus = (answer: string, solution: string) => {
    if (!cardData.p03.isSubmitted) {
      return '';
    }
    return !isAnswer(answer, solution) ? 'error' : 'enable';
  };

  const { userId } = useRecoilValue(studentAtom);
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];
  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p03.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const setValue = (event: React.ChangeEvent<HTMLInputElement>, answerNo: number) => {
    if (isNaN(Number(event.target.value))) {
      return;
    }

    setCardData(prev => ({ ...prev, p03: { ...prev.p03, [`answer${answerNo}`]: event.target.value } }));
    changeData('P03', 1, answerNo, event.target.value);
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

  const canSubmit = () => {
    return isNotEmptyString(cardData.p03.answer1) && isNotEmptyString(cardData.p03.answer2);
  };

  const getSubmitBtnColor = () => {
    if (!cardData.p03.isSubmitted) {
      return !canSubmit() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW;
    } else {
      return !isShow ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.GRAY;
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={!canSubmit()}
      submitBtnColor={getSubmitBtnColor()}
      vAlign='flex-start'
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' hAlign='center' useRound width='636px' height='172px'>
          <BoxWrap display='flex' justifyContent='center' boxGap={0} marginTop='65px'>
            <Box width='130px' height='52px' hAlign='center' borderRadius='8px' background='var(--color-yellow-300)'>
              435
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>+ 547</GrayRoundBox>
            </Box>
            <Box>
              <Input
                width='130px'
                ariaLabel='답 입력란'
                value={cardData.p03.answer1}
                status={getButtonStatus(cardData.p03.answer1, cardData.p03.solution1)}
                onChange={e => setValue(e, 1)}
                readOnly={cardData.p03.isSubmitted}
              />
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>-293</GrayRoundBox>
            </Box>
            <Box>
              <Input
                width='130px'
                ariaLabel='답 입력란'
                value={cardData.p03.answer2}
                status={getButtonStatus(cardData.p03.answer2, cardData.p03.solution2)}
                onChange={e => setValue(e, 2)}
                readOnly={cardData.p03.isSubmitted}
              />
            </Box>
          </BoxWrap>
        </Box>
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
              <Typography>982, 689</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <BoxWrap>
              <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
                <Typography>435+547=982, 982-293=689</Typography>
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const GrayRoundBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-grey-100);
  min-width: 120px;
  height: 52px;
  padding: 4px 12px;
  border-radius: 80px;
  margin-top: -140px;

  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    left: -30px;
    top: 50%;
    width: 26px;
    height: 42px;
    background: url(${`"${ConnectorLine}"`}) no-repeat;
    background-size: contain;
  }

  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    right: -40px;
    top: 50%;
    width: 35px;
    height: 46px;
    background: url(${`"${ConnectorArrow}"`}) no-repeat;
    background-size: contain;
  }
`;

export default P03;
