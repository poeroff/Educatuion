import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  ConnectLine,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IQuestionProps,
  SvgIcon,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C01_0004_52 } from './store';

import headerIcon from '../../../../assets/icon/m_default_01.svg';

interface IConnectResult {
  from: {
    sideId: string;
    itemId: string;
    isCorrect?: boolean;
  };
  to: {
    sideId: string;
    itemId: string;
    isCorrect?: boolean;
  };
}

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const direction = 'horizontal';
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C01_0004_52);
  const [isShow, setIsShow] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    markSize: 'middle',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        계산 결과를 찾아 이어 보세요.
      </>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  type ConnectResult = {
    aSideId: string;
    bSideId: string;
    isCorrect?: boolean;
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', ''],
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT_LIST',
          value: ['', ''],
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
            answer: userSubmissionList[0]?.inputData.map((item: { value: string }) => item.value) || cardData.p01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0]?.isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleConnect = (props: IConnectResult) => {
    const currentAnswer = Array.isArray(cardData.p01.answer) ? cardData.p01.answer : [];
    const newData = [...currentAnswer];
    let input: ConnectResult;

    if (props.from.sideId === 'aSideId') {
      input = {
        aSideId: props.from.itemId,
        bSideId: props.to.itemId,
        isCorrect: false,
      };
      if (props.from.itemId === cardData.p01.solution[0].aSideId) {
        newData[0] = input;
      } else {
        newData[1] = input;
      }
    } else if (props.to.sideId === 'aSideId') {
      input = {
        aSideId: props.to.itemId,
        bSideId: props.from.itemId,
        isCorrect: false,
      };
      if (props.to.itemId === cardData.p01.solution[0].aSideId) {
        newData[0] = input;
      } else {
        newData[1] = input;
      }
    }

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: newData } }));
    changeData('P01', 1, 1, newData);
  };

  const handleDisConnect = (props: IConnectResult) => {
    const currentAnswer = Array.isArray(cardData.p01.answer) ? cardData.p01.answer : [];
    const newData = [...currentAnswer];

    if (props.from.sideId === 'aSideId') {
      if (props.from.itemId === cardData.p01.solution[0].aSideId) {
        newData[0] = { aSideId: '', bSideId: '' };
      } else {
        newData[1] = { aSideId: '', bSideId: '' };
      }
    } else if (props.to.sideId === 'aSideId') {
      if (props.to.itemId === cardData.p01.solution[0].aSideId) {
        newData[0] = { aSideId: '', bSideId: '' };
      } else {
        newData[1] = { aSideId: '', bSideId: '' };
      }
    }

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: newData } }));
    changeData('P01', 1, 1, newData);
  };

  const validationCheck = () => {
    for (const answer of cardData.p01.answer) {
      if (!answer.aSideId && !answer.bSideId) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
      return;
    } else {
      let isCorrect = true;
      const updateCardData = { ...cardData.p01, answer: [{ ...cardData.p01.answer[0] }, { ...cardData.p01.answer[1] }] };

      cardData.p01.answer.map((answer, index) => {
        if (answer.aSideId === cardData.p01.solution[index].aSideId && answer.bSideId === cardData.p01.solution[index].bSideId) {
          updateCardData.answer[index].isCorrect = true;
          isCorrect = isCorrect && true;
        } else {
          updateCardData.answer[index].isCorrect = false;
          isCorrect = isCorrect && false;
        }
      });

      setCardData(prev => ({ ...prev, p01: { ...updateCardData, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: updateCardData.answer[0],
            },
            {
              subKey: 2,
              type: 'TEXT_LIST',
              value: updateCardData.answer[1],
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  const getConnectionLines = () => {
    const lines: IConnectResult[] = [];
    if (cardData.p01.answer.every(val => val['aSideId'] !== '')) {
      for (const connect of cardData.p01.answer) {
        const line: IConnectResult = {
          from: {
            sideId: 'aSideId',
            itemId: connect['aSideId'],
            isCorrect: false,
          },
          to: {
            sideId: 'bSideId',
            itemId: connect['bSideId'],
            isCorrect: false,
          },
        };
        lines.push(line);
      }
    }

    return lines;
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={validationCheck()}
      submitBtnColor={validationCheck() ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={handleSubmit}
      useRound
      vAlign='flex-start'
      useScroll
    >
      <Box hAlign={'center'}>
        <ConnectLineContainer
          id='container'
          onConnect={props => {
            handleConnect(props);
          }}
          onDisConnect={props => {
            handleDisConnect(props);
          }}
          direction={direction}
          connectLines={getConnectionLines()}
          disabled={cardData.p01.isSubmitted ? true : false}
          targetRef={scrollRef}
        >
          <ConnectLineSide direction={direction} sideId='aSideId'>
            <ConnectLineItem
              isError={cardData.p01.isSubmitted && !cardData.p01.answer[0].isCorrect}
              width='200px'
              height='80px'
              value={'269+572'}
              itemId='aItem1'
            />
            <ConnectLineItem
              isError={cardData.p01.isSubmitted && !cardData.p01.answer[1].isCorrect}
              width='200px'
              height='80px'
              value={'354+387'}
              itemId='aItem2'
            />
          </ConnectLineSide>
          <ConnectLineSide direction={direction} sideId='bSideId'>
            <ConnectLineItem
              isError={
                cardData.p01.isSubmitted &&
                cardData.p01.isCorrect === false &&
                ((cardData.p01.answer[0]?.bSideId === 'bItem1' && cardData.p01.answer[0]?.isCorrect === false) ||
                  (cardData.p01.answer[1]?.bSideId === 'bItem1' && cardData.p01.answer[1]?.isCorrect === false))
              }
              width='100px'
              height='80px'
              itemId='bItem1'
              value='841'
            />
            <ConnectLineItem
              isError={
                cardData.p01.isSubmitted &&
                cardData.p01.isCorrect === false &&
                ((cardData.p01.answer[0]?.bSideId === 'bItem2' && cardData.p01.answer[0]?.isCorrect === false) ||
                  (cardData.p01.answer[1]?.bSideId === 'bItem2' && cardData.p01.answer[1]?.isCorrect === false))
              }
              width='100px'
              height='80px'
              itemId='bItem2'
              value='741'
            />
            <ConnectLineItem
              isError={
                cardData.p01.isSubmitted &&
                cardData.p01.isCorrect === false &&
                ((cardData.p01.answer[0]?.bSideId === 'bItem3' && cardData.p01.answer[0]?.isCorrect === false) ||
                  (cardData.p01.answer[1]?.bSideId === 'bItem3' && cardData.p01.answer[1]?.isCorrect === false))
              }
              width='100px'
              height='80px'
              itemId='bItem3'
              value='731'
            />
          </ConnectLineSide>
        </ConnectLineContainer>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px' hAlign={'center'}>
            <ConnectLineContainer
              id='solutionContainer'
              direction={direction}
              connectLines={[
                { from: { sideId: 'aSideSolution', itemId: 'item1Solution' }, to: { sideId: 'bSideSolution', itemId: 'item3Solution' } },
                { from: { sideId: 'aSideSolution', itemId: 'item2Solution' }, to: { sideId: 'bSideSolution', itemId: 'item4Solution' } },
              ]}
              disabled={true}
            >
              <ConnectLineSide direction={direction} sideId='aSideSolution'>
                <ConnectLineItem width='200px' height='80px' value={'269+572'} itemId='item1Solution' />
                <ConnectLineItem width='200px' height='80px' value={'354+387'} itemId='item2Solution' />
              </ConnectLineSide>
              <ConnectLineSide direction={direction} sideId='bSideSolution'>
                <ConnectLineItem width='100px' height='80px' itemId='item3Solution' value='841' />
                <ConnectLineItem width='100px' height='80px' itemId='item4Solution' value='741' />
                <ConnectLineItem width='100px' height='80px' itemId='item5Solution' value='731' />
              </ConnectLineSide>
            </ConnectLineContainer>
          </Box>
          <Box marginTop='-40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>269+572=841, 354+387=741</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const ConnectLineSide = styled(ConnectLine.Side)<{ direction: 'vertical' | 'horizontal' }>`
  height: 100%;
  height: 200px;
  display: flex;
  flex-direction: ${({ direction }) => (direction === 'horizontal' ? 'row' : 'column')};
  justify-content: space-between;
`;

const ConnectLineContainer = styled(ConnectLine)<{ direction: 'vertical' | 'horizontal' }>`
  display: flex;
  width: 700px;
  height: 350px;
  justify-content: space-between;
  flex-direction: ${({ direction }) => (direction === 'horizontal' ? 'column' : 'row')};
`;

const ConnectLineItem = styled(ConnectLine.Item)`
  button {
    background-color: var(--color-grey-50);
  }
`;

export default P01;
