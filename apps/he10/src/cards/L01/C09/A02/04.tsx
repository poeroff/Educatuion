import { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  Input,
  Typography,
  List,
  Scroll,
  Question,
  BoxWrap,
  EStyleButtonTypes,
  BottomSheet,
  EStyleFontSizes,
  ETagLine,
  Tag,
  ESvgType,
  SvgIcon,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container, TextBoard } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L01C09A02 } from './store';
import { checkAnswers, getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, inputDatasType, userSubmissionType } from '@maidt-cntn/api';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';

const P04 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C09A02);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Analyze',
  };
  const questionInfo = {
    text: 'Read the letter and answer the questions.',
    mark: getMarking(cardData.p04.isSubmitted, cardData.p04.isCorrect),
  };
  const wordArr = ['memory', 'mind map', 'prioritize', 'study', 'subjects'];

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

  const handleSubmit = () => {
    if (cardData.p04.isSubmitted) {
      setShow(!isShow);
      return;
    }
    const results = checkAnswers(cardData.p04.answer, cardData.p04.solution);
    const isCorrect = results.every(result => result);
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect, answer: cardData.p04.answer } }));

    const submissionData: inputDatasType[] = cardData.p04.answer.map((answer, index) => {
      return {
        subKey: index + 1,
        type: 'TEXT',
        value: answer,
        isAnswer: true,
        isCorrect: results[index],
      };
    });
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: submissionData,
        isCorrect,
      },
    ];
    submitDataWithResult('P04', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer: userSubmissionList[0].inputData.map((item: inputDatasType) => item.value) || cardData.p04.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            results: userSubmissionList[0].inputData.map((item: inputDatasType) => item.isCorrect),
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputOnChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const answer = cardData.p04.answer.map((value, idx) => (idx === index ? event.target.value : value));
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer } }));
    changeData('P04', 1, index + 1, event.target.value);
  };

  useEffect(() => {
    return () => {
      saveData('P04');
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      useExtend
      onSubmit={handleSubmit}
      submitLabel={cardData.p04.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p04.isSubmitted && !cardData.p04.answer.every(answer => isNotEmptyString(answer))}
      submitBtnColor={
        cardData.p04.answer.every(answer => isNotEmptyString(answer))
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
    >
      <BoxWrap useFull flexDirection='column' width='980px'>
        <Box display='flex' flexDirection='row' height='290px' gap='20px'>
          <Box>
            <TextBoard color='#c2c6e5' width='370px'>
              <Box>
                <Typography size={EStyleFontSizes.MEDIUM} weight='var(--font-weight-bold)'>
                  Advice
                </Typography>
              </Box>
              <Box>
                <Scroll height='220px'>
                  <Typography>
                    First, prioritize your subjects and plan your study time accordingly. This will help you manage your time efficiently in all
                    subjects. Additionally, organize key concepts for each subject in a mind map. This can help you see the connection between
                    concepts, enhancing your memory and understanding.
                  </Typography>
                </Scroll>
              </Box>
            </TextBoard>
          </Box>
          <Box vAlign='center' flexDirection='column' height='290px'>
            <Typography weight='medium' align='center'>
              Advice
            </Typography>
            <Question size='small'>
              <Typography weight='medium' useGap={false}>
                2. What is Dr. Wise's advice for Yuha, and how will it help her?
              </Typography>
            </Question>
            <Box vAlign='center' flexWrap='wrap'>
              <SvgIcon src={RightArrowIcon} type={ESvgType.IMG} alt='' />
              <Typography>Create a</Typography>
              <Input
                width='243px'
                maxLength={15}
                value={cardData.p04.answer[0]}
                onChange={event => handleInputOnChange(event, 0)}
                ariaLabel='답 입력란'
                placeholder='내용을 넣어 주세요.'
                readOnly={cardData.p04.isSubmitted}
                status={
                  !cardData.p04.answer[0]
                    ? InputStatus.DEFAULT
                    : cardData.p04.isSubmitted && !cardData.p04.results[0]
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
              />
              <Typography>- It can help enhance her </Typography>
              <Input
                width='243px'
                maxLength={15}
                value={cardData.p04.answer[1]}
                onChange={event => handleInputOnChange(event, 1)}
                placeholder='내용을 넣어 주세요.'
                ariaLabel='답 입력란'
                readOnly={cardData.p04.isSubmitted}
                status={
                  !cardData.p04.answer[1]
                    ? InputStatus.DEFAULT
                    : cardData.p04.isSubmitted && !cardData.p04.results[1]
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
              />
              <Typography>and understanding</Typography>
            </Box>
          </Box>
        </Box>
        <Box height='70px' marginTop={10}>
          <TextView title='보기'>
            <List align='horizontal' data={wordArr} row={({ value }) => <Typography>{value}</Typography>} />
          </TextView>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box marginTop='10px' height='48px' padding={8}>
            <Typography size={EStyleFontSizes.MEDIUM}>{cardData.p04.solution.map((solution, index) => `(${index + 1}) ${solution}\n`)}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;
