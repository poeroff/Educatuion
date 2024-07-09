import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  EStyleButtonTypes,
  ETextViewColor,
  BoxWrap,
  Scroll,
  Typography,
  EStyleFontSizes,
  List,
  Input,
  BottomSheet,
  Tag,
  ETagLine,
  IQuestionProps,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L01C12A06 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';

interface IListenAndAnswer {
  question: string[];
}

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(L01C12A06);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Grammar',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '13. 빈칸에 알맞은 말을 보기에서 골라 써 봅시다.',
    mark: getMarking(cardData.P03.isSubmitted, cardData.P03.isCorrect),
  };

  const data: IListenAndAnswer[] = [
    {
      question: ['He', 'like mint chocolate.'],
    },
  ];

  const wordArr1 = ['am', 'are', 'is'];
  const wordArr2 = ['don’t', 'doesn’t'];

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

  const submitAnswer = () => {
    if (cardData.P03.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = isAnswer(cardData.P03.answer, cardData.P03.solution);
      setCardData(prev => ({ ...prev, P03: { ...prev.P03, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.P03.answer,
              isCorrect: isCorrect,
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
          P03: {
            ...prev.P03,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.P03.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, P03: { ...prev.P03, answer: value } }));
    changeData('P03', 1, 1, value);
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
      submitLabel={!cardData.P03.isSubmitted ? '채점하기' : isShow ? '답안 닫기' : '답안 보기'}
      onSubmit={submitAnswer}
      submitDisabled={!cardData.P03.answer}
      submitBtnColor={!cardData.P03.answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <BoxWrap useFull alignItems='center'>
        <Box marginTop={10} width='50%'>
          <TextView type={ETextViewColor.DEFAULT} title={'보기'} height='211px'>
            <Box alignContent='center'>
              <Box>
                <List
                  align='horizontal'
                  gap={40}
                  data={wordArr1}
                  row={({ value, index = 1 }) => <Typography key={`samples-${index}`}>{value}</Typography>}
                />
                <List
                  gap={20}
                  align='horizontal'
                  data={wordArr2}
                  row={({ value, index = 1 }) => <Typography key={`samples-${index}`}>{value}</Typography>}
                />
              </Box>
            </Box>
          </TextView>
        </Box>

        <Box width='50%'>
          <List<IListenAndAnswer> data={data}>
            {({ value, index = 1 }) => (
              <Box>
                <Typography>{value?.question[0]}</Typography>
                <Input
                  value={cardData.P03.answer}
                  onChange={e => handleChange(e.target.value)}
                  placeholder='내용을 넣어 주세요.'
                  ariaLabel='답 입력란'
                  width='255px'
                  maxLength={30}
                  readOnly={cardData.P03.isSubmitted}
                  status={
                    !cardData.P03.isSubmitted
                      ? InputStatus.ENABLE
                      : !isAnswer(cardData.P03.answer, cardData.P03.solution)
                      ? InputStatus.ERROR
                      : InputStatus.ENABLE
                  }
                />
                <Typography>{value?.question[1]}</Typography>
              </Box>
            )}
          </List>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>{`${cardData.P03.solution}`}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
