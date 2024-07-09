import {
  Box,
  TMainHeaderInfoTypes,
  BoxWrap,
  Input,
  SvgIcon,
  Question,
  IAudioPlayerProps,
  EStyleButtonTypes,
  Typography,
  EStyleFontSizes,
  BottomSheet,
  Tag,
  ETagLine,
  IQuestionProps,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow_right from '@/assets/icon/arrow_right.svg';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C03A02a } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C03A02a);
  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Find two parts that are NOT true according to the talk and correct them.',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C03/A02/HE2-L04-C03-A02-02.mp3',
    captionSrc: '/L04/C03/A02/HE1-L04-C03-A02-02.srt',
  };

  const scriptText: string[] = [
    `The topic of the speech is the history of food technology.`,
    `It will be possible to grow crops in AI-controlled buildings in the future.`,
    `Some people are worried about meat consumption because of the climate change.`,
    `Scientists are developing meat in laboratories.`,
    `Future food will be both tasty and good for the environment.`,
  ];

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
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const isSubmitDisabled = !(
    isNotEmptyString(cardData.p03.answer1) &&
    isNotEmptyString(cardData.p03.answer2) &&
    isNotEmptyString(cardData.p03.answer3) &&
    isNotEmptyString(cardData.p03.answer4)
  );

  const handleInputChange = (subKey: number, value: string) => {
    switch (subKey) {
      case 1:
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: value } }));
        changeData('P03', 1, subKey, value);
        break;
      case 2:
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: value } }));
        changeData('P03', 1, subKey, value);
        break;
      case 3:
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer3: value } }));
        changeData('P03', 1, subKey, value);
        break;
      case 4:
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer4: value } }));
        changeData('P03', 1, subKey, value);
        break;
    }
  };

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
    } else {
      const isAnswer1 = isAnswer(cardData.p03.answer1, cardData.p03.solution1);
      const isAnswer2 = isAnswer(cardData.p03.answer2, cardData.p03.solution2);
      const isAnswer3 = isAnswer(cardData.p03.answer3, cardData.p03.solution3);
      const isAnswer4 = isAnswer(cardData.p03.answer4, cardData.p03.solution4);
      const isCorrect = isAnswer1 && isAnswer2 && isAnswer3 && isAnswer4;

      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer1,
              isAnswer: isAnswer1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p03.answer2,
              isAnswer: isAnswer2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p03.answer3,
              isAnswer: isAnswer3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p03.answer4,
              isAnswer: isAnswer4,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P03', userSubmission, isCorrect);
    }
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p03.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p03.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p03.answer4,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  const getInputStatus = (answer: string, solution: string) => {
    if (!cardData.p03.isSubmitted || cardData.p03.isCorrect) {
      return '';
    }
    return !isAnswer(answer, solution) ? InputStatus.ERROR : InputStatus.ENABLE;
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      onSubmit={handleSubmit}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitBtnColor={isSubmitDisabled ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      audioInfo={audioInfo}
      submitDisabled={isSubmitDisabled}
    >
      <Box hAlign='center'>
        <Box flexDirection='column' width='840px' padding='28px' hAlign={'center'} background='white' useRound useShadow>
          <Box padding='8px 12px'>
            <Typography weight='var(--font-weight-bold)'>Lecture Notes</Typography>
          </Box>
          <Box padding='8px'>
            {scriptText.map((item, index) => {
              return (
                <Question type={'dot'} size='small' key={index}>
                  <Typography weight='var(--font-weight-medium)' useGap={false}>
                    {item}
                  </Typography>
                </Question>
              );
            })}
          </Box>
        </Box>
      </Box>

      <BoxWrap useFull height='fit-content'>
        <Box useFull>
          <Box hAlign='center' useFull width='447px'>
            <Typography>errors</Typography>
          </Box>
        </Box>
        <Box useFull>
          <Box hAlign='center' useFull width='447px'>
            <Typography>corrections</Typography>
          </Box>
        </Box>
      </BoxWrap>

      <BoxWrap useFull height='fit-content' marginTop={'10px'}>
        <Box vAlign='center' useFull>
          <ItemWrap>
            <QuestionSpan>(1)</QuestionSpan>
            <Input
              minWidth='340px'
              width='100%'
              maxLength={33}
              placeholder='내용을 넣어 주세요.'
              ariaLabel='첫번째 error'
              inputSize='x-small'
              value={cardData.p03.answer1}
              onChange={e => handleInputChange(1, e.target.value)}
              readOnly={cardData.p03.isSubmitted}
              status={getInputStatus(cardData.p03.answer1, cardData.p03.solution1)}
            />
            <Box>
              <SvgIcon src={arrow_right} size='38px' />
            </Box>
            <QuestionSpan>(2)</QuestionSpan>
            <Input
              minWidth='340px'
              width='100%'
              maxLength={33}
              placeholder='내용을 넣어 주세요.'
              ariaLabel='첫번째 correction'
              inputSize='x-small'
              value={cardData.p03.answer2}
              onChange={e => handleInputChange(2, e.target.value)}
              readOnly={cardData.p03.isSubmitted}
              status={getInputStatus(cardData.p03.answer2, cardData.p03.solution2)}
            />
          </ItemWrap>
        </Box>
      </BoxWrap>

      <BoxWrap useFull height='fit-content' marginTop={'10px'}>
        <Box vAlign='center' useFull>
          <ItemWrap>
            <QuestionSpan>(3)</QuestionSpan>
            <Input
              minWidth='340px'
              width='100%'
              maxLength={33}
              placeholder='내용을 넣어 주세요.'
              ariaLabel='두번째 error'
              inputSize='x-small'
              value={cardData.p03.answer3}
              onChange={e => handleInputChange(3, e.target.value)}
              readOnly={cardData.p03.isSubmitted}
              status={getInputStatus(cardData.p03.answer3, cardData.p03.solution3)}
            />
            <Box>
              <SvgIcon src={arrow_right} size='38px' />
            </Box>
            <QuestionSpan>(4)</QuestionSpan>
            <Input
              minWidth='340px'
              width='100%'
              maxLength={33}
              placeholder='내용을 넣어 주세요.'
              ariaLabel='두번째 correction'
              inputSize='x-small'
              value={cardData.p03.answer4}
              onChange={e => handleInputChange(4, e.target.value)}
              readOnly={cardData.p03.isSubmitted}
              status={getInputStatus(cardData.p03.answer4, cardData.p03.solution4)}
            />
          </ItemWrap>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              {`${cardData.p03.solution1}, ${cardData.p03.solution2}, ${cardData.p03.solution3}, ${cardData.p03.solution4}`}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;

const ItemWrap = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 0px;
  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;

const QuestionSpan = styled.span`
  min-width: 38px;
  text-align: center;
`;
