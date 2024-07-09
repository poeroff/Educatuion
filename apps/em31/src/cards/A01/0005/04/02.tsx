import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ESvgType,
  ETagLine,
  IQuestionProps,
  Input,
  Label,
  SvgIcon,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import math_x from '@maidt-cntn/assets/icons/checkSymbol_X.svg';
import math_x_icon from '@/assets/icon/math_X_icon.svg';
import figure_100 from '@/assets/example/EM-008/figure_100.svg';
import figure_10 from '@/assets/example/EM-008/figure_10.svg';
import figure_1 from '@/assets/example/EM-008/figure_1.svg';
import selected_figure_100 from '@/assets/example/EM-008/selected_figure_100.svg';
import selected_figure_10 from '@/assets/example/EM-008/selected_figure_10.svg';
import selected_figure_1 from '@/assets/example/EM-008/selected_figure_1.svg';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { A01_0005_04 } from './store';
import { css } from '@emotion/react';

interface IBoxData {
  title: string;
  color: string;
  count: number;
  img: string;
  selectdImg: string;
}

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '더 많은 도움 로봇 수 구하기',
  };

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A01_0005_04);
  const pageNumber = 'P02';
  const pageKey = 'p02';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', ''],
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  const submitAnswer = () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
    }
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData[pageKey].answer,
            isAnswer: true,
          },
        ],
      },
    ];
    submitData(pageNumber, userSubmission);
  };

  const handleChange = (index: number, value: string) => {
    const updatedAnswers = cardData[pageKey].answer.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: updatedAnswers,
      },
    }));
    changeData(pageNumber, 1, 1, updatedAnswers);
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄴ' color='var(--color-white)' background='var(--color-grey-600)' />
        <Box fontWeight='var(--font-weight-medium)'>
          수 모형 244에서 112만큼&nbsp;
          <SvgIcon type={ESvgType.IMG} src={math_x} alt='X' width='32px' height='32px' />표 하고 남은 수 모형이 몇 개인지 알아보세요.
        </Box>
      </>
    ),
  };

  const data: IBoxData[] = [
    { title: '백 모형', color: 'var(--color-green-200)', count: 2, img: figure_100, selectdImg: selected_figure_100 },
    { title: '십 모형', color: 'var(--color-red-200)', count: 4, img: figure_10, selectdImg: selected_figure_10 },
    { title: '일 모형', color: 'var(--color-blue-200)', count: 4, img: figure_1, selectdImg: selected_figure_1 },
  ];

  const [isShow, setShow] = useState<boolean>(false);

  const [showXArray, setShowXArray] = useState(
    data.map(value =>
      Array(value.count)
        .fill(null)
        .map(() => false),
    ),
  );

  const onClickFigure = (colIndex: number, rowIndex: number) => {
    setShowXArray(prev => {
      const currentXArray = prev.map(row => [...row]);
      currentXArray[colIndex][rowIndex] = !currentXArray[colIndex][rowIndex];
      return currentXArray;
    });
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      useRound
      bodyId='targetContainer'
      vAlign='flex-start'
      onSubmit={submitAnswer}
      submitBtnColor={
        !cardData[pageKey].answer.some(val => val === '') ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY
      }
      submitDisabled={!cardData[pageKey].isSubmitted && cardData[pageKey].answer.some(val => val === '')}
    >
      <Box vAlign='center' flexDirection='column'>
        <BoxWrap marginBottom='24px' width='auto'>
          {data.map((value, index) => {
            return (
              <Box key={index} width='210px'>
                <Box type='line' useRound height='160px' padding='8px' hAlign='center' flexDirection={index === 2 ? 'row' : 'column'} gap='4px'>
                  {Array(value.count)
                    .fill(null)
                    .map((_, count) => (
                      <Button
                        key={count}
                        onClick={() => onClickFigure(index, count)}
                        isClick={showXArray[index][count]}
                        index={index}
                        aria-label={
                          showXArray[index][count] ? `선택된 ${count + 1}번째 ${value.title} 한 개` : `${count + 1}번째 ${value.title} 한 개`
                        }
                      >
                        <SvgIcon type={ESvgType.IMG} src={showXArray[index][count] ? value.selectdImg : value.img} alt='' ariaHidden />
                      </Button>
                    ))}
                </Box>

                <Box backgroundColor={value?.color} marginTop='24px' padding='12px 0' textAlign='center' borderRadius='8px'>
                  {value.title}
                </Box>
                <Box
                  background='white'
                  hAlign='center'
                  marginTop='4px'
                  padding='8px 16px'
                  border='1px solid var(--color-grey-400)'
                  borderRadius='8px'
                >
                  <Input
                    type='number'
                    width='52px'
                    value={cardData[pageKey].answer[index]}
                    textAlign='left'
                    readOnly={cardData[pageKey].isSubmitted}
                    onChange={e => handleChange(index, e.target.value)}
                    maxLength={1}
                    ariaLabel={value.title + ' 개수의 답'}
                  />
                  <Typography style={{ paddingRight: 0 }}>개</Typography>
                </Box>
              </Box>
            );
          })}
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='10px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>1, 3, 2</Box>
          <Box marginTop='20px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='12px'>
            <Typography>- 백 모형 2개 중에서 1개에 X표 합니다.</Typography>
            <Typography>- 십 모형 4개 중에서 1개에 X표 합니다.</Typography>
            <Typography>- 일 모형 4개 중에서 2개에 X표 합니다. </Typography>
            <Typography>
              - X표 하고 남은 수 모형은<Typography textDecoration='underline'> 백 모형이 1개, 십 모형이 3개, 일 모형이 2개입니다.</Typography>
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const Button = styled.button<{ isClick: boolean; index: number }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px;

  ${({ isClick }) => isClick && 'outline: 2px solid var(--color-red-700)'};
  ${({ index }) => (index === 2 ? 'border-radius: 4px' : 'border-radius: 8px; width: 100%')};

  ::after {
    ${({ isClick }) => isClick && `content : ''`};

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background: url(${math_x_icon}) center center no-repeat;
    background-size: 100%;
    ${({ index }) => {
      switch (index) {
        case 0:
          return css`
            width: 26px;
            height: 26px;
          `;
        case 1:
          return css`
            width: 20px;
            height: 20px;
          `;
        case 2:
          return css`
            width: 11px;
            height: 11px;
          `;
      }
    }};
  }
`;
export default P02;
