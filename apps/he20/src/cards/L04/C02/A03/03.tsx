import {
  Box,
  TMainHeaderInfoTypes,
  List,
  Label,
  Radio,
  IAudioPlayerProps,
  IQuestionProps,
  Typography,
  EStyleButtonTypes,
  Tag,
  ETagLine,
  BottomSheet,
} from '@maidt-cntn/ui';
import styled from '@emotion/styled';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { L04C02A03 } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const vitePath = import.meta.env.VITE_CDN_PATH;
const backgroundImg = `${vitePath}/L04/C02/A03/HE2-L04-C02-A03-02.jpg`;

const P03 = () => {
  const [isShow, setShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C02A03);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Choose the feature that is NOT found in the woman’s sunglasses.',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C02/A03/HE2-L04-C02-A03-02.mp3',
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
      text: 'Built-in Bluetooth Headphones',
    },
    {
      text: 'Microphones for Making Phone Calls',
    },
    {
      text: 'Auto-Fitting Arms',
    },
    {
      text: '3D Photo Camera',
    },
  ];

  const handleShowAnswer = () => {
    setShow(!isShow);
  };

  const handleOnClick = (index: number) => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: index } }));
    changeData('P03', 1, 1, index);
  };

  const handleSubmit = () => {
    const isCorrect = cardData.p03.answer1 === cardData.p03.solutoin1 ? true : false;

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
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
      submitBtnColor={
        cardData.p03.isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : cardData.p03.answer1 <= 0
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={cardData.p03.isSubmitted ? handleShowAnswer : handleSubmit}
      submitDisabled={cardData.p03.answer1 <= 0}
    >
      <BackgroundWrap>
        <Box
          height='350px'
          display='flex'
          flexDirection='column'
          useFull
          alt='스마트 안경을 착용하고 있는 여자의 모습, 그 옆으로 스마트 안경을 통해 도표, 얼굴, 지도 등이 보인다.'
        >
          <Box margin={'8px 0 5px 50px'} alignItems='center' display='flex' flexDirection='column'>
            <Typography color='var(--color-blue-800)' weight='850'>
              Smart Meets Style:
            </Typography>
            <Typography color='var(--color-blue-900)' weight='850'>
              More than Just Sunglasses
            </Typography>
          </Box>
          <Box alignSelf='flex-end' marginRight='13px'>
            <List
              gap={8}
              data={data}
              row={({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={cardData.p03.answer1 === index}
                  disabled={cardData.p03.isSubmitted}
                  onClick={() => {
                    handleOnClick(index);
                  }}
                >
                  <Box height='42px' width='510px' vAlign='center'>
                    <Label value={index} marginRight={10} /> {value?.text}
                  </Box>
                </Radio>
              )}
            />
          </Box>
        </Box>
      </BackgroundWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' show={cardData.p03.isSubmitted && isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='10px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>4. 3D Photo Camera</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const BackgroundWrap = styled.div`
  width: 100%;
  background: center / cover no-repeat url(${backgroundImg});
  border-radius: 15px;
`;

export default P03;
