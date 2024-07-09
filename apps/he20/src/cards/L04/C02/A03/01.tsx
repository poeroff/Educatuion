import {
  Box,
  TMainHeaderInfoTypes,
  List,
  Label,
  Radio,
  Tag,
  ETagLine,
  Typography,
  EStyleButtonTypes,
  IAudioPlayerProps,
  IQuestionProps,
  BottomSheet,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { L04C02A03 } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const [isShow, setShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C02A03);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'What are the speakers mainly talking about?',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: [],
        },
      ],
    },
  ];

  const data = [
    {
      text: 'how to use an application',
    },
    {
      text: 'how to take a good photo',
    },
    {
      text: 'how to learn a new language',
    },
  ];

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C02/A03/HE2-L04-C02-A03-01.mp3',
  };

  const handleShowAnswer = () => {
    setShow(!isShow);
  };

  const handleOnClick = (index: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: index } }));
    changeData('P01', 1, 1, index);
  };

  const handleSubmit = () => {
    const isCorrect = cardData.p01.answer1 === cardData.p01.solutoin1 ? true : false;

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p01.answer1,
            isAnswer: isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect } }));
    submitDataWithResult('P01', userSubmission, isCorrect);
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
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
      submitBtnColor={
        cardData.p01.isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : cardData.p01.answer1 <= 0
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={cardData.p01.isSubmitted ? handleShowAnswer : handleSubmit}
      submitDisabled={cardData.p01.answer1 === -1}
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
              label={value?.text}
              value={cardData.p01.answer1 === index}
              disabled={cardData.p01.isSubmitted}
              onClick={() => {
                handleOnClick(index);
              }}
            >
              <Box vAlign='center'>
                <Label value={index} marginRight={10} /> {value?.text}
              </Box>
            </Radio>
          )}
        />
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' show={cardData.p01.isSubmitted && isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='-60px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>1. how to use an application</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
