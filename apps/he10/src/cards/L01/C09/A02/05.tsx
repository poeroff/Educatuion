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
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';

const P05 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C09A02);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Analyze',
  };
  const questionInfo = {
    text: 'Read the letter and answer the questions.',
    mark: getMarking(cardData.p05.isSubmitted, cardData.p05.isCorrect),
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
    if (cardData.p05.isSubmitted) {
      setShow(!isShow);
      return;
    }
    const isCorrect = isAnswer(cardData.p05.answer, cardData.p05.solution);
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true, isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p05.answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P05', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P05')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p05: {
            ...prev.p05,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p05.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P05', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputOnChange: ChangeEventHandler<HTMLInputElement> = event => {
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer: event.target.value } }));
    changeData('P05', 1, 1, event.target.value);
  };

  useEffect(() => {
    return () => {
      saveData('P05');
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
      submitLabel={cardData.p05.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p05.isSubmitted && !isNotEmptyString(cardData.p05.answer)}
      submitBtnColor={
        isNotEmptyString(cardData.p05.answer) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
    >
      <BoxWrap useFull flexDirection='column' width='980px'>
        <Box display='flex' flexDirection='row' height='290px' gap='20px'>
          <Box>
            <TextBoard color='#fbd3d1' width='370px'>
              <Box>
                <Typography size={EStyleFontSizes.MEDIUM} weight='var(--font-weight-bold)'>
                  Closing
                </Typography>
              </Box>
              <Box>
                <Scroll height='220px'>
                  <Typography>I hope these tips will be helpful when you study. Regards, Dr. Wise</Typography>
                </Scroll>
              </Box>
            </TextBoard>
          </Box>
          <Box vAlign='center' flexDirection='column' height='290px'>
            <Typography weight='medium' align='center'>
              Closing
            </Typography>
            <Question size='small'>
              <Typography weight='medium' useGap={false}>
                3. What is Dr. Wise's closing comment?
              </Typography>
            </Question>
            <Box vAlign='center' flexWrap='wrap'>
              <SvgIcon src={RightArrowIcon} type={ESvgType.IMG} alt='' />
              <Typography>Dr. Wise hopes that the tips will help her</Typography>
              <Input
                width='243px'
                maxLength={15}
                value={cardData.p05.answer}
                onChange={handleInputOnChange}
                placeholder='내용을 넣어 주세요.'
                ariaLabel='답 입력란'
                readOnly={cardData.p05.isSubmitted}
                status={
                  !cardData.p05.answer
                    ? InputStatus.DEFAULT
                    : cardData.p05.isSubmitted && !cardData.p05.isCorrect
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
              />
            </Box>
          </Box>
        </Box>
        <Box height='70px' marginTop={10}>
          <TextView title='보기' height=''>
            <List align='horizontal' data={wordArr} row={({ value }) => <Typography>{value}</Typography>} />
          </TextView>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box marginTop='10px' height='48px' padding={8}>
            <Typography size={EStyleFontSizes.MEDIUM}>{cardData.p05.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P05;
