import { ChangeEvent, useEffect, useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
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
  TMainHeaderInfoTypes,
  Tag,
} from '@maidt-cntn/ui';
import styled from '@emotion/styled';
import ConnectorLine from '@/assets/example/connector_line.svg';
import ConnectorArrow from '@/assets/example/connector_arrow.svg';
import { C01_0005_52 } from './store';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01_0005_52);
  const { userId } = useRecoilValue(studentAtom);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isShow, setIsShow] = useState(false);
  const submitBtnColor = cardData.p01.isSubmitted ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.YELLOW;

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        빈칸에 알맞은 수를 써넣으세요.
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const handleInputChangeEvent = (subKey: number, { target }: ChangeEvent<HTMLInputElement>) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: target.value } }));
      changeData('P01', 1, 1, target.value);
    } else {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: target.value } }));
      changeData('P01', 1, 2, target.value);
    }
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
    } else {
      setIsCorrect(
        cardData.p01.answer1.toLowerCase().trim() === cardData.p01.solution1 && cardData.p01.answer2.toLowerCase().trim() === cardData.p01.solution2,
      );
      setCardData(prev => ({
        ...prev,
        p01: {
          ...prev.p01,
          isSubmitted: true,
          isCorrect:
            cardData.p01.answer1.toLowerCase().trim() === cardData.p01.solution1 &&
            cardData.p01.answer2.toLowerCase().trim() === cardData.p01.solution2,
        },
      }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
              isAnswer: true,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
              isAnswer: true,
            },
          ],
          isCorrect:
            cardData.p01.answer1.toLowerCase().trim() === cardData.p01.solution1 &&
            cardData.p01.answer2.toLowerCase().trim() === cardData.p01.solution2,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={cardData.p01.answer1 === '' || cardData.p01.answer2 === ''}
      bodyId='targetContainer'
      onSubmit={() => {
        handleSubmit();
      }}
      useRound
      vAlign='flex-start'
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' hAlign='center' useRound width='636px' height='172px'>
          <BoxWrap display='flex' justifyContent='center' boxGap={0} marginTop='65px'>
            <Box width='130px' height='52px' hAlign='center' borderRadius='8px' background='var(--color-yellow-300)'>
              867
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>- 124</GrayRoundBox>
            </Box>
            <Box>
              <Input
                width='130px'
                ariaLabel='1번답 입력란'
                readOnly={cardData.p01.isSubmitted}
                value={cardData.p01.answer1}
                onChange={e => handleInputChangeEvent(1, e)}
                status={
                  !cardData.p01.isSubmitted
                    ? cardData.p01.answer1.trim() === ""
                      ? InputStatus.DEFAULT
                      : InputStatus.ENABLE
                    : cardData.p01.answer1.trim() === ""
                    ? InputStatus.ENABLE
                    : cardData.p01.answer1.trim() !== cardData.p01.solution1
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                maxLength={3}
              />
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>- 431</GrayRoundBox>
            </Box>
            <Box>
              <Input
                width='130px'
                ariaLabel='2번답 입력란'
                readOnly={cardData.p01.isSubmitted}
                value={cardData.p01.answer2}
                onChange={e => handleInputChangeEvent(2, e)}
                status={
                  !cardData.p01.isSubmitted
                    ? cardData.p01.answer1.trim() === ""
                      ? InputStatus.DEFAULT
                      : InputStatus.ENABLE
                    : cardData.p01.answer2.trim() === ""
                    ? InputStatus.ENABLE
                    : cardData.p01.answer2.trim() !== cardData.p01.solution2
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                maxLength={3}
              />
            </Box>
          </BoxWrap>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow} closeOption={{ useYn: true, onClose: () => setIsShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px'>743, 312</Box>
          <Box>
            <br />
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>867 - 124 = 743, 743 - 431 = 312</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const GrayRoundBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-grey-100);
  min-width: 120px;
  height: 52px;
  padding: 4px 12px;
  border-radius: 80px;
  margin-top: -140px;

  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    left: -30px;
    top: 50%;
    width: 26px;
    height: 42px;
    background: url(${`"${ConnectorLine}"`}) no-repeat;
    background-size: contain;
  }

  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    right: -40px;
    top: 50%;
    width: 35px;
    height: 46px;
    background: url(${`"${ConnectorArrow}"`}) no-repeat;
    background-size: contain;
  }
`;

export default P01;