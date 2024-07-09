import styled from '@emotion/styled';
import { BottomSheet, ConnectLine, EStyleButtonTypes, EStyleFontSizes, ETagLine, Tag, Typography, Label, Box, IQuestionProps } from '@maidt-cntn/ui';
import { useEffect, useRef, useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C01_0004_60 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

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

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const direction = 'horizontal';
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C01_0004_60);
  const [isShow, setIsShow] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    markSize: 'middle',
    text: (
      <>
        <Label value='3' type='icon' /> 계산 결과를 찾아 이어 보세요.
      </>
    ),
    mark: getMarking(cardData.P03.isSubmitted, cardData.P03.isCorrect),
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
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P03: {
            ...prev.P03,
            answer: userSubmissionList[0]?.inputData.map((item: { value: string }) => item.value) || cardData.P03.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0]?.isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleConnect = (props: IConnectResult) => {
    const currentAnswer = Array.isArray(cardData.P03.answer) ? cardData.P03.answer : [];
    const newData = [...currentAnswer];
    let input: ConnectResult;

    if (props.from.sideId === 'aSideId') {
      input = {
        aSideId: props.from.itemId,
        bSideId: props.to.itemId,
        isCorrect: false,
      };
      if (props.from.itemId === cardData.P03.solution[0].aSideId) {
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
      if (props.to.itemId === cardData.P03.solution[0].aSideId) {
        newData[0] = input;
      } else {
        newData[1] = input;
      }
    }

    setCardData(prev => ({ ...prev, P03: { ...prev.P03, answer: newData } }));
    changeData('P03', 1, 1, newData);
  };

  const handleDisConnect = (props: IConnectResult) => {
    const currentAnswer = Array.isArray(cardData.P03.answer) ? cardData.P03.answer : [];
    const newData = [...currentAnswer];

    if (props.from.sideId === 'aSideId') {
      if (props.from.itemId === cardData.P03.solution[0].aSideId) {
        newData[0] = { aSideId: '', bSideId: '' };
      } else {
        newData[1] = { aSideId: '', bSideId: '' };
      }
    } else if (props.to.sideId === 'aSideId') {
      if (props.to.itemId === cardData.P03.solution[0].aSideId) {
        newData[0] = { aSideId: '', bSideId: '' };
      } else {
        newData[1] = { aSideId: '', bSideId: '' };
      }
    }

    setCardData(prev => ({ ...prev, ['P03']: { ...prev['P03'], answer: newData } }));
    changeData('P03', 1, 1, newData);
  };

  const validationCheck = () => {
    for (const answer of cardData.P03.answer) {
      if (!answer.aSideId && !answer.bSideId) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = () => {
    if (cardData.P03.isSubmitted) {
      setIsShow(!isShow);
      return;
    } else {
      let isCorrect = true;
      const updateCardData = { ...cardData.P03, answer: [{ ...cardData.P03.answer[0] }, { ...cardData.P03.answer[1] }] };

      cardData.P03.answer.map((answer, index) => {
        if (answer.aSideId === cardData.P03.solution[index].aSideId && answer.bSideId === cardData.P03.solution[index].bSideId) {
          updateCardData.answer[index].isCorrect = true;
          isCorrect = isCorrect && true;
        } else {
          updateCardData.answer[index].isCorrect = false;
          isCorrect = isCorrect && false;
        }
      });

      setCardData(prev => ({ ...prev, ['P03']: { ...updateCardData, isSubmitted: true, isCorrect: isCorrect } }));

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
      submitDataWithResult('P03', userSubmission, isCorrect);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  const getConnectionLines = () => {
    const lines: IConnectResult[] = [];
    if (cardData.P03.answer.every(val => val['aSideId'] !== '')) {
      for (const connect of cardData.P03.answer) {
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
      submitLabel={cardData.P03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={validationCheck()}
      submitBtnColor={validationCheck() ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
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
          disabled={cardData.P03.isSubmitted ? true : false}
          targetRef={scrollRef}
        >
          <ConnectLineSide direction={direction} sideId='aSideId'>
            <ConnectLineItem
              isError={cardData.P03.isSubmitted && !cardData.P03.answer[0].isCorrect}
              width='200px'
              height='80px'
              value={'258+347'}
              dotPosition={direction === 'horizontal' ? 'bottom' : 'right'}
              itemId='aItem1'
            />
            <ConnectLineItem
              isError={cardData.P03.isSubmitted && !cardData.P03.answer[1].isCorrect}
              width='200px'
              height='80px'
              value={'149+473'}
              dotPosition={direction === 'horizontal' ? 'bottom' : 'right'}
              itemId='aItem2'
            />
          </ConnectLineSide>
          <ConnectLineSide direction={direction} sideId='bSideId'>
            <ConnectLineItem
              isError={
                cardData.P03.isSubmitted &&
                cardData.P03.isCorrect === false &&
                ((cardData.P03.answer[0]?.bSideId === 'bItem1' && cardData.P03.answer[0]?.isCorrect === false) ||
                  (cardData.P03.answer[1]?.bSideId === 'bItem1' && cardData.P03.answer[1]?.isCorrect === false))
              }
              width='100px'
              height='80px'
              dotPosition={direction === 'horizontal' ? 'top' : 'left'}
              itemId='bItem1'
              value='605'
            />
            <ConnectLineItem
              isError={
                cardData.P03.isSubmitted &&
                cardData.P03.isCorrect === false &&
                ((cardData.P03.answer[0]?.bSideId === 'bItem2' && cardData.P03.answer[0]?.isCorrect === false) ||
                  (cardData.P03.answer[1]?.bSideId === 'bItem2' && cardData.P03.answer[1]?.isCorrect === false))
              }
              width='100px'
              height='80px'
              dotPosition={direction === 'horizontal' ? 'top' : 'left'}
              itemId='bItem2'
              value='622'
            />
            <ConnectLineItem
              isError={
                cardData.P03.isSubmitted &&
                cardData.P03.isCorrect === false &&
                ((cardData.P03.answer[0]?.bSideId === 'bItem3' && cardData.P03.answer[0]?.isCorrect === false) ||
                  (cardData.P03.answer[1]?.bSideId === 'bItem3' && cardData.P03.answer[1]?.isCorrect === false))
              }
              width='100px'
              height='80px'
              dotPosition={direction === 'horizontal' ? 'top' : 'left'}
              itemId='bItem3'
              value='625'
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
              onConnect={props => {
                console.log('onConnect!', props);
              }}
              onDisConnect={props => {
                console.log('onDisConnect', props);
              }}
              direction={direction}
              connectLines={[
                { from: { sideId: 'aSideSolution', itemId: 'item1Solution' }, to: { sideId: 'bSideSolution', itemId: 'item3Solution' } },
                { from: { sideId: 'aSideSolution', itemId: 'item2Solution' }, to: { sideId: 'bSideSolution', itemId: 'item4Solution' } },
              ]}
              disabled={true}
            >
              <ConnectLineSide direction={direction} sideId='aSideSolution'>
                <ConnectLineItem width='200px' height='80px' value={'258+347'} itemId='item1Solution' />
                <ConnectLineItem width='200px' height='80px' value={'149+473'} itemId='item2Solution' />
              </ConnectLineSide>
              <ConnectLineSide direction={direction} sideId='bSideSolution'>
                <ConnectLineItem width='100px' height='80px' itemId='item3Solution' value='605' />
                <ConnectLineItem width='100px' height='80px' itemId='item4Solution' value='622' />
                <ConnectLineItem width='100px' height='80px' itemId='item5Solution' value='625' />
              </ConnectLineSide>
            </ConnectLineContainer>
          </Box>
          <Box marginTop='-40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>258+347=605, 149+473=622입니다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const ConnectLineSide = styled(ConnectLine.Side)<{ direction: 'vertical' | 'horizontal' }>`
  height: 100%;
  display: flex;
  height: 220px;
  flex-direction: ${({ direction }) => (direction === 'horizontal' ? 'row' : 'column')};
  justify-content: space-between;
`;

const LabelBox = styled.span<{ isActive?: boolean }>`
  color: ${({ isActive }) => (isActive ? 'rgba(30, 120, 255, 1)' : 'black')};
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
export default P03;
