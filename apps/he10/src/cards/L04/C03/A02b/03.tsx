import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Dropdown,
  EImageType,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Image,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C03A02b } from './store';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C03A02b);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Choose the correct words to complete the notice based on the talk.',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C03/A02/HE1-L04-C03-A02-02.mp3',
    captionSrc: '/L04/C03/A02/HE1-L04-C03-A02-02.srt',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', ''],
          isAnswer: true,
          isCorrect: false,
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.p03.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect = cardData.p03.answer.every((a, idx = 0) => a === cardData.p03.solution[idx]);

    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p03.answer,
            isAnswer: true,
            isCorrect: cardData.p03.isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P03', userSubmission, isCorrect);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  const handleDropdownClick = (index: number, newValue: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx === index));

    const originalValue = cardData.p03.answer;
    const newValues = [...originalValue];

    if (newValue !== undefined) {
      newValues[index] = newValue;
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: newValues } }));
    }
    changeData('P03', 1, 1, newValues);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p03.answer.every(isNotEmptyString)}
      submitBtnColor={
        cardData.p03.answer.every(isNotEmptyString) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
      onSubmit={submitAnswer}
    >
      <BoxWrap useFull>
        <Box width='900px'>
          <Image
            type={EImageType.IMG_BG}
            src={'/L04/C03/A02/HE1-L04-C03-A02-02-2.jpg'}
            alt='Water Collecting King이라는 서비스 이름이 쓰여있는 대형 트럭'
            width='100%'
            height='420px'
          >
            <BoxWrap display='flex'>
              <Box vAlign='flex-start' width='100%' margin='10px 20px'>
                <Typography useGap={false} weight='var(--font-weight-bold)' color='var(--color-yellow-600)'>
                  Waste Collecting King
                </Typography>
              </Box>
              <Box hAlign='end' width='100%' margin='5px 20px'>
                <Typography weight='var(--font-weight-bold)' color='var(--color-green-600)' style={{ textAlign: 'end' }}>
                  Home Appliance <br />
                  Recycling Pick-up Service
                </Typography>
              </Box>
            </BoxWrap>
            <BoxWrap flexDirection='column'>
              <Box vAlign='baseline' margin='5px 20px' gap={65}>
                <Typography weight='var(--font-weight-bold)'>Items</Typography>
                <Box hAlign='flex' flexWrap='wrap' whiteSpace='nowrap'>
                  <Typography useGap={false}>old (1) </Typography>
                  <Dropdown
                    width='200px'
                    dropdownList={cardData.p03.dropArr[0]}
                    isOpen={openDropdown[0]}
                    selectedValue={cardData.p03.answer[0]}
                    readOnly={cardData.p03.isSubmitted}
                    onClick={value => handleDropdownClick(0, value)}
                    ariaLabel='1번째 답 선택칸'
                    isError={cardData.p03.isSubmitted && cardData.p03.answer[0] !== cardData.p03.solution[0]}
                  />
                  <Typography>home appliances like </Typography>
                  refrigerators, air conditioners, and TVs
                </Box>
              </Box>
              <Box hAlign='baseline' margin='5px 20px' gap={75}>
                <Typography weight='var(--font-weight-bold)'>Cost</Typography>
                <Typography useGap={false}>absolutely free</Typography>
              </Box>
              <Box hAlign='baseline' margin='5px 20px' gap={40}>
                <Typography weight='var(--font-weight-bold)'>How to Use</Typography>
                <Box hAlign='flex' flexWrap='wrap'>
                  <Typography useGap={false}>Just (2)</Typography>
                  <Dropdown
                    width='240px'
                    dropdownList={cardData.p03.dropArr[1]}
                    isOpen={openDropdown[1]}
                    selectedValue={cardData.p03.answer[1]}
                    readOnly={cardData.p03.isSubmitted}
                    onClick={value => handleDropdownClick(1, value)}
                    ariaLabel='2번째 답 선택칸'
                    isError={cardData.p03.isSubmitted && cardData.p03.answer[1] !== cardData.p03.solution[1]}
                  />
                  <Typography>to make a reservation,</Typography>
                  <Typography useGap={false}>and we will pick up your appliances.</Typography>
                </Box>
              </Box>
            </BoxWrap>
          </Image>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box marginBottom='12px'>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          {cardData.p03.solution.map((a, index) => (
            <Box key={index}>
              <Typography>{`(${index + 1}) ${a}`}</Typography>
            </Box>
          ))}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
