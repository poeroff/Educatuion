import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import {
  Box,
  BoxWrap,
  Button,
  Dialog,
  EImageType,
  EStyleButtonTypes,
  EStyleFontSizes,
  Image,
  PinchZoom,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
  IQuestionProps,
  BottomSheet,
  Tag,
  ETagLine,
  Input,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { textContentA02a, imgContentA02aP04 } from './commonData';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L03C07A02a } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P04 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C07A02a);

  const { title, content, subTitleIndexes } = textContentA02a;
  const { imgSrc } = imgContentA02aP04;

  const dropAnswer1: string[] = ['hysical', 'physical'];
  const dropAnswer2: string[] = ['hristmas', 'christmas'];

  const [isMainTextOpen, setIsMainTextOpen] = useState(false);

  const [showAnswer, setShowAnswer] = useState(false); // 모범 답안

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks to summarize the main text.',
    mark: cardData.p04.isSubmitted ? (cardData.p04.isCorrect ? 'correct' : 'incorrect') : undefined,
  };

  const handleButtonClick = () => {
    setIsMainTextOpen(true);
  };

  const handleDialogClose = () => {
    setIsMainTextOpen(false);
  };

  const { userId } = useRecoilValue(studentAtom);

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
      ],
    },
  ];

  const checkCorrect = (questionIdx: number): boolean => {
    if (questionIdx === 1) {
      return dropAnswer1.some(answer => answer.trim().toLowerCase() === cardData.p04.answer1.trim().toLowerCase());
    } else {
      // questionIdx === 2
      return dropAnswer2.some(answer => answer.trim().toLowerCase() === cardData.p04.answer2.trim().toLowerCase());
    }
  };

  const handleSubmit = () => {
    if (cardData.p04.isSubmitted) {
      setShowAnswer(!showAnswer);
    } else {
      const isCorrect1 = checkCorrect(1);
      const isCorrect2 = checkCorrect(2);
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p04.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p04.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P04', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p04.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer2: value } }));
    }
    changeData('P04', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P04');
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
      submitBtnColor={
        !(cardData.p04.answer1 && cardData.p04.answer2)
          ? EStyleButtonTypes.SECONDARY
          : showAnswer
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      submitLabel={cardData.p04.isSubmitted ? (showAnswer ? '답안닫기' : '답안보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={!(cardData.p04.answer1 && cardData.p04.answer2)}
      vAlign={'flex-start'}
    >
      <Box hAlign='flex-end' vAlign='flex-start' marginBottom='8px'>
        <Button width='96px' color={EStyleButtonTypes.TERTIARY} style={{ height: '44px' }} onClick={handleButtonClick}>
          <CustomButtonLabel>지문 보기</CustomButtonLabel>
        </Button>
      </Box>

      <BoxWrap>
        <Box width={'30%'} hAlign={'center'} height={'342px'}>
          <PinchZoom>
            <Image type={EImageType.IMG} src={imgSrc} alt='' ariaDescribedby='img_desc' width='100%' />
            <Box type='hidden' id='img_desc'>
              <p>글의 구조가 보이는 인포그래픽</p>
              <p>제목 Artists Who Never Gave up on Their Art Despite 1 C 빈칸 in Their Lives</p>
              <p>첫 번째 칸 Bill Traylor의 born, Life History, Works에 관한 내용</p>
              <p>두 번째 칸 Maud Lewis의 born, Life History, Works에 관한 내용</p>
              <p>세 번째 칸 Anna Ancher의 born, Life History, Works에 관한 내용</p>
            </Box>
          </PinchZoom>
        </Box>
        <Box marginLeft={'24px'} width={'70%'} height={'342px'} hAlign='center'>
          <Scroll>
            <Box display='flex' justifyContent='center'>
              <Typography weight={'var(--font-weight-bold)'} size={EStyleFontSizes.MEDIUM}>
                Maud Lewis - Life History
              </Typography>
            </Box>
            <Box display='inline-flex'>
              <Typography size={EStyleFontSizes.MEDIUM}>• born with</Typography>
            </Box>
            <Box hAlign='flex' display='inline-flex'>
              <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                4) p
              </Typography>
              <Input
                width='228px'
                value={cardData.p04.answer1}
                onChange={e => handleChange(1, e.target.value)}
                readOnly={cardData.p04.isSubmitted}
                status={!cardData.p04.isSubmitted ? InputStatus.ENABLE : !checkCorrect(1) ? InputStatus.ERROR : InputStatus.DEFAULT}
                ariaLabel='4번 답 입력란'
              />
            </Box>
            <Box display='inline-flex'>
              <Typography size={EStyleFontSizes.MEDIUM}>• painted and sold</Typography>
            </Box>
            <Box hAlign='flex' display='inline-flex'>
              <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                5) C
              </Typography>
              <Input
                width='228px'
                value={cardData.p04.answer2}
                onChange={e => handleChange(2, e.target.value)}
                readOnly={cardData.p04.isSubmitted}
                status={!cardData.p04.isSubmitted ? InputStatus.ENABLE : !checkCorrect(2) ? InputStatus.ERROR : InputStatus.DEFAULT}
                ariaLabel='5번 답 입력란'
              />
            </Box>
            <Box>
              <Typography size={EStyleFontSizes.MEDIUM}>• moved to Digby and met her husband</Typography>
            </Box>
            <Box>
              <Typography size={EStyleFontSizes.MEDIUM}>• continued painting</Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>

      <Dialog width={893} height={458} isShow={isMainTextOpen} onClose={handleDialogClose} useFooter={true} closeLabel={'지문 닫기'}>
        <Box height={'15%'} background={'gray'} useRound={true} hAlign='flex-start' vAlign='flex-center' useFull={true}>
          <Typography weight={'var(--font-weight-bold)'} size={EStyleFontSizes.MEDIUM}>
            {title}
          </Typography>
        </Box>
        <Box hAlign='center' marginTop='24px'>
          <Scroll height={'261px'}>
            {content.split('\n').map((paragraph, index, arr) => (
              <React.Fragment key={index}>
                <Typography
                  style={{ whiteSpace: 'pre-wrap' }}
                  weight={!subTitleIndexes.has(index) ? 'var(--font-weight-medium)' : 'var(--font-weight-semiBold)'}
                  size={EStyleFontSizes.MEDIUM}
                >
                  {paragraph}
                </Typography>
                <br />
                {index !== arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </Scroll>
        </Box>
      </Dialog>

      <BottomSheet bottomSheetTargetId='container' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <BoxWrap>
            <Box marginTop='12px' marginLeft='12px'>
              4) hysical (physical도 정답 인정)
            </Box>
          </BoxWrap>
          <BoxWrap>
            <Box marginTop='12px' marginLeft='12px'>
              5) hristmas (Christmas도 정답 인정)
            </Box>
          </BoxWrap>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;

const CustomButtonLabel = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #6a6d73;
  line-height: 24px;
  white-space: nowrap;
`;
