import { ChangeEvent, useEffect, useState } from 'react';
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
  Input,
  InputStatus,
  EStyleButtonTypes,
  Button,
  EStyleSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L03C07A02a } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Paragraph } from './01';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';

const P06 = () => {
  const PAGE_NUMBER = 'P06';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C07A02a);
  const { userId } = useRecoilValue(studentAtom);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: cardData.headerText,
  };

  const questionInfo = {
    text: cardData.questionText,
    mark: cardData.p06.isSubmitted ? (cardData.p06.isCorrect ? 'correct' : 'incorrect') : 'none',
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p06: {
            ...prev.p06,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p06.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (!cardData.p06.isSubmitted) {
      const { answer } = cardData.p06;
      const isCorrect = isAnswer(answer, [cardData.p06.solution, cardData.p06.solution2]);
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, isSubmitted: true, isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p06.answer,
              isAnswer: true,
              isCorrect: isAnswer(answer, [cardData.p06.solution, cardData.p06.solution2]),
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
    const { answer, isSubmitted } = cardData.p06;

    if (!isSubmitted) {
      return answer ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const handleChangeAnswer = (event: ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer: event.target.value } }));
    changeData(PAGE_NUMBER, 1, 1, event.target.value);
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
      submitLabel={cardData.p06.isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={(cardData.p06.isSubmitted || !cardData.p06.answer) && !cardData.p06.isSubmitted && !isAnswerShow}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmit}
    >
      <Box display='flex' gap={'8px'}>
        <Box hAlign='center'>
          <PinchZoom pinchType={'image'}>
            <Image type={EImageType.IMG} src={'/L03/C07/A02/HE1-L03-C07-A02a-P06.jpg'} width='320px' height='378px' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              <p>글의 구조가 보이는 인포그래픽</p>
              <p>소제목 Effect</p>
              <p>내용 The outside noise is effectively reduced, allowing you to hear the music clearly.</p>
              <p>아래로 이어지는 화살표</p>
              <p>소제목 Limitation</p>
              <p>내용 More Effective for 와 Less Effective for에 관한 문장</p>
            </Box>
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
                  Limitation
                </Typography>
              </Box>
              <Box padding={'8px, 12px, 8px, 12px'}>
                <Typography textDecoration={'underline'} weight={'var(--font-weight-bold)'} fontSize='var(--font-size-32)' lineHeight='40px'>
                  More Effective for
                </Typography>
              </Box>

              <Box gap={'6px'} display='flex'>
                <Typography lineHeight='40px'>
                  <Typography weight={'var(--font-weight-bold)'} useGap={false}>
                    8)
                  </Typography>{' '}
                  r
                  <Input
                    value={cardData.p06.answer}
                    onChange={handleChangeAnswer}
                    maxLength={100}
                    ariaLabel={`서술 답안 입력란 8`}
                    status={
                      cardData.p06.isSubmitted
                        ? !isAnswer(cardData.p06.answer, [cardData.p06.solution, cardData.p06.solution2])
                          ? InputStatus.ERROR
                          : InputStatus.DEFAULT
                        : InputStatus.ENABLE
                    }
                    readOnly={cardData.p06.isSubmitted}
                    width='180px'
                  />{' '}
                  sounds such as noise from car engines and subways
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
              <Typography>
                8) {cardData.p06.solution} ({cardData.p06.solution2}도 정답 인정)
              </Typography>
            </Typography>
          </Box>
        </Box>
      </BottomSheet>

      <Paragraph isOpen={isDialogOpen} handleClose={handleDialogClose} />
    </Container>
  );
};

export default P06;
