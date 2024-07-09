import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ESvgType,
  ETagLine,
  IQuestionProps,
  Image,
  Label,
  List,
  SvgIcon,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import oIcon from '@/assets/example/EM-019-01/o_icon.png';
import redOIcon from '@/assets/example/EM-019-01/red_o_icon.svg';
import { A04000104_store } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A04000104_store);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        그림이 나타내는 것에 모두 ○표 하세요.
      </>
    ),
    mark: cardData.P02.isSubmitted ? (cardData.P02.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'BOOLEAN',
          value: false,
          isCorrect: false,
        },
        {
          subKey: 2,
          type: 'BOOLEAN',
          value: false,
          isCorrect: false,
        },
        {
          subKey: 3,
          type: 'BOOLEAN',
          value: false,
          isCorrect: false,
        },
      ],
    },
  ];

  const onGrade = () => {
    if (cardData.P02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.P02.answer1 === cardData.P02.solution1;
      const isCorrect2 = cardData.P02.answer2 === cardData.P02.solution2;
      const isCorrect3 = cardData.P02.answer3 === cardData.P02.solution3;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
      setCardData(prev => ({ ...prev, P02: { ...prev.P02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'BOOLEAN',
              value: cardData.P02.answer1,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'BOOLEAN',
              value: cardData.P02.answer2,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'BOOLEAN',
              value: cardData.P02.answer3,
              isCorrect: isCorrect3,
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
          P02: {
            ...prev.P02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.P02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.P02.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.P02.answer3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleClick = (index: number) => {
    if (cardData.P02.isSubmitted) return;
    if (index === 1) {
      setCardData(prev => ({ ...prev, P02: { ...prev.P02, answer1: !cardData.P02.answer1 } }));
    } else if (index === 2) {
      setCardData(prev => ({ ...prev, P02: { ...prev.P02, answer2: !cardData.P02.answer2 } }));
    } else if (index === 3) {
      setCardData(prev => ({ ...prev, P02: { ...prev.P02, answer3: !cardData.P02.answer3 } }));
    }
    changeData('P02', 1, index, !cardData.P02[`answer${index}`]);
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

  const isChecked = () => {
    if (cardData.P02.answer1 || cardData.P02.answer2 || cardData.P02.answer3) {
      return true;
    }
    return false;
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.P02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!isChecked()}
      submitBtnColor={!isChecked() ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={onGrade}
      useRound
    >
      <Box useFull display='flex'>
        <Box width={'50%'} vAlign={'flex-start'} hAlign={'center'}>
          <Image src={'/A04/0001/04/MC31411.png'} alt='열매가 2개씩 달린 체리가 5개 있습니다.' width={'250px'} height={'150px'} />
        </Box>
        <Box width={'50%'}>
          <List
            gap={24}
            data={['2씩 5묶음', '3 x 5', '2의 5배']}
            row={({ value, index = 1 }) => (
              <Box vAlign='center' justifyContent='center' key={index}>
                <Box
                  background={
                    cardData.P02.isSubmitted ? (cardData.P02[`answer${index}`] === cardData.P02[`solution${index}`] ? 'yellow' : 'red') : 'yellow'
                  }
                  padding='16px 24px'
                  useRound
                  marginRight='24px'
                  textAlign='center'
                  width={'200px'}
                >
                  <Typography>{value}</Typography>
                </Box>
                <Box vAlign='center'>
                  <Typography>(</Typography>
                  <CircleCheck type='button' onClick={() => handleClick(index)}>
                    {cardData.P02[`answer${index}`] && (
                      <SvgIcon
                        type={ESvgType.IMG}
                        size='27px'
                        src={
                          cardData.P02.isSubmitted ? (cardData.P02[`answer${index}`] === cardData.P02[`solution${index}`] ? oIcon : redOIcon) : oIcon
                        }
                        alt='O 아이콘'
                      />
                    )}
                  </CircleCheck>
                  <Typography>)</Typography>
                </Box>
              </Box>
            )}
          />
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='-30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' marginBottom='22px'>
            <Typography>
              <p>( ○ )</p>
              <p>( &nbsp; &nbsp; )</p>
              <p>( ○ )</p>
            </Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='10px'>
            <Typography>
              <p>체리가 2개씩 5묶음 있습니다.</p>
              <p> 2씩 5묶음을 2의 5배라고 할 수 있습니다.</p>
              <p>2씩 5묶음, 2의 5배를 곱셈으로 나타내면 2×5입니다.</p>
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const CircleCheck = styled.button`
  width: 140px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default P02;
