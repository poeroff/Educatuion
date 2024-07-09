import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
  Image,
  OverlayTooltip,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import { isAnswer, isNumber } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A04_0002_04 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';

import fox from '@/assets/example/EM-008/fox.png';

const P02 = () => {
  const [isShow, setShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A04_0002_04);
  const { userId } = useRecoilValue(studentAtom);
  const answer = '8, 80';
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '폐건전지 수 구하기',
  };
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign={'center'}>
        <Label value='ㄴ' type='paint' background='var(--color-grey-600)' color='var(--color-white)' />
        <Typography>수 모형으로 모은 폐건전지 수를 알아보세요.</Typography>
      </Box>
    ),
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
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
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShow(show => !show);
    } else {
      const isCorrect1 = isAnswer(cardData.p02.answer1, cardData.p02.solution1) && cardData.p02.answer1 !== cardData.p02.answer2;
      const isCorrect2 = isAnswer(cardData.p02.answer2, cardData.p02.solution2) && cardData.p02.answer2 !== cardData.p02.answer1;
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
  const handleChange = (subKey: number, value: string) => {
    if (!isNumber(value)) {
      return;
    }
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
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
  return (
    <Container
      bodyId='targetContainer'
      background='var(--color-white)'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={!(cardData.p02.answer1 && cardData.p02.answer2)}
      submitBtnColor={
        !(cardData.p02.answer1 && cardData.p02.answer2) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW
      }
      vAlign='flex-start'
      useRound
      useExtend
    >
      <Box useFull justifyContent='end'>
        <Box marginLeft={'248px'}>
          <Image
            src={'/A04/0002/04/MC31401-1.png'}
            alt='왼쪽부터 십의 모형, 일의 모형이 있고 십의 모형은 한 줄당 2개씩 4개의 줄이 있고, 일의 모형은 한 줄당 20개씩 4개의 줄이 있습니다.'
            width='480px'
            height='300px'
          />
        </Box>
        <BoySpeak>
          <OverlayTooltip type='cloud' place='top'>
            십 모형의 개수로
            <br />
            생각하면
            <br />
            2×4＝
            <Input
              inputSize='x-small'
              width='48px'
              readOnly={cardData.p02.isSubmitted}
              maxLength={3}
              value={cardData.p02.answer1}
              status={
                !cardData.p02.isSubmitted
                  ? cardData.p02.answer1.trim() === ''
                    ? InputStatus.DEFAULT
                    : InputStatus.ENABLE
                  : cardData.p02.answer1.trim() === ''
                  ? InputStatus.ENABLE
                  : cardData.p02.answer1.trim() !== cardData.p02.solution1
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              ariaLabel='2 곱하기 4의 답을 입력하세요.'
              onChange={e => handleChange(1, e.target.value)}
            />
            이에요.
          </OverlayTooltip>
        </BoySpeak>
        <GirlSpeak>
          <OverlayTooltip type='cloud' place='top'>
            일 모형의 개수로
            <br />
            생각하면
            <br />
            20×4＝
            <Input
              inputSize='x-small'
              width='80px'
              readOnly={cardData.p02.isSubmitted}
              maxLength={3}
              value={cardData.p02.answer2}
              status={
                !cardData.p02.isSubmitted
                  ? cardData.p02.answer2.trim() === ''
                    ? InputStatus.DEFAULT
                    : InputStatus.ENABLE
                  : cardData.p02.answer2.trim() === ''
                  ? InputStatus.ENABLE
                  : cardData.p02.answer2.trim() !== cardData.p02.solution2
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              ariaLabel='20 곱하기 4의 답을 입력하세요.'
              onChange={e => handleChange(2, e.target.value)}
            />
            이에요.
          </OverlayTooltip>
        </GirlSpeak>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{answer}</Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>십 모형의 개수로 생각하면 2개씩 4묶음이므로 2×4=8(개)입니다.</Box>
          <Box marginTop='12px'>십 모형 한 개는 일 모형 10개와 같으므로 80개입니다.</Box>
          <Box marginTop='12px'>일 모형의 개수로 생각하면 20개씩 4묶음이므로 20×4=80(개)입니다.</Box>
          <Box marginTop='12px'>일 모형은 모두 80개입니다.</Box>
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
  height: 231px;
  width: 198px;
  background: url(${fox}) bottom center no-repeat;
`;
const GirlSpeak = styled.span`
  position: absolute;
  top: 35px;
  right: 115px;
  display: block;
  height: 231px;
  width: 149px;
  background: url(${fox}) bottom right no-repeat;
`;
export default P02;
