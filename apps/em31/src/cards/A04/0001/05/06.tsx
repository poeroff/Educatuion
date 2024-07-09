import styled from '@emotion/styled';
import headerIcon from '@/assets/icon/m_default_01.svg';
import {
  TMainHeaderInfoTypes,
  Box,
  ConnectLine,
  BottomSheet,
  IQuestionProps,
  Tag,
  ETagLine,
  SvgIcon,
  EStyleButtonTypes,
  EStyleSizes,
  Question,
} from '@maidt-cntn/ui';
import { DialogContainer } from '@maidt-cntn/ui/math';

import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { A04000105_store } from './store';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P06 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A04000105_store);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathTween',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        관계있는 것끼리 이어 보세요.
      </>
    ),
    mark: getMarking(cardData.P06.isSubmitted, cardData.P06.isCorrect),
  };

  const setConnectLines = () => {
    return [
      {
        from: { sideId: 'left', itemId: cardData.P06.answer1 === '' ? '-1' : '1' },
        to: { sideId: 'right', itemId: cardData.P06.answer1 },
      },
      {
        from: { sideId: 'left', itemId: cardData.P06.answer2 === '' ? '-1' : '2' },
        to: { sideId: 'right', itemId: cardData.P06.answer2 },
      },
      {
        from: { sideId: 'left', itemId: cardData.P06.answer3 === '' ? '-1' : '3' },
        to: { sideId: 'right', itemId: cardData.P06.answer3 },
      },
    ];
  };

  const setAnswerConnectLines = () => {
    return [
      {
        from: { sideId: 'ans_left', itemId: '1' },
        to: { sideId: 'ans_right', itemId: cardData.P06.solution1 },
      },
      {
        from: { sideId: 'ans_left', itemId: '2' },
        to: { sideId: 'ans_right', itemId: cardData.P06.solution2 },
      },
      {
        from: { sideId: 'ans_left', itemId: '3' },
        to: { sideId: 'ans_right', itemId: cardData.P06.solution3 },
      },
    ];
  };

  const handleConnection = (index: string, val: string) => {
    setCardData(prev => ({ ...prev, P06: { ...prev.P06, [`answer${index}`]: val } }));
    changeData('P06', 1, Number(index), val);
  };

  const setSubmitBtnColor = () => {
    if (cardData.P06.answer1 !== '' && cardData.P06.answer2 !== '' && cardData.P06.answer3 !== '') {
      if (isShow && cardData.P06.isSubmitted) {
        return EStyleButtonTypes.GRAY;
      } else {
        return EStyleButtonTypes.YELLOW;
      }
    } else {
      return EStyleButtonTypes.SECONDARY;
    }
  };

  const setSubmitDisabled = () => {
    if (cardData.P06.answer1 !== '' && cardData.P06.answer2 !== '' && cardData.P06.answer3 !== '') return false;
    else return true;
  };

  const handleShowAnswer = () => {
    setShow(!isShow);
  };

  const handleSubmit = () => {
    const isCorrect1 = cardData.P06.answer1 === cardData.P06.solution1;
    const isCorrect2 = cardData.P06.answer2 === cardData.P06.solution2;
    const isCorrect3 = cardData.P06.answer3 === cardData.P06.solution3;
    const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;

    setCardData(prev => ({ ...prev, P06: { ...prev.P06, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.P06.answer1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.P06.answer2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.P06.answer3,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult('P06', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P06')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P06: {
            ...prev.P06,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.P06.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.P06.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.P06.answer3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P06', userSubmissionList, defaultSubmission, isSubmitted);
      console.log(cardData.P06);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P06');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <DialogContainer
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.P06.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={cardData.P06.isSubmitted ? handleShowAnswer : handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={setSubmitDisabled()}
    >
      <Box useFull marginTop='24px'>
        <ConnectLine
          direction={'vertical'}
          onConnect={p => {
            p.from.sideId === 'left' ? handleConnection(p.from.itemId, p.to.itemId) : handleConnection(p.to.itemId, p.from.itemId);
          }}
          onDisConnect={p => {
            p.from.sideId === 'left' ? handleConnection(p.from.itemId, '') : handleConnection(p.to.itemId, '');
          }}
          connectLines={setConnectLines()}
          disabled={cardData.P06.isSubmitted}
          useFull
          useItemFull
        >
          <ConnectLineSide sideId='left' bgColor='var(--color-green-100)'>
            <ConnectLineItem
              width='280px'
              content={<>4+4+4+4+4</>}
              itemId='1'
              isError={cardData.P06.isSubmitted && !isAnswer(cardData.P06.answer1, cardData.P06.solution1)}
            />
            <ConnectLineItem
              width='280px'
              content={<>5+5+5</>}
              itemId='2'
              isError={cardData.P06.isSubmitted && !isAnswer(cardData.P06.answer2, cardData.P06.solution2)}
            />
            <ConnectLineItem
              width='280px'
              content={<>3+3+3+3</>}
              itemId='3'
              isError={cardData.P06.isSubmitted && !isAnswer(cardData.P06.answer3, cardData.P06.solution3)}
            />
          </ConnectLineSide>

          <ConnectLineSide sideId='right' bgColor='var(--color-yellow-100)'>
            <ConnectLineItem width='150px' content={<>5×3</>} itemId='5×3' />
            <ConnectLineItem width='150px' content={<>4×5</>} itemId='4×5' />
            <ConnectLineItem width='150px' content={<>3×4</>} itemId='3×4' />
          </ConnectLineSide>
        </ConnectLine>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='40%'>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box marginTop='12px'>
              <ConnectLine direction={'vertical'} connectLines={setAnswerConnectLines()} disabled={true}>
                <ConnectLineSide sideId='ans_left' bgColor='var(--color-green-100)'>
                  <ConnectLineItem width='180px' height='70px' content={<>4+4+4+4+4</>} itemId='1' />
                  <ConnectLineItem width='180px' height='70px' content={<>5+5+5</>} itemId='2' />
                  <ConnectLineItem width='180px' height='70px' content={<>3+3+3+3</>} itemId='3' />
                </ConnectLineSide>
                <ConnectLineSide sideId='ans_right' bgColor='var(--color-yellow-100)'>
                  <ConnectLineItem width='150px' height='70px' content={<>5×3</>} itemId='5×3' />
                  <ConnectLineItem width='150px' height='70px' content={<>4×5</>} itemId='4×5' />
                  <ConnectLineItem width='150px' height='70px' content={<>3×4</>} itemId='3×4' />
                </ConnectLineSide>
              </ConnectLine>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Question type='dot' size={EStyleSizes['SMALL']}>
                4+4+4+4+4=4×5
              </Question>
              <Question type='dot' size={EStyleSizes['SMALL']}>
                5+5+5=5×3
              </Question>
              <Question type='dot' size={EStyleSizes['SMALL']}>
                3+3+3+3=3×4
              </Question>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

const ConnectLineSide = styled(ConnectLine.Side)``;
const ConnectLineItem = styled(ConnectLine.Item)``;

export default P06;
