import {
  Box,
  TMainHeaderInfoTypes,
  List,
  Label,
  Radio,
  IAudioPlayerProps,
  IQuestionProps,
  EStyleButtonTypes,
  Tag,
  Typography,
  ETagLine,
  BottomSheet,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState, useEffect } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C02A03a } from './store';
import usePageData from '@/hooks/usePageData';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C02A03a);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'What is NOT true according to the dialogue?',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const data = [
    {
      text: (
        <>
          The girl is thinking about watching &nbsp;
          <Typography fontStyle={'italic'} useGap={false}>
            Man in Dark
          </Typography>
          &nbsp; again because she enjoyed it.
        </>
      ),
    },
    {
      text: <>The boy was not satisfied with George Nicholson’s comedy acting in the latest movie.</>,
    },
    {
      text: <>The girl recommends another comedy movie starring George Nicholson to the boy.</>,
    },
  ];

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C02/A03/HE2-L03-C02-A03-01.mp3',
    captionSrc: '/L03/C02/A03/HE2-L03-C02-A03-01.srt',
  };

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
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p01.answer === cardData.p01.solution;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p01.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: index } }));
    changeData('P01', 1, 1, index);
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitBtnColor={cardData.p01.answer === 0 ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={submitAnswer}
      submitDisabled={cardData.p01.answer === 0}
    >
      <Box vAlign='center' useFull>
        <List
          gap={24}
          data={data}
          row={({ value, index = 1 }) => (
            <Radio
              type={'square'}
              align='vertical'
              name={'radio-question-A'}
              ariaLabel={index + '번 보기'}
              value={index === cardData.p01.answer}
              onClick={() => handleChange(index)}
              readOnly={cardData.p01.isSubmitted}
              isError={cardData.p01.isSubmitted && cardData.p01.answer !== cardData.p01.solution}
            >
              <Box display='flex'>
                <Box paddingTop='4px'>
                  <Label value={index} />
                </Box>
                <Typography>{value?.text}</Typography>
              </Box>
            </Radio>
          )}
        />
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>{cardData.p01.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
