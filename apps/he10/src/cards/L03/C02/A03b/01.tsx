import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EImageType,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Image,
  Label,
  List,
  PinchZoom,
  Radio,
  TMainHeaderInfoTypes,
  TMarkType,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C02A03b } from './store';

interface IRadioProps {
  imageSrc: string;
  alt: string;
  value: number;
}

const page = 'P01';

const P01 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C02A03b);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userAnswer, isSubmitted, isCorrect } = cardData.p01;
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const isDisabled = useMemo(() => !userAnswer || userAnswer === 0, [userAnswer]);
  const submitLabel = useMemo(() => (isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'), [isSubmitted, isAnswerShow]);
  const mark: TMarkType = useMemo(() => getMarking(isSubmitted, isCorrect), [isCorrect, isSubmitted]);

  const ANSWER_IDX = 1;
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Which form of ice will melt slowest unser the same conditions?',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C02/A03/HE1-L03-C02-A03-01.mp3',
    captionSrc: '/L03/C02/A03/HE1-L03-C02-A03-01.srt',
  };

  const data: IRadioProps[] = [
    {
      imageSrc: '/L03/C02/A03/HE1-L03-C02-A03-01-1.jpg',
      alt: '둥그런 구 형태의 얼음',
      value: 1,
    },
    {
      imageSrc: '/L03/C02/A03/HE1-L03-C02-A03-01-2.jpg',
      alt: '각진 육면체 형태의 얼음',
      value: 2,
    },
    {
      imageSrc: '/L03/C02/A03/HE1-L03-C02-A03-01-3.jpg',
      alt: '윗면과 아랫면이 하트모양인, 기둥 형태의 얼음',
      value: 3,
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(p => p.page === page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            userAnswer: userSubmissionList[0].inputData[0]?.value || userAnswer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      setIsAnswerShow(!isAnswerShow);
    } else {
      const isCorrect = userAnswer === ANSWER_IDX;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: userAnswer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(page, userSubmission, isCorrect);
    }
  };

  const handleRadioClick = (index: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, userAnswer: index } }));
    changeData(page, 1, 1, index);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(page);
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitDisabled={isDisabled}
      submitLabel={submitLabel}
      submitBtnColor={isDisabled ? EStyleButtonTypes.SECONDARY : isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      onSubmit={handleSubmit}
    >
      <BoxWrap useFull>
        <Box hAlign='center'>
          <List<IRadioProps> data={data} align='horizontal'>
            {({ value, index = 1 }) => (
              <Radio type={'square'} align='horizontal' name={`radio-question`} value={index === userAnswer} onClick={() => handleRadioClick(index)}>
                <Label value={value?.value} />
                <Box marginTop='8px'>
                  <PinchZoom>
                    <Image size='250px' src={value?.imageSrc || ''} alt={value?.alt || ''} type={EImageType.IMG} />
                  </PinchZoom>
                </Box>
              </Radio>
            )}
          </List>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box display='flex' flexDirection='column' marginTop='12px'>
            <Typography>{ANSWER_IDX}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
