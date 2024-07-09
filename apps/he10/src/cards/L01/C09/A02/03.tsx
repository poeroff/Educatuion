import { ChangeEventHandler, useEffect, useState } from 'react';
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
  BottomSheet,
  EStyleButtonTypes,
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
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C09A02);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Analyze',
  };
  const questionInfo = {
    text: 'Read the letter and answer the questions.',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
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
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
      return;
    }
    const isCorrect = isAnswer(cardData.p03.answer, cardData.p03.solution);
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P03', userSubmission, isCorrect);
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputOnChange: ChangeEventHandler<HTMLInputElement> = event => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: event.target.value } }));
    changeData('P03', 1, 1, event.target.value);
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      useExtend
      onSubmit={handleSubmit}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p03.isSubmitted && !isNotEmptyString(cardData.p03.answer)}
      submitBtnColor={
        isNotEmptyString(cardData.p03.answer) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
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
              <Input
                width='150px'
                maxLength={15}
                value={cardData.p03.answer}
                onChange={handleInputOnChange}
                ariaLabel='답 입력란'
                readOnly={cardData.p03.isSubmitted}
                status={
                  !cardData.p03.answer
                    ? InputStatus.DEFAULT
                    : cardData.p03.isSubmitted && !cardData.p03.isCorrect
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
              />
              <Typography>subjects and plan study</Typography>
              <Typography>time accordingly.</Typography>
              <Typography>- It will help her manage time efficiently</Typography>
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
            <Typography size={EStyleFontSizes.MEDIUM}>{cardData.p03.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
