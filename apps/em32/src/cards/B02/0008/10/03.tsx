import usePageData from '@/hooks/usePageData';
import styled from '@emotion/styled';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  EStyleFontSizes,
  Tag,
  Typography,
  Image,
  EImageType,
  Symbol,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';
import { B02_0008_10 } from './store';

const P03 = ({ _page = 'P03' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(B02_0008_10);
  const { userId } = useRecoilValue(studentAtom);
  const [showAnswer, setShowAnswer] = useState(false);
  const pageIds = useRecoilValue(pageIdsAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={2} />
        현오가 박물관에서 본 목걸이를 떠올리며 규칙에 따라 원을 점점 크게 그리려고 합니다. 네 번째에 그릴 원의 반지름을 구해 보세요.
      </>
    ),
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
        },
        {
          subKey: 2,
          type: 'NUMBER',
          value: 0,
        },
        {
          subKey: 3,
          type: 'NUMBER',
          value: 0,
        },
      ],
    },
  ];

  const onSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setShowAnswer(prev => !prev);
      return;
    }

    const isCorrect: boolean =
      isAnswer(cardData.p03.answer1.value, cardData.p03.solution1) &&
      isAnswer(cardData.p03.answer2.value, cardData.p03.solution2) &&
      isAnswer(cardData.p03.answer3.value, cardData.p03.solution3);

    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        answer1: {
          value: cardData.p03.answer1.value,
        },
        answer2: {
          value: cardData.p03.answer2.value,
        },
        answer3: {
          value: cardData.p03.answer3.value,
        },
        isCorrect: isCorrect,
        isSubmitted: true,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p03.answer1.value,
          },
          {
            subKey: 2,
            type: 'NUMBER',
            value: cardData.p03.answer2.value,
          },
          {
            subKey: 3,
            type: 'NUMBER',
            value: cardData.p03.answer3.value,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(_page, userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer1: {
              value: userSubmissionList[0].inputData[0]?.value || '',
            },
            answer2: {
              value: userSubmissionList[0].inputData[1]?.value || '',
            },
            answer3: {
              value: userSubmissionList[0].inputData[2]?.value || '',
            },
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (index: Number, value: string) => {
    if (index === 0) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: { ...prev.p03.answer1, value: value } } }));
      changeData(_page, 1, 1, value);
    } else if (index === 1) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: { ...prev.p03.answer2, value: value } } }));
      changeData(_page, 1, 2, value);
    } else {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer3: { ...prev.p03.answer3, value: value } } }));
      changeData(_page, 1, 3, value);
    }
  };

  useEffect(() => {
    return () => {
      saveData(_page);
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
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      vAlign='start'
      submitLabel={cardData.p03.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={onSubmit}
      submitDisabled={!(cardData.p03.answer1.value && cardData.p03.answer2.value && cardData.p03.answer3.value)}
      submitBtnColor={
        !(cardData.p03.answer1.value && cardData.p03.answer2.value && cardData.p03.answer3.value)
          ? EStyleButtonTypes.SECONDARY
          : showAnswer
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
    >
      <Box display='flex'>
        <Box height={'72px'} display='flex' alignItems='center'>
          <Label value='ㄴ' lineColor='none' background='#969590' color='var(--color-white)' />
        </Box>
        <Box marginTop={'10px'}>
          <Typography size={EStyleFontSizes.MEDIUM}>
            반지름을 살펴보며 &nbsp;
            <Symbol type='blank' blankType='square' size={48} />
            &nbsp; 안에 알맞은 수를 써넣으세요.
          </Typography>
        </Box>
      </Box>

      <BoxWrap>
        <Box useFull useRound padding='20px'>
          <BoxWrap justifyContent='center'>
            <Box>
              <Box width='120px' height='60px'>
                <TextWrapper backroundcolor='var(--color-green-100)' borderColor='var(--color-green-700)'>
                  두 번째 원
                </TextWrapper>
              </Box>
              <Image type={EImageType.IMG_BG} src={'/B02/0008/10/B-EM32-02-0008-1002(2).png'} alt={''} width={'108px'} height={'126px'} />
              <Box display='flex'>
                <Input value={String(10)} width={'65px'} disabled={true} readOnly />
                <Typography>cm</Typography>
              </Box>
              <Box display='flex' marginTop={'85px'}>
                <LabelWrapper2>
                  <Label
                    value='반지름'
                    color='var(--color-yellow-800)'
                    background='var(--color-yellow-100)'
                    lineColor='var(--color-yellow-700)'
                    fontSize={22}
                    marginRight={0}
                  />
                </LabelWrapper2>
              </Box>
              <Box display='flex'>
                <Input
                  type='number'
                  width={'65px'}
                  value={String(cardData.p03.answer1.value)}
                  onChange={e => handleInputChange(0, e.target.value)}
                  status={
                    !cardData.p03.answer1.value
                      ? InputStatus.DEFAULT
                      : cardData.p03.isSubmitted && !cardData.p03.isCorrect
                      ? InputStatus.ERROR
                      : InputStatus.ENABLE
                  }
                  ariaLabel={`두번째 원 반지름`}
                  readOnly={cardData.p03.isSubmitted}
                />
                <Typography>cm</Typography>
              </Box>
            </Box>
            <Box width='0.5px' type='dashed' borderColor='var(--color-green-300)' useRound></Box>
            <Box marginLeft={'30px'}>
              <Box width='120px' height='60px'>
                <TextWrapper backroundcolor='var(--color-green-100)' borderColor='var(--color-green-700)'>
                  세 번째 원
                </TextWrapper>
              </Box>
              <Image type={EImageType.IMG_BG} src={'/B02/0008/10/B-EM32-02-0008-1003(2).png'} alt={''} width={'250px'} height={'250px'} />
              <Box display='flex' position='absolute' bottom='-20px' left='584px'>
                <Input value={String(20)} width={'65px'} disabled={true} readOnly />
                <Typography>cm</Typography>
              </Box>
              <Box display='flex' marginTop={'8px'}>
                <LabelWrapper2>
                  <Label
                    value='반지름'
                    color='var(--color-yellow-800)'
                    background='var(--color-yellow-100)'
                    lineColor='var(--color-yellow-700)'
                    fontSize={22}
                    marginRight={0}
                  />
                </LabelWrapper2>
              </Box>
              <Box display='flex' vAlign='center' hAlign='center'>
                <Input
                  type='number'
                  width={'65px'}
                  value={String(cardData.p03.answer2.value)}
                  onChange={e => handleInputChange(1, e.target.value)}
                  status={
                    !cardData.p03.answer2.value
                      ? InputStatus.DEFAULT
                      : cardData.p03.isSubmitted && !cardData.p03.isCorrect
                      ? InputStatus.ERROR
                      : InputStatus.ENABLE
                  }
                  ariaLabel={`첫번째 원 지름 값`}
                  readOnly={cardData.p03.isSubmitted}
                />
                <Typography> X 2 = </Typography>
                <Input
                  type='number'
                  width={'65px'}
                  value={String(cardData.p03.answer3.value)}
                  onChange={e => handleInputChange(2, e.target.value)}
                  status={
                    !cardData.p03.answer3.value
                      ? InputStatus.DEFAULT
                      : cardData.p03.isSubmitted && !cardData.p03.isCorrect
                      ? InputStatus.ERROR
                      : InputStatus.ENABLE
                  }
                  ariaLabel={`두번째 원 반지름`}
                  readOnly={cardData.p03.isSubmitted}
                />
                <Typography> {'(cm)'} </Typography>
              </Box>
            </Box>
          </BoxWrap>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' gap='8px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography> 10, 10, 20 </Typography>
          </Box>
          <Box marginTop='12px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography>두 번째 원의 반지름은 10 cm이고, 세 번째 원의 반지름은 두 번째 원의 지름이므로 10×2=20 (cm)입니다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const TextWrapper = styled.div<{ backroundcolor: string; borderColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 44px;
  padding: 0 19px;

  border-radius: 22px;
  border: 1px solid ${({ borderColor }) => borderColor};
  background-color: ${({ backroundcolor }) => backroundcolor};

  white-space: nowrap;
  font-size: 22px;
  line-height: 33px;
  color: var(--color-yellow-800);
`;

const LabelWrapper2 = styled.div`
  display: flex;
  align-items: center;
  margin: 7px 10px 7px 0px;
  & > span {
    padding-inline: 14px;
  }
`;
export default P03;
