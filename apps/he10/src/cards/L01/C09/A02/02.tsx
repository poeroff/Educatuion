import { ChangeEventHandler, useEffect, useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  Input,
  Typography,
  List,
  Question,
  BoxWrap,
  EStyleButtonTypes,
  BottomSheet,
  EStyleFontSizes,
  ETagLine,
  Tag,
  ESvgType,
  SvgIcon,
  Scroll,
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

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C09A02);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Analyze',
  };
  const questionInfo = {
    text: 'Read the letter and answer the questions.',
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
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
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
      return;
    }
    const isCorrect = isAnswer(cardData.p02.answer, cardData.p02.solution);
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P02', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputOnChange: ChangeEventHandler<HTMLInputElement> = event => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: event.target.value } }));
    changeData('P02', 1, 1, event.target.value);
  };

  useEffect(() => {
    return () => {
      saveData('P02');
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
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p02.isSubmitted && !isNotEmptyString(cardData.p02.answer)}
      submitBtnColor={
        isNotEmptyString(cardData.p02.answer) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
    >
      <BoxWrap useFull flexDirection='column' width='980px'>
        <Box display='flex' flexDirection='row' height='290px' gap='20px' useFull>
          <Box>
            <TextBoard color='#bce4e6' width='370px'>
              <Box>
                <Typography size={EStyleFontSizes.MEDIUM} weight='var(--font-weight-bold)'>
                  Greeting
                </Typography>
              </Box>
              <Box>
                <Scroll height='220px'>
                  <Typography>
                    Dear Yuha, I'm sorry to hear that you're having a tough time studying so many subjects at your new school. Here are some tips that
                    can assist you in studying more effectively.
                  </Typography>
                </Scroll>
              </Box>
            </TextBoard>
          </Box>
          <Box vAlign='center' flexDirection='column' height='290px'>
            <Typography weight='medium' align='center'>
              Greeting
            </Typography>
            <Question size='small'>
              <Typography weight='medium' useGap={false}>
                1. Who is this advice letter addressed to, and what is the problem?
              </Typography>
            </Question>
            <Box vAlign='center' flexWrap='wrap'>
              <SvgIcon src={RightArrowIcon} type={ESvgType.IMG} alt='' />
              <Typography>Yuha, Who is worried about having too</Typography>
              <Typography>many</Typography>
              <Input
                width='150px'
                maxLength={15}
                value={cardData.p02.answer}
                onChange={handleInputOnChange}
                ariaLabel='답 입력란'
                readOnly={cardData.p02.isSubmitted}
                status={
                  !cardData.p02.answer
                    ? InputStatus.DEFAULT
                    : cardData.p02.isSubmitted && !cardData.p02.isCorrect
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
              />
              <Typography>to study.</Typography>
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
            <Typography size={EStyleFontSizes.MEDIUM}>{cardData.p02.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
