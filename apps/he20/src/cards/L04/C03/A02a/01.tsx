import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  Box,
  TMainHeaderInfoTypes,
  List,
  Label,
  IAudioPlayerProps,
  Tag,
  ETagLine,
  Typography,
  EStyleButtonTypes,
  IQuestionProps,
  Checkbox,
  BottomSheet,
  BoxWrap,
  Image,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C03A02a } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C03A02a);
  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Which can NOT be answered with information from the dialogue? Choose all the answers.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: [],
        },
      ],
    },
  ];

  const data = [
    {
      text: 'Why did the girl read the article about nanobots?',
    },
    {
      text: 'How long will human beings live in the future?',
    },
    {
      text: 'How should we prepare for living longer lives?',
    },
    {
      text: 'What will nanobots do in our bodies?',
    },
    {
      text: 'What are the problems with nanobot technology?',
    },
  ];

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C03/A02/HE2-L04-C03-A02-01.mp3',
    captionSrc: '/L04/C03/A02/HE2-L04-C03-A02-01.srt',
  };

  const isCorrectAnswer = (arr: number[], correct: number[]) => {
    if (arr.length !== correct.length) return false;

    const sortedArr = [...arr].sort();
    const sortedCorrect = [...correct].sort();

    for (let i = 0; i < sortedArr.length; i++) {
      if (sortedArr[i] !== sortedCorrect[i]) {
        return false;
      }
    }
    return true;
  };

  const handleClickChange = (index: number) => {
    const newAnswer = cardData.p01.answer.includes(index) ? cardData.p01.answer.filter(i => i !== index) : [...cardData.p01.answer, index];

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: newAnswer } }));
    changeData('P01', 1, 1, newAnswer);
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = isCorrectAnswer(cardData.p01.answer, cardData.p01.correctAnswer);

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER_LIST',
              value: cardData.p01.answer,
              isAnswer: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect } }));
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
      submitBtnColor={cardData.p01.answer.length === 0 ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={cardData.p01.answer.length === 0}
    >
      <BoxWrap useFull>
        <Box height='100%'>
          <List
            gap={4}
            data={data}
            row={({ value, index = 1 }) => (
              <Checkbox
                type={'square'}
                align='vertical'
                name={'radio-question-' + index}
                label={value?.text}
                value={cardData.p01.answer.includes(index)}
                disabled={cardData.p01.isSubmitted}
                isError={cardData.p01.isSubmitted && cardData.p01.answer.includes(index) && !cardData.p01.correctAnswer.includes(index)}
                onClick={() => {
                  handleClickChange(index);
                }}
              >
                <Box vAlign='start'>
                  <Label
                    value={index}
                    cssStyle={{
                      margin: '4px 0',
                    }}
                  />
                  <Typography>{value?.text}</Typography>
                </Box>
              </Checkbox>
            )}
          />
        </Box>
        <Box width='317px' vAlign={'center'}>
          <Image
            src={'/L04/C03/A02/HE2-L04-C03-A02-01.jpg'}
            width='329px'
            height='207px'
            alt='다리가 세 개가 달린 치료용 나노 로봇이 레이저를 쏘고 있음'
          />
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' show={cardData.p01.isSubmitted && isShow} height='30%' marginTop={200}>
        <Box background='lightGray' borderRadius='12px' marginTop='10px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Box>
              <Typography>{cardData.p01.correctAnswer.join(', ')}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
