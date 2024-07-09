import { ChangeEvent, useEffect, useState } from 'react';
import {
  Image,
  Box,
  TMainHeaderInfoTypes,
  Label,
  OverlayTooltip,
  Input,
  IQuestionProps,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { A03_0005_04 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A03_0005_04);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '나눗셈의 몫을 곱셈구구로 구하기',
  };
  const submitBtnColor = cardData.p01.isSubmitted
    ? isShow
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.YELLOW
    : cardData.p01.answer !== ''
    ? EStyleButtonTypes.YELLOW
    : EStyleButtonTypes.SECONDARY;
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' type='paint' background='var(--color-grey-600)' color='var(--color-white)' />
        그림을 보고 21÷7의 몫을 구해 보세요.
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const handleInputChangeEvent = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: target.value } }));
    changeData('P01', 1, 1, target.value);
  };
  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
    } else {
      setIsCorrect(cardData.p01.answer.toLowerCase().trim() === cardData.p01.solution);
      setCardData(prev => ({
        ...prev,
        p01: { ...prev.p01, isSubmitted: true, isCorrect: cardData.p01.answer.toLowerCase().trim() === cardData.p01.solution },
      }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer,
              isAnswer: true,
            },
          ],
          isCorrect: cardData.p01.answer.toLowerCase().trim() === cardData.p01.solution,
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
          value: 0,
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
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
      onSubmit={() => {
        handleSubmit();
      }}
      submitDisabled={cardData.p01.answer === ''}
      useRound
      vAlign='start'
      bodyId='targetContainer'
    >
      <Box useFull display='flex' justifyContent='end'>
        <Image src={'/A03/0005/04/MA31304_리터칭.png'} alt='공원에 자전거 21대가 놓여져 있습니다.' width='840px' height='300px' />
        <BoySpeak>
          <OverlayTooltip type='cloud' place='top'>
            직접 묶어서 구해보니 <br />
            21÷7=
            <Input
              type='number'
              inputSize='x-small'
              width='48px'
              readOnly={cardData.p01.isSubmitted}
              maxLength={3}
              value={cardData.p01.answer}
              status={
                !cardData.p01.isSubmitted
                  ? cardData.p01.answer.trim() === ''
                    ? InputStatus.DEFAULT
                    : InputStatus.ENABLE
                  : cardData.p01.answer.trim() === ''
                  ? InputStatus.ENABLE
                  : cardData.p01.answer.trim() !== cardData.p01.solution
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              ariaLabel='21 나누기 7의 답을 입력하세요.'
              onChange={handleInputChangeEvent}
            />
            이에요.
          </OverlayTooltip>
        </BoySpeak>
        <GirlSpeak>
          <OverlayTooltip type='cloud' place='top'>
            곱셈구구를 <br /> 이용하여 구할 <br />수 있을까요?
          </OverlayTooltip>
        </GirlSpeak>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow} closeOption={{ useYn: true, onClose: () => setIsShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px'>3</Box>
          <Box marginTop={32}>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>직접 묶어서 구해 보니 21÷7=3입니다.</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const BoySpeak = styled.span`
  position: absolute;
  top: 40px;
  left: 57px;

  display: block;
  height: 264px;
  width: 198px;
`;

const GirlSpeak = styled.span`
  position: absolute;
  top: 35px;
  right: 55px;

  display: block;
  height: 261px;
  width: 149px;
`;
export default P01;
