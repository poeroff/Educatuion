import {
  Box,
  IQuestionProps,
  Label,
  TMainHeaderInfoTypes,
  Typography,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  List,
  Image,
  Checkbox,
  PinchZoom,
  BoxWrap,
} from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { B02_0005_30 } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container } from '@maidt-cntn/ui/math';

const P03 = ({ pageKey = 'P03' }: { pageKey?: string }) => {
  const storeKey = 'P03';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B02_0005_30);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const isDisabled = cardData[storeKey].answer.every(answer => !answer);

  const headerInfo: TMainHeaderInfoTypes = {};

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='3' type='icon' />
        <Box>
          <Label
            cssStyle={{ padding: '15px' }}
            value='보기'
            type='paint'
            background='var(--color-grey-600)'
            color='var(--color-white)'
            marginRight={10}
          />
          와 같이 직각이 2개인 모양을 그린 것을 모두 고르세요.
        </Box>
      </>
    ),
    mark: cardData[storeKey].isSubmitted ? (cardData[storeKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const SOLUTION_DATA = [
    {
      src: '/C02/0005/10/DIC312006(sol)_01.png',
      alt: '점판 위에 선분으로 그려져 있고 직각 표시가 2개 그려진 그림입니다.',
      label: '①',
    },
    {
      src: '/C02/0005/10/DIC312006(sol)_02.png',
      alt: '점판 위에 선분으로 그려져 있고 직각 표시가 1개 그려진 그림입니다.',
      label: '②',
    },
    {
      src: '/C02/0005/10/DIC312006(sol)_03.png',
      alt: '점판 위에 선분으로 그려져 있고 직각 표시가 1개 그려진 그림입니다.',
      label: '③',
    },
    {
      src: '/C02/0005/10/DIC312006(sol)_04.png',
      alt: '점판 위에 선분으로 그려져 있고 직각 표시가 2개 그려진 그림입니다.',
      label: '④',
    },
    {
      src: '/C02/0005/10/DIC312006(sol)_05.png',
      alt: '점판 위에 선분으로 그려져 있고 직각 표시가 0개 그려진 그림입니다.',
      label: '⑤',
    },
  ];

  const handleOnClick = (index: number) => {
    const mark = cardData[storeKey].answer[index] === '' ? 'O' : '';
    const answer = cardData[storeKey].answer.map((m, i) => (i === index ? mark : m));

    setCardData(prev => ({
      ...prev,
      [storeKey]: {
        ...prev[storeKey],
        answer: answer,
      },
    }));
    changeData(pageKey, 1, 1, answer);
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', '', '', ''],
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData[storeKey].isSubmitted) {
      setShow(show => !show);
    } else {
      const isCorrect = cardData[storeKey].answer.every((answer, index) => answer === cardData[storeKey].solution[index]);

      setCardData(prev => ({ ...prev, [storeKey]: { ...prev[storeKey], isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData[storeKey].answer,
              isAnswer: true,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageKey, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [storeKey]: {
            ...prev[storeKey],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[storeKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageKey);
    };
  }, [pageKey]);

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
      background='var(--color-white)'
      submitLabel={cardData[storeKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={!isDisabled ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={isDisabled}
      onSubmit={handleSubmit}
      vAlign='flex-start'
      useRound
      useExtend
    >
      <BoxWrap>
        <Box display='flex' vAlign='center' flexDirection='column' useFull>
          <Label
            cssStyle={{ padding: '15px' }}
            value='보기'
            type='paint'
            background='var(--color-grey-600)'
            color='var(--color-white)'
            marginRight={10}
          />
          <Box padding='20px 44px' type='line' useRound useFull hAlign='center' marginTop='10px' width='400px'>
            <Image
              src='/C02/0005/10/DIC312006_06.png'
              alt='점판 위에 이어진 3개의 선분으로 직각 2개를 그리고, 이어진 4개의 선분으로 직각 2개를 그린 그림입니다.'
              width='300px'
            />
          </Box>
          <Box hAlign='center' marginTop='20px' useFull>
            <Checkbox
              readOnly={cardData[storeKey].isSubmitted}
              isError={
                cardData[storeKey].isSubmitted && !cardData[storeKey].isCorrect && cardData[storeKey].answer[0] !== cardData[storeKey].solution[0]
              }
              value={cardData[storeKey].answer[0] === 'O'}
              type='square'
              onClick={() => handleOnClick(0)}
            >
              <Box display='flex' width='215px' height='200px' hAlign='center' paddingRight={15}>
                <Box display='flex'>
                  <Label type='text'>①</Label>
                  <Box hAlign='center' type='line' width='180px' height='180px' useRound>
                    <Image
                      src='/C02/0005/10/DIC312006_01.png'
                      alt='점판위에 이어진 3개의 선분으로 직각이 2개인 모양을 그린 그림입니다.'
                      width='130px'
                    />
                  </Box>
                </Box>
              </Box>
            </Checkbox>
            <Checkbox
              readOnly={cardData[storeKey].isSubmitted}
              isError={
                cardData[storeKey].isSubmitted && !cardData[storeKey].isCorrect && cardData[storeKey].answer[1] !== cardData[storeKey].solution[1]
              }
              value={cardData[storeKey].answer[1] === 'O'}
              type='square'
              onClick={() => handleOnClick(1)}
            >
              <Box display='flex' width='215px' height='200px' hAlign='center' paddingRight={15}>
                <Box display='flex'>
                  <Label type='text'>②</Label>
                  <Box hAlign='center' type='line' width='180px' height='180px' useRound>
                    <Image
                      src='/C02/0005/10/DIC312006_02.png'
                      alt='점판위에 이어진 3개의 선분으로 직각이 1개인 모양을 그린 그림입니다.'
                      width='130px'
                    />
                  </Box>
                </Box>
              </Box>
            </Checkbox>
            <Checkbox
              readOnly={cardData[storeKey].isSubmitted}
              isError={
                cardData[storeKey].isSubmitted && !cardData[storeKey].isCorrect && cardData[storeKey].answer[2] !== cardData[storeKey].solution[2]
              }
              value={cardData[storeKey].answer[2] === 'O'}
              type='square'
              onClick={() => handleOnClick(2)}
            >
              <Box display='flex' width='215px' height='200px' hAlign='center' paddingRight={15}>
                <Box display='flex'>
                  <Label type='text'>③</Label>
                  <Box hAlign='center' type='line' width='180px' height='180px' useRound>
                    <Image
                      src='/C02/0005/10/DIC312006_03.png'
                      alt='점판위에 이어진 4개의 선분으로 직각이 1개인 모양을 그린 그림입니다.'
                      width='130px'
                    />
                  </Box>
                </Box>
              </Box>
            </Checkbox>
          </Box>
          <Box display='flex' useFull marginTop='10px' paddingLeft={129}>
            <Checkbox
              readOnly={cardData[storeKey].isSubmitted}
              isError={
                cardData[storeKey].isSubmitted && !cardData[storeKey].isCorrect && cardData[storeKey].answer[3] !== cardData[storeKey].solution[3]
              }
              value={cardData[storeKey].answer[3] === 'O'}
              type='square'
              onClick={() => handleOnClick(3)}
            >
              <Box display='flex' width='215px' height='200px' hAlign='center' paddingRight={15}>
                <Box display='flex'>
                  <Label type='text'>④</Label>
                  <Box hAlign='center' type='line' width='180px' height='180px' useRound>
                    <Image
                      src='/C02/0005/10/DIC312006_04.png'
                      alt='점판위에 이어진 3개의 선분으로 직각이 2개인 모양을 그린 그림입니다.'
                      width='130px'
                    />
                  </Box>
                </Box>
              </Box>
            </Checkbox>
            <Checkbox
              readOnly={cardData[storeKey].isSubmitted}
              isError={
                cardData[storeKey].isSubmitted && !cardData[storeKey].isCorrect && cardData[storeKey].answer[4] !== cardData[storeKey].solution[4]
              }
              value={cardData[storeKey].answer[4] === 'O'}
              type='square'
              onClick={() => handleOnClick(4)}
            >
              <Box display='flex' width='215px' height='200px' hAlign='center' paddingRight={15}>
                <Box display='flex'>
                  <Label type='text'>⑤</Label>
                  <Box hAlign='center' type='line' width='180px' height='180px' useRound>
                    <Image
                      src='/C02/0005/10/DIC312006_05.png'
                      alt='점판위에 Z 모양의 이어진 3개의 선분으로 직각이 0개인 모양을 그린 그림입니다.'
                      width='130px'
                    />
                  </Box>
                </Box>
              </Box>
            </Checkbox>
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>①, ④</Typography>
          </Box>
          <Box marginTop='10px'>
            <Box>
              <Tag type={ETagLine.GREEN} label='풀이' />
            </Box>
            <Box marginTop='12px'>
              <List gap={30} align='horizontal' data={SOLUTION_DATA}>
                {({ value, index = 1 }) => (
                  <Box display='flex' width='160px' height='160px' hAlign='center'>
                    <Box display='flex'>
                      <Label type='text'>{value?.label}</Label>
                      <Box hAlign='center' type='line' width='140px' height='140px' useRound>
                        <Image src={value?.src as string} alt={value?.alt} width='110px' />
                      </Box>
                    </Box>
                  </Box>
                )}
              </List>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
