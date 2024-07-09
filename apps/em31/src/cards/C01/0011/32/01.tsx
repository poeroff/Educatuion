import { useEffect, useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import { BottomSheet, Box, BoxWrap, EStyleButtonTypes, ETagLine, IQuestionProps, Input, SvgIcon, Tag, Typography } from '@maidt-cntn/ui';
import styled from '@emotion/styled';
import ConnectorLine from '@/assets/example/connector_line.svg';
import ConnectorArrow from '@/assets/example/connector_arrow.svg';
import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilValue, useRecoilState } from 'recoil';
import { C01_0011_32 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { checkAnswers, isAnswer } from '@maidt-cntn/util/CommonUtil';
const P01 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01_0011_32);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        빈칸에 알맞은 수를 써넣으세요.
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isAllCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const isInputAnswerCorrect = (answerList: string[], solutionList: string[]) => {
    const incorrectPattern = /\d\s+\d/;
    return answerList.map((answer, index) => {
      if (incorrectPattern.test(answer)) {
        return false;
      }
      return isAnswer(answer, solutionList[index]);
    });
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
      return;
    }
    const isCorrect = isInputAnswerCorrect(cardData.p01.answer, cardData.p01.solution);
    const isAllCorrect = isCorrect.every(answer => answer);
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect, isAllCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer[0],
            isCorrect: isCorrect[0],
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer[1],
            isCorrect: isCorrect[1],
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];
    submitDataWithResult('P01', userSubmission, isAllCorrect);
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
        },
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];
  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: [userSubmissionList[0].inputData[0]?.value, userSubmissionList[0].inputData[1]?.value] || cardData.p01.answer,
            isCorrect: [userSubmissionList[0].inputData[0]?.isCorrect, userSubmissionList[0].inputData[1]?.isCorrect] || cardData.p01.isCorrect,
            isSubmitted,
            isAllCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    const inputAnswer = [...cardData.p01.answer];
    inputAnswer[subKey - 1] = value;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: inputAnswer } }));
    changeData('P01', 1, subKey, value);
  };

  const isInputAnswer = () => {
    const answerList = [...cardData.p01.answer];
    const hasEmptyValue = answerList.some(element => element === '');

    return !hasEmptyValue;
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
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={!isInputAnswer()}
      submitBtnColor={isInputAnswer() ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      vAlign='flex-start'
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' hAlign='center' useRound width='636px' height='172px'>
          <BoxWrap display='flex' justifyContent='center' boxGap={0} marginTop='65px'>
            <Box width='130px' height='52px' hAlign='center' borderRadius='8px' background='var(--color-yellow-300)'>
              273
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>+ 654</GrayRoundBox>
            </Box>
            <Box>
              <Input
                textAlign='start'
                width='130px'
                ariaLabel='답 입력란'
                value={cardData.p01.answer[0]}
                onChange={e => handleChange(1, e.target.value)}
                readOnly={cardData.p01.isSubmitted}
                status={!cardData.p01.answer[0] ? 'default' : cardData.p01.isSubmitted && !cardData.p01.isCorrect[0] ? 'error' : 'enable'}
              />
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>- 548</GrayRoundBox>
            </Box>
            <Box>
              <Input
                textAlign='start'
                width='130px'
                ariaLabel='답 입력란'
                value={cardData.p01.answer[1]}
                onChange={e => handleChange(2, e.target.value)}
                readOnly={cardData.p01.isSubmitted}
                status={!cardData.p01.answer[1] ? 'default' : cardData.p01.isSubmitted && !cardData.p01.isCorrect[1] ? 'error' : 'enable'}
              />
            </Box>
          </BoxWrap>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow} closeOption={{ useYn: true, onClose: () => setIsShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>927,379</Typography>
          </Box>
          <Box>
            <br />
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography>273+654=927</Typography>
            <Typography>,</Typography>
            <Typography>927-548=379</Typography>
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

export default P01;
