import { ChangeEventHandler, useState, useEffect } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  Input,
  Typography,
  Image,
  EStyleButtonTypes,
  IQuestionProps,
  BoxWrap,
  BottomSheet,
  EStyleFontSizes,
  ETagLine,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getInputStatus, getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L01C08A05 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P05 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C08A05);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Practice',
  };
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Fill in the blanks with the correct forms of the given words.',
    mark: getMarking(cardData.p05.isSubmitted, cardData.p05.isCorrect),
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
      ],
    },
  ];

  const handleOnSubmit = () => {
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
      onSubmit={handleOnSubmit}
      submitLabel={cardData.p05.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!isNotEmptyString(cardData.p05.answer)}
      submitBtnColor={
        isNotEmptyString(cardData.p05.answer) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
    >
      <BoxWrap flexDirection='column' useFull paddingTop='40px'>
        <Box width='920px'>
          <TextView title='보기' height='100px'>
            <Box hAlign='center' vAlign='center' paddingTop='10px'>
              <Image src='/L01/C08/A05/HE1-L01-C08-A05.jpg' width='636px' alt='' ariaDescribedby='example_desc' />
              <Box type='hidden' id='example_desc'>
                (When) Paired with new partners, the chimpanzees usually failed to get the food. 빨간 색자 (When) Paired가 파란 색자 the chimpanzees와
                선으로 연결되어 있다.
              </Box>
            </Box>
          </TextView>
        </Box>
        <Box marginTop='50px' flexDirection='row'>
          <Box>
            <Typography>5.</Typography>
            <Input
              textAlign='start'
              ariaLabel='답 입력란'
              value={cardData.p05.answer}
              onChange={handleInputOnChange}
              maxLength={12}
              width='120px'
              inputSize='x-small'
              readOnly={cardData.p05.isSubmitted}
              status={getInputStatus(cardData.p05.isSubmitted ? cardData.p05.isCorrect : true, cardData.p05.answer)}
            />
            <Typography>about 1,900 meters above sea level, the peak of Mt.Halla</Typography>
            <Typography>offers a scenic view of Jeju.</Typography>
          </Box>
          <Box marginTop='40px' backgroundColor='var(--color-blue-50)' width='920px' height='48px' vAlign='center' useRound>
            <Typography color='var(--color-blue-800)'>제시어: locate</Typography>
          </Box>
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
