import { useEffect, useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  Typography,
  PinchZoom,
  EImageType,
  Image,
  Scroll,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleButtonTypes,
  Button,
  EStyleSizes,
  Dropdown,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L03C07A02b } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Paragraph } from './01';

const P04 = () => {
  const PAGE_NUMBER = 'P04';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C07A02b);
  const { userId } = useRecoilValue(studentAtom);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: cardData.headerText,
  };

  const questionInfo = {
    text: cardData.questionText,
    mark: cardData.p04.isSubmitted ? (cardData.p04.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

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
      ],
    },
  ];

  const altText = `글의 구조가 보이는 인포그래픽
소제목 Noise-Cancelling Headphones
내용 첫 번째 칸 Microphones에 관한 문장
두 번째 칸 Noise-Cancelling Circuitry에 관한 문장
세 번째 칸 Speakers에 관한 문장`;

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (!cardData.p04.isSubmitted) {
      const isCorrect = cardData.p04.answer === cardData.p04.solution;
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p04.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrect);
    } else {
      setIsAnswerShow(isAnswerShow => !isAnswerShow);
    }
  };

  const getButtonColor = () => {
    const { answer, isSubmitted } = cardData.p04;

    if (!isSubmitted) {
      return answer ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const handleClickDropdown = (value?: string) => {
    if (value) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer: value } }));
      changeData(PAGE_NUMBER, 1, 1, value);
    }
  };

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
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
      submitLabel={cardData.p04.isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={(cardData.p04.isSubmitted || !cardData.p04.answer) && !cardData.p04.isSubmitted && !isAnswerShow}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmit}
    >
      <Box display='flex' gap={'8px'}>
        <Box hAlign='center'>
          <PinchZoom pinchType={'image'}>
            <Image type={EImageType.IMG} src={'/L03/C07/A02/HE1-L03-C07-A02b-P04.jpg'} width='320px' height='378px' alt={altText} />
          </PinchZoom>
        </Box>

        <Box width={'100%'} display='flex' flexDirection='column'>
          <Box hAlign='right'>
            <Button
              minWidth='96px'
              size={EStyleSizes.SMALL}
              color={EStyleButtonTypes.SECONDARY}
              label='지문보기'
              ariaLabel='지문보기'
              onClick={handleButtonClick}
              useRound
            />
          </Box>
          <Scroll>
            <Box width='100%' flexDirection='column' vAlign='center' gap={'12px'}>
              <Box padding={'8px, 12px, 8px, 12px'}>
                <Typography weight={'var(--font-weight-bold)'} fontSize='var(--font-size-32)' lineHeight='40px'>
                  Noise Cancelling Headphone
                </Typography>
              </Box>
              <Box padding={'8px, 12px, 8px, 12px'}>
                <Typography textDecoration={'underline'} weight={'var(--font-weight-bold)'} fontSize='var(--font-size-32)' lineHeight='40px'>
                  Microphone
                </Typography>
              </Box>

              <Box gap={'6px'} alignSelf='flex-start' display='flex' alignItems='center' lineHeight={'40px'}>
                <Typography>pick up</Typography>
                <Typography weight={'var(--font-weight-bold)'}>3)</Typography>
                <Dropdown
                  selectedValue={cardData.p04.answer}
                  dropdownList={cardData.p04.dropdownList}
                  onClick={handleClickDropdown}
                  ariaLabel='답 선택칸'
                  readOnly={cardData.p04.isSubmitted}
                  isError={cardData.p04.isSubmitted && !(cardData.p04.answer === cardData.p04.solution)}
                  width='200px'
                />
                <Typography>sounds</Typography>
              </Box>
            </Box>
          </Scroll>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false} usePre>
              <Typography>3) {cardData.p04.solution}</Typography>
            </Typography>
          </Box>
        </Box>
      </BottomSheet>

      <Paragraph isOpen={isDialogOpen} handleClose={handleDialogClose} />
    </Container>
  );
};

export default P04;
