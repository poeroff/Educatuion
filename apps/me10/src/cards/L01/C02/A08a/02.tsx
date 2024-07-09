import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Input,
  InputStatus,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C02A08a } from './store';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C02A08a);
  const [isShow, setIsShow] = useState<boolean>(false);

  const bottomAnswer = (
    <>
      <Box marginTop='12px'>(1) {cardData.p02.solution1[0]}</Box>
      <Box marginTop='12px' marginLeft='40px'>
        또는 {cardData.p02.solution1[1]}
      </Box>
      <Box marginTop='12px'>(2) {cardData.p02.solution2[0]}</Box>
      <Box marginTop='12px' marginLeft='40px'>
        또는 {cardData.p02.solution2[1]}
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

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C02/A08/ME1-L01-C02-A08-P02.mp3',
    captionSrc: '/L01/C02/A08/ME1-L01-C02-A08-P02.srt',
  };

  const data = [
    {
      text: `(1) What kind of movies does Dylan like?`,
    },
    {
      text: `(2) What kind of movies does Yuna like?`,
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen More',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <>
        <Box marginRight='10px'>
          <Typography useGap={false} fontSize={'var(--font-size-32)'} lineHeight='50px' weight={'var(--font-weight-extraBold)'}>
            2. Listen Again and Write
          </Typography>
          <Typography>Answer the questions.</Typography>
        </Box>
      </>
    ),
    size: 'medium',
    markSize: 'middle',
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, [saveData]);

  const handleInputChange = (index: number, value: string) => {
    if (index === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (index === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    }
    changeData('P02', 1, index, value);
  };

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p02.answer1, cardData.p02.solution1);
      const isCorrect2 = isAnswer(cardData.p02.answer2, cardData.p02.solution2);
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p02.answer1 && cardData.p02.answer2)}
      submitBtnColor={
        !(cardData.p02.answer1 && cardData.p02.answer2) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
    >
      <Box>
        <Typography>{data[0].text}</Typography>
        <Box marginTop={'8px'} paddingLeft={'40px'}>
          <Input
            width='100%'
            value={cardData.p02.answer1}
            status={
              isNotEmptyString(cardData.p02.answer1)
                ? cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer1, cardData.p02.solution1)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            maxLength={100}
            placeholder='내용을 넣어 주세요.'
            ariaLabel={`답란1`}
            readOnly={cardData.p02.isSubmitted}
            onChange={e => handleInputChange(1, e.target.value)}
          />
        </Box>
      </Box>
      <Box>
        <Typography>{data[1].text}</Typography>
        <Box marginTop={'8px'} paddingLeft={'40px'}>
          <Input
            width='100%'
            value={cardData.p02.answer2}
            status={
              isNotEmptyString(cardData.p02.answer2)
                ? cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer2, cardData.p02.solution2)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            maxLength={100}
            placeholder='내용을 넣어 주세요.'
            ariaLabel={`답란2`}
            readOnly={cardData.p02.isSubmitted}
            onChange={e => handleInputChange(2, e.target.value)}
          />
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Box>
              <Tag type={ETagLine.GREEN} label={'답안'} />
            </Box>
            {bottomAnswer}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
