import { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  Label,
  OverlayTooltip,
  Input,
  IQuestionProps,
  Typography,
  EStyleButtonTypes,
  InputStatus,
  BottomSheet,
  ETagLine,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import otter from '@/assets/example/otter_41.png';
import { A03_0005_05 } from './store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A03_0005_05);
  const { userId } = useRecoilValue(studentAtom);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isShow, setIsShow] = useState(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '나눗셈의 몫을 곱셈식으로 구하기',
  };
  const submitBtnColor = cardData.p01.isSubmitted
    ? isShow
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.YELLOW
    : cardData.p01.answer1 !== '' && cardData.p01.answer2 !== ''
    ? EStyleButtonTypes.YELLOW
    : EStyleButtonTypes.SECONDARY;
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' type='paint' background='#969590' color='var(--color-white)' />
        32 ÷ 4의 몫을 구할 수 있는 곱셈식을 써 보세요.
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
      onSubmit={() => {
        handleSubmit();
      }}
      vAlign='flex-start'
      useRound
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' useRound padding='20px 44px'>
          <Typography>4×</Typography>
          <Input type='number'
            width='122px'
            ariaLabel='곱셈식의 두번째 값을 입력하세요'
            readOnly={cardData.p01.isSubmitted}
            value={cardData.p01.answer1}
            onChange={e => handleInputChangeEvent(1, e)}
            status={
              !cardData.p01.isSubmitted
                ? cardData.p01.answer1.trim() === ''
                  ? InputStatus.DEFAULT
                  : InputStatus.ENABLE
                : cardData.p01.answer1.trim() === ''
                ? InputStatus.ENABLE
                : cardData.p01.answer1.trim() !== cardData.p01.solution1
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            maxLength={3}
          />
          <Typography>=</Typography>
          <Input type='number'
            width='122px'
            ariaLabel='곱셈식을 계산한 값을 입력하세요'
            readOnly={cardData.p01.isSubmitted}
            value={cardData.p01.answer2}
            onChange={e => handleInputChangeEvent(2, e)}
            status={
              !cardData.p01.isSubmitted
                ? cardData.p01.answer2.trim() === ''
                  ? InputStatus.DEFAULT
                  : InputStatus.ENABLE
                : cardData.p01.answer2.trim() === ''
                ? InputStatus.ENABLE
                : cardData.p01.answer2.trim() !== cardData.p01.solution2
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            maxLength={3}
          />
        </Box>

        <OtterSpeak>
          <Box useFull display='flex' justifyContent='flex-end' alignItems='flex-start'>
            <OverlayTooltip type='cloud' place='right' isShow>
              4와 곱해서 <br /> 32가 되어야 <br /> 하니까........
            </OverlayTooltip>
          </Box>
        </OtterSpeak>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow} closeOption={{ useYn: true, onClose: () => setIsShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='100px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px'>8,32</Box>
          <Box marginTop={32}>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>4×8=32입니다.</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const OtterSpeak = styled.div`
  position: absolute;
  top: 50px;
  right: 40px;

  display: block;
  background: url(${otter}) bottom left no-repeat;
  background-size: 142px 156px;

  width: 266px;
  height: 167px;
`;

export default P01;
