import {
  BottomSheet,
  Box,
  BoxWrap,
  List,
  EStyleButtonTypes,
  Typography,
  ETagLine,
  IAudioPlayerProps,
  Image,
  IQuestionProps,
  Label,
  Radio,
  Tag,
  TMainHeaderInfoTypes,
  EStyleShadowedButtonTypes,
} from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { L07C02A03 } from './store';
import { useEffect, useState } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container, ShadowedButton } from '@maidt-cntn/ui/en';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L07C02A03);
  const { userId } = useRecoilValue(studentAtom);
  const pageNumber = 'P01';
  const pageKey = 'p01';

  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meListenAndCheck',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L07/C02/A03/ME1-L07-C02-A03-P01.mp3',
    captionSrc: '/L07/C02/A03/ME1-L07-C02-A03-P01.srt',
  };

  const data = [
    {
      text: 'a',
    },
    {
      text: 'b',
    },
    {
      text: 'c',
    },
  ];

  const questionText = 'Which picture are the speakers looking at?';

  const questionInfo: IQuestionProps = {
    text: questionText,
    mark: getMarking(cardData[pageKey].isSubmitted, cardData[pageKey].isCorrect),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const onSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
      return;
    }
    const isCorrect = cardData[pageKey].answer === cardData[pageKey].solution;
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageKey].answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNumber, userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleRadioChange = (index: number) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: index } }));
    changeData(pageNumber, 1, 1, index);
  };

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={
        cardData[pageKey].isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : cardData[pageKey].answer === 0
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={!cardData[pageKey].isSubmitted && cardData[pageKey].answer === 0}
      onSubmit={onSubmit}
      audioInfo={audioInfo}
    >
      <BoxWrap useFull>
        <Box width='600px' hAlign={'center'} useFull>
          <Image
            src={'/L07/C02/A03/ME1-L07-C02-A03-P01.jpg'}
            width='600px'
            alt='스마트폰과 세 장의 사진 사진 a. 폭포가 흐르는 절벽 사진 b. 놀이동산의 놀이기구 사진 c. 고층의 빌딩들'
          />
        </Box>
        <Box hAlign={'center'} marginLeft={100}>
          <List gap={24} data={data}>
            {({ value, index = 1 }) => (
              <Radio
                type={'default'}
                align='vertical'
                name={'radio-question-A'}
                label={value?.text}
                value={cardData[pageKey].answer === index}
                readOnly={cardData[pageKey].isSubmitted}
                isError={cardData[pageKey].isSubmitted && cardData[pageKey].solution !== index}
                onClick={() => handleRadioChange(index)}
              >
                <ShadowedButton
                  key={index}
                  type='img'
                  state={
                    index === cardData[pageKey].answer
                      ? cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect
                        ? EStyleShadowedButtonTypes.WARNING
                        : EStyleShadowedButtonTypes.PRIMARY
                      : EStyleShadowedButtonTypes.DEFAULT
                  }
                >
                  <Box padding={'6px 0'} whiteSpace='nowrap'>
                    <Label value={index} />
                    <Typography>{value?.text}</Typography>
                  </Box>
                </ShadowedButton>
              </Radio>
            )}
          </List>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='container' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData[pageKey].solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
