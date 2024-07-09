import { useEffect, useState } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  Scroll,
  Button,
  Input,
  EStyleButtonTypes,
  EStyleSizes,
  Typography,
  Dialog,
  EStyleFontSizes,
  BottomSheet,
  SvgIcon,
  ESvgType,
  ETagLine,
  Tag,
  IQuestionProps,
  BoxWrap,
  TMarkType,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L03C06A07b } from './store';
import { getUserSubmission, inputDatasType, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C06A07b);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Tuning Out: The Science of Noise-Cancellation (5)',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <Typography>
        <Typography weight={'var(--font-weight-bold)'}>Q5.</Typography> Fill in the blanks to complete the sentences.
      </Typography>
    ),
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const contents =
    'As technology advances, many people expect it will solve various social issues caused by noise pollution. A common source of these problems is noisy neighbors, as the noise they make can lead to conflict among residents. Noise-cancellation technology can help address these problems by reducing unwanted disturbances, allowing people to lead more peaceful and healthier lives.';

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

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p02.answer1, cardData.p02.solution1);
      const isCorrect2 = isAnswer(cardData.p02.answer2, cardData.p02.solution2);
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
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
            result: userSubmissionList[0].inputData.map((item: inputDatasType) => item.isCorrect),
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        [`answer${subKey}`]: value,
      },
    }));
    changeData('P02', 1, subKey, value);
  };

  const handleDialogButtonClick = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  useEffect(() => {
    return () => {
      saveData('P02');
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
      vAlign={'flex-start'}
      onSubmit={submitAnswer}
      submitLabel={!cardData.p02.isSubmitted ? '채점하기' : isShow ? '답안 닫기' : '답안 보기'}
      submitDisabled={!isNotEmptyString(cardData.p02.answer1) || !isNotEmptyString(cardData.p02.answer2)}
      submitBtnColor={
        !isNotEmptyString(cardData.p02.answer1) || !isNotEmptyString(cardData.p02.answer2)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <BoxWrap marginBottom={'15px'}>
        <Box width={'100%'} hAlign='flex-end'>
          <Button size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문보기' useRound onClick={handleDialogButtonClick} />
        </Box>
      </BoxWrap>
      {isDialogOpen && (
        <Dialog
          width={893}
          height={470}
          isShow={isDialogOpen}
          onClose={() => setIsDialogOpen(!isDialogOpen)}
          useFooter={true}
          closeLabel={'지문 닫기'}
        >
          <Box height={'15%'} background={'gray'} useRound={true} hAlign='flex-start' vAlign='flex-center' useFull={true}>
            <Typography useGap={false} weight={'bold'} size={EStyleFontSizes.MEDIUM}>
              Tuning Out: The Science of Noise-Cancellation (5)
            </Typography>
          </Box>
          <Box hAlign='center' marginTop='24px'>
            <Scroll height={'270px'}>
              <Typography useGap={false} weight={'normal'} size={EStyleFontSizes.MEDIUM} usePre>
                {contents}
              </Typography>
            </Scroll>
          </Box>
        </Dialog>
      )}
      <Box background={'white'} useRound>
        <Scroll height='100%' tabIndex={101}>
          <Typography usePre>
            What does the phrase "these problems" in the second sentence refer to? <br />
            <StyledIcon src={RightArrowIcon} type={ESvgType.IMG} />
            <TextPartLeft>It refers to various </TextPartLeft>
            <Input
              ariaLabel='1번 답란'
              value={cardData.p02.answer1.trim()}
              minWidth='230px'
              onChange={e => {
                handleChange(1, e.target.value);
              }}
              maxLength={30}
              placeholder='내용을 넣어 주세요.'
              status={
                !cardData.p02.answer1
                  ? InputStatus.DEFAULT
                  : cardData.p02.isSubmitted && !cardData.p02.result[0]
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              inputSize='x-small'
              readOnly={cardData.p02.isSubmitted}
            />
            {' issues caused by '}
            <Input
              ariaLabel='2번 답란'
              value={cardData.p02.answer2.trim()}
              minWidth='230px'
              onChange={e => {
                handleChange(2, e.target.value);
              }}
              maxLength={30}
              placeholder='내용을 넣어 주세요.'
              status={
                !cardData.p02.answer2
                  ? InputStatus.DEFAULT
                  : cardData.p02.isSubmitted && !cardData.p02.result[1]
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              inputSize='x-small'
              readOnly={cardData.p02.isSubmitted}
            />
            {' pollution.'}
          </Typography>
        </Scroll>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>social, noise</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;

const TextPartLeft = styled.span`
  display: inline;
  padding-left: 12px;
`;

const StyledIcon = styled(SvgIcon)`
  vertical-align: middle;
  padding-right: 12px;
`;

const BoldSpan = styled.span`
  font-weight: var(--font-weight-extraBold);
`;
