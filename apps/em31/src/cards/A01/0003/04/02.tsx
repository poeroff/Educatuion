import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  BottomSheet,
  Box,
  EImageType,
  EStyleButtonTypes,
  ESvgType,
  ETagLine,
  IQuestionProps,
  Image,
  Input,
  InputStatus,
  Label,
  List,
  OverlayTooltip,
  SvgIcon,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import fox from '@/assets/example/EM-008/fox.png';
import { isAnswer, isNumber } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { A01_0003_04 } from './store';
import { studentAtom } from '@/stores/student';
import bubbleTail from '@maidt-cntn/assets/icons/bubble_tail.svg';
import { IBoxData, ImgBox, getImg } from '@maidt-cntn/math/pages/EM-008-01';

const P02 = () => {
  const [isShow, setShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0003_04);
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
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const answers = [cardData.p02.answer1, cardData.p02.answer2, cardData.p02.answer3];
  const solutions = [cardData.p02.solution1, cardData.p02.solution2, cardData.p02.solution3];

  const explanation = '백 모형은 3개, 십 모형은 4개, 일 모형은 2개입니다.';

  const inputTitleInfo = [
    { title: '백 모형', color: 'var(--color-green-200)' },
    { title: '십 모형', color: 'var(--color-red-200)' },
    { title: '일 모형', color: 'var(--color-blue-200)' },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '훈련 받은 강아지 수 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <Label value='ㄴ' color='var(--color-white)' background='var(--color-grey-600)' />
        <Typography>수 모형이 모두 몇 개인지 알아보세요.</Typography>
      </Box>
    ),
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
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
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p02.answer3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleOnSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShow(show => !show);
    } else {
      const isCorrect1 = isAnswer(cardData.p02.answer1, cardData.p02.solution1);
      const isCorrect2 = isAnswer(cardData.p02.answer2, cardData.p02.solution2);
      const isCorrect3 = isAnswer(cardData.p02.answer3, cardData.p02.solution3);
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;

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
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p02.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (!isNumber(value)) {
      return;
    }

    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer3: value } }));
    }
    changeData('P02', 1, subKey, value);
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

  const topFigureData: IBoxData[] = [
    { count: 1, ariaLabel: '백 모형' },
    { count: 2, ariaLabel: '십 모형' },
    { count: 7, ariaLabel: '일 모형' },
    { count: 2, ariaLabel: '백 모형' },
    { count: 1, ariaLabel: '십 모형' },
    { count: 5, ariaLabel: '일 모형' },
  ];

  const figureData: IBoxData[] = [
    { count: 3, ariaLabel: '백 모형' },
    { count: 4, ariaLabel: '십 모형' },
    { count: 2, ariaLabel: '일 모형' },
  ];

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background='var(--color-white)'
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleOnSubmit}
      submitDisabled={!(cardData.p02.answer1 && cardData.p02.answer2 && cardData.p02.answer3)}
      submitBtnColor={
        !(cardData.p02.answer1 && cardData.p02.answer2 && cardData.p02.answer3)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      vAlign='flex-start'
      useRound
      useExtend
    >
      <Box vAlign='center' flexDirection='column'>
        <FoxSpeak>
          <OverlayTooltip type='cloud' place='top'>
            일 모형끼리 더해서
            <br />
            10개이거나 10개보다
            <br />
            많으면 일 모형 10개를
            <br />십 모형 1개로 바꿔요.
          </OverlayTooltip>
        </FoxSpeak>
        <Box position='absolute' right={210}>
          <Image type={EImageType.IMG_BG} src={'/A01/0003/04/A0100030402_1.png'} width='219px' height='208px' />
        </Box>
        <Box marginTop='10px' width='680px' display='grid' gridTemplateColumns='1fr 1fr 1fr' rowGap='8px' columnGap='24px'>
          {topFigureData.map((item, index) => (
            <Box key={index} type='line' useFull hAlign='center' borderRadius='16px' minHeight='116px' padding='8px 0'>
              <ImgBox role='img' aria-label={item.ariaLabel + item.count + '개'} ariaLabel={item.ariaLabel}>
                {[...Array(item.count)].map((__, index) => (
                  <Box display='flex'>
                    <SvgIcon
                      type={ESvgType.IMG}
                      zIndex={item.ariaLabel === '백 모형' ? item.count - index : 0}
                      src={getImg(item.ariaLabel)}
                      alt=''
                      ariaHidden
                      size='100%'
                    />
                  </Box>
                ))}
              </ImgBox>
            </Box>
          ))}
        </Box>
        <Box width='100%' margin='10px 0 7px 0' hAlign='center'>
          <SvgIcon src={bubbleTail} width='100%' height='45px' />
        </Box>
        <Box marginBottom='24px' width='680px' display='grid' gridTemplateColumns='1fr 1fr 1fr' rowGap='8px' columnGap='24px'>
          {figureData.map((item, index) => (
            <Box key={index} type='line' useFull hAlign='center' borderRadius='16px' minHeight='116px' padding='8px 0'>
              <ImgBox role='img' aria-label={item.ariaLabel + item.count + '개'} ariaLabel={item.ariaLabel}>
                {[...Array(item.count)].map((__, index) => (
                  <Box display='flex'>
                    <SvgIcon
                      type={ESvgType.IMG}
                      zIndex={item.ariaLabel === '백 모형' ? item.count - index : 0}
                      src={getImg(item.ariaLabel)}
                      alt=''
                      ariaHidden
                      size='100%'
                    />
                  </Box>
                ))}
              </ImgBox>
            </Box>
          ))}
        </Box>

        <Box hAlign='center'>
          <List
            data={inputTitleInfo}
            align='horizontal'
            gap={24}
            row={({ value, index = 1 }) => (
              <Box key={index} width='100%' height='100%'>
                <Box backgroundColor={value?.color} marginBottom='4px' padding='12px 0' textAlign='center' borderRadius='8px'>
                  {value?.title}
                </Box>
                <Box borderRadius='8px' width='210px' background='white' hAlign='center' padding='8px 16px' border='1px solid var(--color-grey-400)'>
                  <Input
                    type='number'
                    width='52px'
                    value={answers[index - 1]}
                    onChange={e => handleChange(index, e.target.value)}
                    ariaLabel={value?.title + ' 개수의 답'}
                    readOnly={cardData.p02.isSubmitted}
                    maxLength={1}
                    status={
                      cardData.p02.isSubmitted && !cardData.p02.isCorrect && !isAnswer(answers[index - 1], solutions[index - 1])
                        ? InputStatus.ERROR
                        : answers[index - 1].trim().length > 0
                        ? InputStatus.ENABLE
                        : InputStatus.DEFAULT
                    }
                  />
                  <Typography>개</Typography>
                </Box>
              </Box>
            )}
          />
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{solutions.join(', ')}</Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>{explanation}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const FoxSpeak = styled.div`
  position: absolute;
  top: 80px;
  right: 10px;
  display: block;
  background: url(${fox}) bottom center no-repeat;
  height: 230px;
  width: 198px;
`;

export default P02;
