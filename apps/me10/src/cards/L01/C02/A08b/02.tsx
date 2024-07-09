import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { IRadioData } from '@maidt-cntn/pages/HE-007-01';
import {
  BottomSheet,
  Box,
  BoxWrap,
  ChipButton,
  EChipButtonType,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  List,
  Question,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C02A08b } from './store';
import { useEffect, useState } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

interface IData extends IRadioData {
  value: boolean | undefined;
  isCorrect: boolean | undefined;
}

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C02A08b);
  const [isShow, setIsShow] = useState<boolean>(false);

  const bottomAnswer = (
    <>
      <Box key={1} marginTop='12px'>
        (1) {cardData.p02.solution1 ? 'T' : 'F'}
      </Box>
      <Box key={2} marginTop='12px'>
        (2) {cardData.p02.solution2 ? 'T' : 'F'}
      </Box>
    </>
  );

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'BOOLEAN',
          value: undefined,
          isAnswer: false,
        },
        {
          subKey: 2,
          type: 'BOOLEAN',
          value: undefined,
          isAnswer: false,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen More',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <>
        <Box marginRight='10px'>
          <Typography useGap={false} fontSize={'var(--font-size-32)'} lineHeight='50px' weight={'var(--font-weight-extraBold)'}>
            2. Listen Again and Choose
          </Typography>
          <Typography>다시 듣고, 내용과 일치하면 T, 일치하지 않으면 F에 표시해 봅시다.</Typography>
        </Box>
      </>
    ),
    size: 'medium',
    markSize: 'middle',
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C02/A08/ME1-L01-C02-A08-P02.mp3',
    captionSrc: '/L01/C02/A08/ME1-L01-C02-A08-P02.srt',
  };

  const data: IData[] = [
    {
      contents: '(1) Dylan은 코미디 영화를 좋아한다.',
      answer: true,
      value: undefined,
      isCorrect: undefined,
    },
    {
      contents: '(2) 유나는 공포 영화를 좋아한다.',
      answer: false,
      value: undefined,
      isCorrect: undefined,
    },
  ];

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

  const handleChipButtonClick = (value: boolean, index: number) => {
    if (index === 1) {
      if (value === cardData.p02.answer1) {
        setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: undefined as unknown as boolean } }));
      } else {
        setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
      }
    } else if (index === 2) {
      if (value === cardData.p02.answer2) {
        setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: undefined as unknown as boolean } }));
      } else {
        setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
      }
    }
    changeData('P02', 1, index, value);
  };

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const isCorrect1 = cardData.p02.answer1 === cardData.p02.solution1;
      const isCorrect2 = cardData.p02.answer2 === cardData.p02.solution2;

      const isCorrect = isCorrect1 && isCorrect2;

      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'BOOLEAN',
              value: cardData.p02.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'BOOLEAN',
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
      submitBtnColor={
        cardData.p02.answer1 === undefined || cardData.p02.answer2 === undefined
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={cardData.p02.answer1 === undefined || cardData.p02.answer2 === undefined}
      onSubmit={submitAnswer}
    >
      <List data={data}>
        {({ value, index = 1 }) => (
          <BoxWrap justifyContent='space-between' useFull key={index}>
            <Box>
              <Question size={'small'}>{value?.contents}</Question>
            </Box>
            <Box alignContent='center'>
              <BoxWrap>
                <ChipButton
                  tabIndex={101 + index}
                  type='radio'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.TRUE}
                  ariaLabel={index + '번 보기 참'}
                  isError={
                    cardData.p02.isSubmitted &&
                    (index === 1 ? cardData.p02.answer1 !== cardData.p02.solution1 : cardData.p02.answer2 !== cardData.p02.solution2)
                  }
                  isActive={index === 1 ? cardData.p02.answer1 === true : cardData.p02.answer2 === true}
                  isDisabled={cardData.p02.isSubmitted}
                  size={'48px'}
                  onClick={() => handleChipButtonClick(true, index)}
                />
                <ChipButton
                  tabIndex={102 + index}
                  type='radio'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.FALSE}
                  ariaLabel={index + '번 보기 거짓'}
                  isError={
                    cardData.p02.isSubmitted &&
                    (index === 1 ? cardData.p02.answer1 !== cardData.p02.solution1 : cardData.p02.answer2 !== cardData.p02.solution2)
                  }
                  isActive={index === 1 ? cardData.p02.answer1 === false : cardData.p02.answer2 === false}
                  isDisabled={cardData.p02.isSubmitted}
                  size={'48px'}
                  onClick={() => handleChipButtonClick(false, index)}
                />
              </BoxWrap>
            </Box>
          </BoxWrap>
        )}
      </List>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <BoxWrap>
            <Box marginTop='12px' marginLeft='12px'>
              {bottomAnswer}
            </Box>
          </BoxWrap>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
