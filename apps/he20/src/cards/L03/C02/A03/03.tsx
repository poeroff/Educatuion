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
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { L03C02A03 } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const [isShow, setShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C02A03);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Choose all the activities that the man did according to the dialogue.',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C02/A03/HE2-L03-C02-A03-02.mp3',
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
      text: 'appreciate traditional Korean coloring on buildings',
    },
    {
      text: 'draw a Korean painting using five colors',
    },
    {
      text: 'see the guard-changing ceremony',
    },
    {
      text: 'wear traditional Korean clothes',
    },
  ];

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

  const handleOnClick = (index: number) => {
    const newAnswer = cardData.p03.answer1.includes(index) ? cardData.p03.answer1.filter(i => i !== index) : [...cardData.p03.answer1, index];
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: newAnswer } }));
    changeData('P03', 1, 1, newAnswer);
  };

  const handleShowAnswer = () => {
    setShow(!isShow);
  };

  const handleSubmit = () => {
    const isCorrect = isCorrectAnswer(cardData.p03.answer1, cardData.p03.solutoin1);

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER_LIST',
            value: cardData.p03.answer1,
            isAnswer: isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect } }));
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer1,
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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitBtnColor={cardData.p03.isSubmitted ? (isShow ? EStyleButtonTypes.DEFAULT : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.PRIMARY}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={cardData.p03.isSubmitted ? handleShowAnswer : handleSubmit}
      submitDisabled={cardData.p03.answer1.length < 1}
    >
      <Box vAlign='center' useFull>
        <List
          gap={20}
          data={data}
          row={({ value, index = 1 }) => (
            <Checkbox
              type={'square'}
              align='vertical'
              name={'radio-question-' + index}
              label={value?.text}
              value={cardData.p03.answer1.includes(index)}
              disabled={cardData.p03.isSubmitted}
              isError={cardData.p03.isSubmitted && cardData.p03.answer1.includes(index) && !cardData.p03.solutoin1.includes(index)}
              onClick={() => {
                handleOnClick(index);
              }}
            >
              <Box vAlign='center'>
                <Label value={index} marginRight={10} /> {value?.text}
              </Box>
            </Checkbox>
          )}
        />
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' show={cardData.p03.isSubmitted && isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='10px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Box>
              <Typography>1. appreciate traditional Korean coloring on buildings</Typography>
            </Box>
            <Box>
              <Typography>3. see the guard-changing ceremony</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
