import { useState, useEffect } from 'react';
import {
  TMainHeaderInfoTypes,
  Typography,
  Box,
  IAudioPlayerProps,
  BottomSheet,
  IQuestionProps,
  EStyleButtonTypes,
  ETagLine,
  Tag,
  Image,
  BoxWrap,
  List,
  Label,
  Radio,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C04A02 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';

const P02 = () => {
  const PAGE_KEY = 'p02';
  const PAGE_NUM = 'P02';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C04A02);
  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setShow] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };
  const CORRECT_ANSWER = '2';
  const questionInfo: IQuestionProps = {
    text: '1. What is the purpose of the talk?',
    mark: !cardData[PAGE_KEY].isSubmitted ? 'none' : cardData[PAGE_KEY].answers[0] === CORRECT_ANSWER ? 'correct' : 'incorrect',
  };

  const data: { text: string }[] = [
    {
      text: 'to recommend necessary items for hamsters',
    },
    {
      text: 'to provide information on how to raise hamsters',
    },
    {
      text: 'to inform people where and how to adopt a hamster',
    },
  ];

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C04/A02/HE2-L01-C04-A02.mp3',
    captionSrc: '/L01/C04/A02/HE2-L01-C04-A02.srt',
  };

  const handleClickRadio = (index: string) => {
    setCardData(prev => ({ ...prev, [PAGE_KEY]: { ...prev[PAGE_KEY], answers: [index] } }));
    changeData(PAGE_NUM, 1, 1, index);
  };

  const handleSubmit = () => {
    if (cardData[PAGE_KEY].isSubmitted) {
      setShow(prev => !prev);
      return;
    }

    const isCorrect = cardData[PAGE_KEY].answers[0] === CORRECT_ANSWER;

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[PAGE_KEY].answers[0],
            isAnswer: isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    setCardData(prev => ({ ...prev, [PAGE_KEY]: { ...prev[PAGE_KEY], isSubmitted: true, isCorrect } }));
    submitDataWithResult(PAGE_NUM, userSubmission, isCorrect);
  };

  /* default 제출 값 */
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
      isCorrect: false,
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUM)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [PAGE_KEY]: {
            ...prev[PAGE_KEY],
            answers: [userSubmissionList[0].inputData[0].value || cardData[PAGE_KEY].answers[0]],
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUM, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUM);
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
      submitLabel={cardData[PAGE_KEY].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={cardData[PAGE_KEY].answers[0] === ''}
      submitBtnColor={
        cardData[PAGE_KEY].isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : cardData[PAGE_KEY].answers[0] === ''
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <BoxWrap useFull>
        <Box width='317px' hAlign='center' useFull>
          <Image
            src='/L01/C04/A02/HE2-L01-C04-A02.jpg'
            width='329px'
            alt='여학생이 교실 앞에서 반 친구들을 대상으로 햄스터 사진을 보여주며 설명을 하고 있다.'
          />
        </Box>
        <Box hAlign='center' useFull>
          <List
            data={data}
            row={({ value, index = 1 }) => {
              if (index === undefined) return null;
              return (
                <Radio
                  type='square'
                  align='vertical'
                  name='radio-question-A'
                  label={value?.text}
                  value={cardData[PAGE_KEY].answers[0] === index.toString()}
                  isError={cardData[PAGE_KEY].isSubmitted && cardData[PAGE_KEY].answers[0] !== CORRECT_ANSWER}
                  onClick={() => handleClickRadio(index.toString())}
                  readOnly={cardData[PAGE_KEY].isSubmitted}
                  ariaLabel={index + '번 보기'}
                  key={`radio${index}`}
                >
                  <Box vAlign='start'>
                    <Box marginTop='5px'>
                      <Label value={index} />
                    </Box>{' '}
                    <Typography>{value?.text}</Typography>
                  </Box>
                </Radio>
              );
            }}
          />
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' show={cardData[PAGE_KEY].isSubmitted && isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='10px'>
            <Typography usePre useGap={false}>
              {CORRECT_ANSWER}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
