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

const P03 = () => {
  const PAGE_NUMBER = 'P03';
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
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
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
제목How Noise-Cancellation Works
소제목 Scientific Principle
내용 Constructive Interference와 2 빈칸 Interference에 관한 문장`;

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
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
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (!cardData.p03.isSubmitted) {
      const isCorrect = cardData.p03.answer === cardData.p03.solution;
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer,
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
    const { answer, isSubmitted } = cardData.p03;

    if (!isSubmitted) {
      return answer ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const handleClickDropdown = (value?: string) => {
    if (value) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: value } }));
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
      submitLabel={cardData.p03.isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={(cardData.p03.isSubmitted || !cardData.p03.answer) && !cardData.p03.isSubmitted && !isAnswerShow}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmit}
    >
      <Box display='flex' gap={'8px'}>
        <Box hAlign='center'>
          <PinchZoom pinchType={'image'}>
            <Image type={EImageType.IMG} src={'/L03/C07/A02/HE1-L03-C07-A02b-P03.jpg'} width='320px' height='378px' alt={altText} />
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
              <Box padding={'8px, 12px, 8px, 12px'} display='flex' alignItems='center'>
                <Typography weight={'var(--font-weight-bold)'}>2)</Typography>
                <Dropdown
                  selectedValue={cardData.p03.answer}
                  dropdownList={cardData.p03.dropdownList}
                  onClick={handleClickDropdown}
                  ariaLabel='답 선택칸'
                  readOnly={cardData.p03.isSubmitted}
                  isError={cardData.p03.isSubmitted && !(cardData.p03.answer === cardData.p03.solution)}
                  width='200px'
                />
                <Typography weight={'var(--font-weight-bold)'} fontSize='var(--font-size-32)' lineHeight='40px'>
                  Interference
                </Typography>
              </Box>

              <Box gap={'6px'} display='flex'>
                <Typography lineHeight='40px'>
                  The peak of one sound wave overlaps with the valley of another wave, which results in a quieter sound silence.
                </Typography>
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
              <Typography>2) {cardData.p03.solution}</Typography>
            </Typography>
          </Box>
        </Box>
      </BottomSheet>

      <Paragraph isOpen={isDialogOpen} handleClose={handleDialogClose} />
    </Container>
  );
};

export default P03;
