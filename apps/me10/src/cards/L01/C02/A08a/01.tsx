import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import {
  Box,
  IAudioPlayerProps,
  TMainHeaderInfoTypes,
  Image,
  Typography,
  Input,
  InputStatus,
  BottomSheet,
  Tag,
  ETagLine,
  IQuestionProps,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C02A08a } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C02A08a);
  const [isShow, setIsShow] = useState<boolean>(false);

  const imageSrc = '/L01/C02/A08a/ME1-L01-C02-A08a-P01.jpg';
  const imageAlt = '교복을 입은 여학생이 인사하고 있는 모습';

  const bottomAnswer = (
    <>
      <Box key={1} marginTop='12px'>
        {cardData.p01.solution1}, {cardData.p01.solution2}
      </Box>
    </>
  );

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen More',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C02/A08/ME1-L01-C02-A08-P01.mp3',
    captionSrc: '/L01/C02/A08/ME1-L01-C02-A08-P01.srt',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <>
        <Box marginRight='10px'>
          <Typography useGap={false} fontSize={'var(--font-size-32)'} lineHeight='50px' weight={'var(--font-weight-extraBold)'}>
            1. Listen and Write
          </Typography>
          <Typography>Listen and fill in the blanks.</Typography>
        </Box>
      </>
    ),
    size: 'medium',
    markSize: 'middle',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
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
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, [saveData]);

  const checkAnswer = (answer: string, solution: string) => {
    if (isNotEmptyString(answer)) {
      return isAnswer(answer, solution);
    } else {
      return false;
    }
  };

  const handleInputChange = (index: number, value: string) => {
    if (index === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (index === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    }
    changeData('P01', 1, index, value);
  };

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p01.answer1, cardData.p01.solution1);
      const isCorrect2 = isAnswer(cardData.p01.answer2, cardData.p01.solution2);
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const contentArea = (
    <Box>
      <Image src={imageSrc} alt={imageAlt} width='100%' />
      <Box position='absolute' right={100} bottom={160}>
        <Box paddingBottom={10}>
          <Typography>Yuna is from class </Typography>
          <Input
            width='250px'
            maxLength={20}
            placeholder='내용을 넣어 주세요.'
            ariaLabel='답란1'
            status={
              isNotEmptyString(cardData.p01.answer1)
                ? cardData.p01.isSubmitted && !checkAnswer(cardData.p01.answer1, cardData.p01.solution1)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            value={cardData.p01.answer1}
            readOnly={cardData.p01.isSubmitted}
            onChange={e => handleInputChange(1, e.target.value)}
          />
          <Typography>.</Typography>
        </Box>
        <Box>
          <Typography>Her </Typography>
          <Input
            width='250px'
            maxLength={20}
            placeholder='내용을 넣어 주세요.'
            ariaLabel='답란2'
            status={
              isNotEmptyString(cardData.p01.answer2)
                ? cardData.p01.isSubmitted && !checkAnswer(cardData.p01.answer2, cardData.p01.solution2)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            value={cardData.p01.answer2}
            readOnly={cardData.p01.isSubmitted}
            onChange={e => handleInputChange(2, e.target.value)}
          />
          <Typography>
            is<Typography fontStyle='italic'>Wonder Woman.</Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      audioInfo={audioInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p01.answer1 && cardData.p01.answer2)}
      submitBtnColor={
        !(cardData.p01.answer1 && cardData.p01.answer2) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
    >
      {contentArea}
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          {bottomAnswer}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
