import {
  Box,
  TMainHeaderInfoTypes,
  IAudioPlayerProps,
  IQuestionProps,
  Typography,
  EStyleButtonTypes,
  Tag,
  ETagLine,
  BottomSheet,
  Input,
  InputStatus,
} from '@maidt-cntn/ui';
import styled from '@emotion/styled';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { L04C02A03a } from './store';

const vitePath = import.meta.env.VITE_CDN_PATH;
const backgroundImg = `${vitePath}/L04/C02/A03/HE2-L04-C02-A03-02.jpg`;

const P03 = () => {
  const [isShow, setShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C02A03a);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks using information from the dialogue.',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C02/A03/HE2-L04-C02-A03-02.mp3',
    captionSrc: '/L04/C02/A03/HE2-L04-C02-A03-02.srt',
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
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

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
            answer2_1: userSubmissionList[0].inputData[1]?.value || cardData.p03.answer2_1,
            answer2_2: userSubmissionList[0].inputData[2]?.value || cardData.p03.answer2_2,
            answer3: userSubmissionList[0].inputData[3]?.value || cardData.p03.answer3,
            isSubmitted,
            isCorrect: userSubmissionList[0].isCorrect,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2_1: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2_2: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer3: value } }));
    }
    changeData('P03', 1, subKey, value);
  };

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p03.answer1, cardData.p03.solution1);
      const isCorrect2_1 = isAnswer(cardData.p03.answer2_1, cardData.p03.solution2_1);
      const isCorrect2_2 = isAnswer(cardData.p03.answer2_2, cardData.p03.solution2_2);
      const isCorrect3 = isAnswer(cardData.p03.answer3, cardData.p03.solution3);

      const isCorrect = isCorrect1 && isCorrect2_1 && isCorrect2_2 && isCorrect3;

      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p03.answer2_1,
              isAnswer: true,
              isCorrect: isCorrect2_1,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p03.answer2_2,
              isAnswer: true,
              isCorrect: isCorrect2_2,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p03.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P03', userSubmission, isCorrect);
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
        !(cardData.p03.answer1 && cardData.p03.answer2_1 && cardData.p03.answer2_2 && cardData.p03.answer3)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={!(cardData.p03.answer1 && cardData.p03.answer2_1 && cardData.p03.answer2_2 && cardData.p03.answer3)}
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
          <Box alignSelf='flex-end' marginTop='20px' marginRight='30px'>
            <Typography>• Built-in Bluetooth (1) </Typography>
            <Input
              inputSize='x-small'
              value={cardData.p03.answer1}
              onChange={e => handleChange(1, e.target.value)}
              placeholder='내용을 넣어 주세요.'
              ariaLabel='1번 답 입력란'
              width='225px'
              maxLength={100}
              readOnly={cardData.p03.isSubmitted}
              status={
                cardData.p03.isSubmitted
                  ? !isAnswer(cardData.p03.answer1, cardData.p03.solution1)
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                  : !isNotEmptyString(cardData.p03.answer1)
                  ? InputStatus.DEFAULT
                  : InputStatus.ENABLE
              }
            />
            <br />
            <Typography>• Microphones for Making (2) </Typography>
            <Input
              inputSize='x-small'
              value={cardData.p03.answer2_1}
              onChange={e => handleChange(2, e.target.value)}
              placeholder='내용을 넣어 주세요.'
              ariaLabel='2-1번 답 입력란'
              width='225px'
              maxLength={100}
              readOnly={cardData.p03.isSubmitted}
              status={
                cardData.p03.isSubmitted
                  ? !isAnswer(cardData.p03.answer2_1, cardData.p03.solution2_1)
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                  : !isNotEmptyString(cardData.p03.answer2_1)
                  ? InputStatus.DEFAULT
                  : InputStatus.ENABLE
              }
            />
            <br />
            <Input
              inputSize='x-small'
              value={cardData.p03.answer2_2}
              onChange={e => handleChange(3, e.target.value)}
              placeholder='내용을 넣어 주세요.'
              ariaLabel='2-2번 답 입력란'
              width='225px'
              maxLength={100}
              readOnly={cardData.p03.isSubmitted}
              status={
                cardData.p03.isSubmitted
                  ? !isAnswer(cardData.p03.answer2_2, cardData.p03.solution2_2)
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                  : !isNotEmptyString(cardData.p03.answer2_2)
                  ? InputStatus.DEFAULT
                  : InputStatus.ENABLE
              }
            />
            <br />
            <Typography>• Auto-Fitting (3) </Typography>
            <Input
              inputSize='x-small'
              value={cardData.p03.answer3}
              onChange={e => handleChange(4, e.target.value)}
              placeholder='내용을 넣어 주세요.'
              ariaLabel='3번 답 입력란'
              width='225px'
              maxLength={100}
              readOnly={cardData.p03.isSubmitted}
              status={
                cardData.p03.isSubmitted
                  ? !isAnswer(cardData.p03.answer3, cardData.p03.solution3)
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                  : !isNotEmptyString(cardData.p03.answer3)
                  ? InputStatus.DEFAULT
                  : InputStatus.ENABLE
              }
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
            <Typography usePre>
              (1) {cardData.p03.solution1 + '\n'}(2) {cardData.p03.solution2_1 + '' + cardData.p03.solution2_2 + '\n'}(3) {cardData.p03.solution3}
            </Typography>
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
