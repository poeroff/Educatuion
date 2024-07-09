import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  IQuestionProps,
  SvgIcon,
  Typography,
  Symbol,
  TMainHeaderInfoTypes,
  EStyleButtonTypes,
  BottomSheet,
  ETagLine,
  Tag,
  Scroll,
  Dialog,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import MathStar from '@maidt-cntn/assets/icons/header/header_star.svg';
import icCorrect from '@maidt-cntn/assets/icons/correct.svg';
import inCorrect from '@/assets/icon/incorrect.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { A05040508_store } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
// 맞춤 카드 컨텐츠 개발 이후 주석 해제
//import AEM310504051001 from '../../A05/0405/10/01';
//import AEM310504051001 from '../../A05/0405/10/02';
//import AEM310504051001 from '../../A05/0405/10/03';

//import AEM310504051001 from '../../A05/0405/20/01';
//import AEM310504051001 from '../../A05/0405/20/02';
//import AEM310504051001 from '../../A05/0405/20/03';

const P01 = () => {
  const { changeData, initData, saveData, submitDataWithResult } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A05040508_store);
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);

  const [isCorrect1, setIsCorrect1] = useState<boolean | undefined>(undefined);
  const [isCorrect2, setIsCorrect2] = useState<boolean | undefined>(undefined);
  const [isCorrect3, setIsCorrect3] = useState<boolean | undefined>(undefined);
  const [isCorrect4, setIsCorrect4] = useState<boolean | undefined>(undefined);

  const pageKey = 'P01';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathCheck',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={MathStar} size='36px' />
        <Box vAlign='center'>
          알맞은 길이의 단위를 골라&nbsp;
          <Symbol type='correct' />표 하세요.
        </Box>
      </>
    ),
    mark: cardData.P01.isSubmitted ? (cardData.P01.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: [
            ['', ''],
            ['', ''],
            ['', ''],
            ['', ''],
          ],
          isCorrect: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P01: {
            ...prev.P01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.P01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (rowIndex: number, colIndex: number) => {
    if (cardData.P01.isSubmitted) return;
    const newAnswers = cardData.P01.answer.map(row => [...row]);
    if (colIndex === 0 && newAnswers[rowIndex][colIndex + 1]) {
      newAnswers[rowIndex][colIndex + 1] = !cardData.P01.answer[rowIndex][colIndex + 1];
    } else if (colIndex === 1 && newAnswers[rowIndex][colIndex - 1]) {
      newAnswers[rowIndex][colIndex - 1] = !cardData.P01.answer[rowIndex][colIndex - 1];
    }
    newAnswers[rowIndex][colIndex] = !cardData.P01.answer[rowIndex][colIndex];
    setCardData(prevData => ({
      ...prevData,
      P01: {
        ...prevData.P01,
        answer: newAnswers,
      },
    }));
    changeData(pageKey, 1, 1, newAnswers);
  };

  const checkCorrect = () => {
    if (cardData.P01.answer[0][1]) {
      setIsCorrect1(true);
    }
    if (cardData.P01.answer[1][0]) {
      setIsCorrect2(true);
    }
    if (cardData.P01.answer[2][0]) {
      setIsCorrect3(true);
    }
    if (cardData.P01.answer[3][1]) {
      setIsCorrect4(true);
    }
  };

  const handleSubmit = async () => {
    if (!cardData.P01.isSubmitted) {
      checkCorrect();
      const isCorrect = cardData.P01.answer.map((row, i) => row.map((col, j) => col === cardData.P01.solution[i][j]).every(Boolean)).every(Boolean);
      setCardData(prev => ({ ...prev, P01: { ...prev.P01, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.P01.answer,
              isCorrect: cardData.P01.isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageKey, userSubmission, isCorrect);
    } else {
      setIsAnswerOpen(!isAnswerOpen);
    }
  };

  const getButtonColor = () => {
    if (!cardData?.P01.isSubmitted) {
      return !(
        (cardData.P01.answer[0][0] || cardData.P01.answer[0][1]) &&
        (cardData.P01.answer[1][0] || cardData.P01.answer[1][1]) &&
        (cardData.P01.answer[2][0] || cardData.P01.answer[2][1]) &&
        (cardData.P01.answer[3][0] || cardData.P01.answer[3][1])
      )
        ? EStyleButtonTypes.SECONDARY
        : EStyleButtonTypes.YELLOW;
    } else {
      return isAnswerOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW;
    }
  };

  const getSubmitLabel = () => (cardData.P01.isSubmitted ? (isAnswerOpen ? '답안 닫기' : '답안 보기') : '채점하기');
  const isSubmitDisabled = () =>
    !(
      (cardData.P01.answer[0][0] || cardData.P01.answer[0][1]) &&
      (cardData.P01.answer[1][0] || cardData.P01.answer[1][1]) &&
      (cardData.P01.answer[2][0] || cardData.P01.answer[2][1]) &&
      (cardData.P01.answer[3][0] || cardData.P01.answer[3][1])
    ) && !cardData.P01.isSubmitted;

  useEffect(() => {
    return () => {
      saveData(pageKey);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    checkCorrect();
  }, [cardData.P01.answer]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      onSubmit={handleSubmit}
      submitLabel={getSubmitLabel()}
      submitBtnColor={getButtonColor()}
      submitDisabled={isSubmitDisabled()}
      {...(cardData.P01.isSubmitted && {
        linkLabel: '맞춤 학습하기',
        useLinkLabel: true,
        onLink: () => {
          setIsModalShow(!isModalShow);
        },
      })}
    >
      <Scroll tabIndex={0}>
        <Box marginTop={'10px'}>
          <Box display='flex' flexDirection='row'>
            {cardData.P01.isSubmitted && !isCorrect1 ? (
              <Typography>
                필통의 길이는 약 23 ( <StyleButton2>mm</StyleButton2>
                {' , '}
                cm )입니다.
              </Typography>
            ) : (
              <Typography>
                필통의 길이는 약 23 ({' '}
                <StyleButton
                  onClick={() => handleChange(0, 0)}
                  isClicked={cardData.P01.answer[0][0]}
                  title={cardData.P01.answer[0][0] ? '선택함' : '선택 해제'}
                >
                  mm
                </StyleButton>
                {' , '}
                <StyleButton
                  onClick={() => handleChange(0, 1)}
                  isClicked={cardData.P01.answer[0][1]}
                  title={cardData.P01.answer[0][1] ? '선택함' : '선택 해제'}
                >
                  cm
                </StyleButton>{' '}
                )입니다.
              </Typography>
            )}

            {cardData.P01.isSubmitted && !isCorrect2 ? (
              <Typography>
                개미의 길이는 약 7 ( mm , <StyleButton2>cm</StyleButton2> )입니다.
              </Typography>
            ) : (
              <Typography>
                개미의 길이는 약 7 ({' '}
                <StyleButton
                  onClick={() => handleChange(1, 0)}
                  isClicked={cardData.P01.answer[1][0]}
                  title={cardData.P01.answer[1][0] ? '선택함' : '선택 해제'}
                >
                  mm
                </StyleButton>{' '}
                ,{' '}
                <StyleButton
                  onClick={() => handleChange(1, 1)}
                  isClicked={cardData.P01.answer[1][1]}
                  title={cardData.P01.answer[1][1] ? '선택함' : '선택 해제'}
                >
                  cm{' '}
                </StyleButton>
                )입니다.
              </Typography>
            )}
          </Box>
          <Box display='flex' flexDirection='row'>
            {cardData.P01.isSubmitted && !isCorrect3 ? (
              <Typography>
                교실 문의 높이는 약 2 ( m , <StyleButton2>mm</StyleButton2> )입니다.
              </Typography>
            ) : (
              <Typography>
                교실 문의 높이는 약 2 (
                <StyleButton
                  onClick={() => handleChange(2, 0)}
                  isClicked={cardData.P01.answer[2][0]}
                  title={cardData.P01.answer[2][0] ? '선택함' : '선택 해제'}
                >
                  m
                </StyleButton>
                ,{' '}
                <StyleButton
                  onClick={() => handleChange(2, 1)}
                  isClicked={cardData.P01.answer[2][1]}
                  title={cardData.P01.answer[2][1] ? '선택함' : '선택 해제'}
                >
                  mm
                </StyleButton>{' '}
                )입니다.
              </Typography>
            )}

            {cardData.P01.isSubmitted && !isCorrect4 ? (
              <Typography>
                한라산의 높이는 약 2 (<StyleButton2>m </StyleButton2>, km )입니다.
              </Typography>
            ) : (
              <Typography>
                한라산의 높이는 약 2 (
                <StyleButton
                  onClick={() => handleChange(3, 0)}
                  isClicked={cardData.P01.answer[3][0]}
                  title={cardData.P01.answer[3][0] ? '선택함' : '선택 해제'}
                >
                  m
                </StyleButton>
                ,{' '}
                <StyleButton
                  onClick={() => handleChange(3, 1)}
                  isClicked={cardData.P01.answer[3][1]}
                  title={cardData.P01.answer[3][1] ? '선택함' : '선택 해제'}
                >
                  km{' '}
                </StyleButton>
                )입니다.
              </Typography>
            )}
          </Box>
        </Box>
      </Scroll>

      <BottomSheet bottomSheetTargetId='targetContainer' show={isAnswerOpen} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='-30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' marginBottom='22px'>
            <Typography>cm, mm, m, km</Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='10px'>
            <Typography>
              <p>필통의 길이는 약 23 cm입니다.</p>
              <p>개미의 길이는 약 7 mm입니다.</p>
              <p>교실 문의 높이는 약 2 m입니다.</p>
              <p>한라산의 높이는 약 2 km입니다.</p>
            </Typography>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog
        isShow={isModalShow}
        useHeader
        width={981}
        height={572}
        onClose={() => {
          setIsModalShow(false);
        }}
        onConfirm={() => {
          setIsModalShow(false);
        }}
      >
        {/* 맞춤 학습 콘텐츠 카드 미개발, 추후 개발 후 주석 해제  */}
        {/* {cardData.P01.isCorrect ? (
          <>
            <AEM310504051001 />
            <AEM310504051002 />
            <AEM310504051003 />
          </>
        ) : (
          <>
            <AEM310504052001 />
            <AEM310504052002 />
            <AEM310504052003 />
          </>
        )} */}
      </Dialog>
    </Container>
  );
};

const StyleButton = styled.button<{ isClicked: boolean }>`
  position: relative;
  width: 52px;
  height: 40px;
  ${({ isClicked }) =>
    isClicked &&
    `
      &::before {
        content: '';
        position: absolute;
        display: block;
        width: 84px;
        height: 84px;
        top: -16px;
        left: -18px;
        background: url(${icCorrect}) ;
        background-size: contain;
      }
    `}
`;

const StyleButton2 = styled.button<{}>`
  position: relative;
  width: 52px;
  height: 40px;

  &::before {
    content: '';
    position: absolute;
    display: block;
    width: 84px;
    height: 84px;
    top: -16px;
    left: -18px;
    background: url(${inCorrect});
    background-size: contain;
  }
`;

export default P01;
