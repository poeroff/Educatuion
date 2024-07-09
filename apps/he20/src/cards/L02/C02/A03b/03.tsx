import { useEffect, useState } from 'react';
import {
  Box,
  Label,
  List,
  TMainHeaderInfoTypes,
  Typography,
  Radio,
  BoxWrap,
  IQuestionProps,
  IAudioPlayerProps,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { L02C02A03b } from './store';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);

  const [cardData, setCardData] = useRecoilState(L02C02A03b);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'What is the purpose of the talk? Choose the correct one for the blank.',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C02/A03/HE2-L02-C02-A03-02.mp3',
    captionSrc: '/L02/C02/A03/HE2-L02-C02-A03-02.srt',
  };

  const data = [{ text: 'apply for' }, { text: 'cancel' }, { text: 'announce' }];
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p03.answer === cardData.p03.solution;
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p03.answer,
              isAnswer: true,
              isCorrect,
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: index } }));
    changeData('P03', 1, 1, index);
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
      audioInfo={audioInfo}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData.p03.answer === 0}
      onSubmit={submitAnswer}
      submitBtnColor={cardData.p03.answer === 0 ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <Box useFull hAlign='center' padding='50px 0px' height='100%'>
        <Box useFull hAlign='center' flexDirection='column' gap='20px' textAlign='center'>
          <Box width='910px' vAlign='center' display='inline' alignContent='center' padding='20px' height='30%' background='white' useRound>
            to &nbsp; <Typography type='blank' width='180px' title='빈칸' boxColor='var(--color-black)' />
            &nbsp; the flea market for next month
          </Box>

          <BoxWrap useFull justifyContent='center'>
            <Box vAlign='center'>
              <List
                gap={24}
                data={data}
                align={'horizontal'}
                row={({ value, index = 1 }) => (
                  <Radio
                    type={'square'}
                    name={`radio-question-A`}
                    label={value?.text}
                    ariaLabel={index + '번 보기'}
                    onClick={() => handleChange(index)}
                    value={index === cardData.p03.answer}
                    readOnly={cardData.p03.isSubmitted}
                    isError={cardData.p03.isSubmitted && cardData.p03.answer !== cardData.p03.solution}
                  >
                    <Box padding={'6px 0'}>
                      <Label value={index} /> <Typography>{value?.text}</Typography>
                    </Box>
                  </Radio>
                )}
              />
            </Box>
          </BoxWrap>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{cardData.p03.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
