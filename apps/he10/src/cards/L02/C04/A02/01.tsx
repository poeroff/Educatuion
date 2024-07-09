import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import {
  Image,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  List,
  Label,
  Radio,
  IAudioPlayerProps,
  IQuestionProps,
  EStyleButtonTypes,
  BottomSheet,
  Typography,
  ETagLine,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C04A02 } from './store';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C04A02);
  const [isShow, setIsShow] = useState(false);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: -1,
          isAnswer: false,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: '1. Who are the speakers?',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const imageSrc = '/L02/C04/A02/HE1-L02-C04-A02.jpg';
  const imageAlt = '라디오 부스에서 헤드폰을 쓰고 있는 남녀가 인터뷰를 하고 있다.';

  const data = [
    {
      text: 'a show host -  a novelist',
    },
    {
      text: 'a culture critic - a journalist',
    },
    {
      text: 'a reporter - a movie script writer',
    },
  ];

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C04/A02/HE1-L02-C04-A02.mp3',
    captionSrc: '/L02/C04/A02/HE1-L02-C04-A02.srt',
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
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  const handleRadioClick = (index: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: index } }));
    changeData('P01', 1, 1, index);
  };

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const isCorrect = cardData.p01.answer === cardData.p01.solution ? true : false;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p01.answer,
              isAnswer: true,
            },
          ],
          isCorrect,
        },
      ];

      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData.p01.answer === -1}
      submitBtnColor={cardData.p01.answer === -1 ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      onSubmit={submitAnswer}
    >
      <BoxWrap useFull>
        <Box width='317px' hAlign={'center'} useFull>
          <Image alt={imageAlt} src={imageSrc} width='329px' height='207px' />
        </Box>
        <Box hAlign={'center'} useFull>
          <List data={data}>
            {({ value, index = 1 }) => (
              <Radio
                key={`1${index}2`}
                type={'square'}
                align='vertical'
                name={'radio-question-A'}
                label={value?.text}
                value={cardData.p01.answer === index}
                defaultValue={cardData.p01.answer === index}
                isError={cardData.p01.isSubmitted && !cardData.p01.isCorrect}
                onClick={() => handleRadioClick(index)}
                readOnly={cardData.p01.isSubmitted}
              >
                <Box>
                  <Label key={`2${index}3`} value={index} /> {value?.text}
                </Box>
              </Radio>
            )}
          </List>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{cardData.p01.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
