import styled from '@emotion/styled';
import { BottomSheet, ConnectLine, EStyleButtonTypes, EStyleFontSizes, ETagLine, TMainHeaderInfoTypes, Tag, Typography } from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { Box, Label, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C01_0007_10 } from './store';
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

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const direction = 'horizontal';
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C01_0007_10);
  const [connectLines, setConnectLines] = useState<IConnectResult[]>([]);
  const [isShow, setIsShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    size: 'large',
    text: (
      <>
        <Box vAlign='center'>
          <Label type='icon' size='small' value={2} marginRight={8} />
          빈칸에 알맞은 수를 찾아 이어보세요.
        </Box>
      </>
    ),
    mark: getMarking(cardData.P02.isSubmitted, cardData.P02.isCorrect),
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
          P02: {
            ...prev.P02,
            answer: userSubmissionList[0].inputData[0].value.every((val: string) => val !== '')
              ? userSubmissionList[0].inputData[0]?.value
              : cardData.P02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0]?.isCorrect : false,
          },
        }));

        setConnectLines(getConnectionLines());
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleConnect = (props: IConnectResult) => {
    const currentAnswer = Array.isArray(cardData.P02.answer) ? cardData.P02.answer : [];
    const newData = [...currentAnswer];
    let input: ConnectResult;

    if (props.from.sideId === 'aSideId') {
      input = {
        aSideId: props.from.itemId,
        bSideId: props.to.itemId,
        isCorrect: false,
      };
      if (props.from.itemId === cardData.P02.solution[0].aSideId) {
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
      if (props.to.itemId === cardData.P02.solution[0].aSideId) {
        newData[0] = input;
      } else {
        newData[1] = input;
      }
    }

    setCardData(prev => ({ ...prev, P02: { ...prev.P02, answer: newData } }));
    changeData('P02', 1, 1, newData);
  };

  const handleDisConnect = (props: IConnectResult) => {
    const currentAnswer = Array.isArray(cardData.P02.answer) ? cardData.P02.answer : [];
    const newData = [...currentAnswer];

    if (props.from.sideId === 'aSideId') {
      if (props.from.itemId === cardData.P02.solution[0].aSideId) {
        newData[0] = { aSideId: '', bSideId: '' };
      } else {
        newData[1] = { aSideId: '', bSideId: '' };
      }
    } else if (props.to.sideId === 'aSideId') {
      if (props.to.itemId === cardData.P02.solution[0].aSideId) {
        newData[0] = { aSideId: '', bSideId: '' };
      } else {
        newData[1] = { aSideId: '', bSideId: '' };
      }
    }

    setCardData(prev => ({ ...prev, P02: { ...prev.P02, answer: newData } }));
    changeData('P02', 1, 1, newData);
  };

  const validationCheck = () => {
    for (const answer of cardData.P02.answer) {
      if (!answer.aSideId && !answer.bSideId) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = () => {
    if (cardData.P02.isSubmitted) {
      setIsShow(!isShow);
      return;
    } else {
      let isCorrect = true;
      const updateCardData = { ...cardData.P02, answer: [{ ...cardData.P02.answer[0] }, { ...cardData.P02.answer[1] }] };

      cardData.P02.answer.map((answer, index) => {
        if (answer.aSideId === cardData.P02.solution[index].aSideId && answer.bSideId === cardData.P02.solution[index].bSideId) {
          updateCardData.answer[index].isCorrect = true;
          isCorrect = isCorrect && true;
        } else {
          updateCardData.answer[index].isCorrect = false;
          isCorrect = isCorrect && false;
        }
      });

      setCardData(prev => ({ ...prev, P02: { ...updateCardData, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: [updateCardData.answer[0], updateCardData.answer[1]],
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  const getConnectionLines = () => {
    const lines: IConnectResult[] = [];
    if (cardData.P02.answer.some(val => val['aSideId'] !== '')) {
      for (const connect of cardData.P02.answer) {
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.P02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={validationCheck()}
      submitBtnColor={validationCheck() ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={handleSubmit}
      useRound
    >
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
        disabled={cardData.P02.isSubmitted ? true : false}
      >
        <ConnectLineSide direction={direction} sideId='aSideId'>
          <ConnectLineItem
            isError={cardData.P02.isSubmitted && !cardData.P02.answer[0].isCorrect}
            width='200px'
            height='80px'
            value={'756-▢=289'}
            itemId='aItem1'
          />
          <ConnectLineItem
            isError={cardData.P02.isSubmitted && !cardData.P02.answer[1].isCorrect}
            width='200px'
            height='80px'
            value={'823-▢=375'}
            itemId='aItem2'
          />
        </ConnectLineSide>
        <ConnectLineSide direction={direction} sideId='bSideId'>
          <ConnectLineItem
            isError={
              cardData.P02.isSubmitted &&
              cardData.P02.isCorrect === false &&
              ((cardData.P02.answer[0]?.bSideId === 'bItem1' && cardData.P02.answer[0]?.isCorrect === false) ||
                (cardData.P02.answer[1]?.bSideId === 'bItem1' && cardData.P02.answer[1]?.isCorrect === false))
            }
            width='100px'
            height='80px'
            itemId='bItem1'
            value='448'
          />
          <ConnectLineItem
            isError={
              cardData.P02.isSubmitted &&
              cardData.P02.isCorrect === false &&
              ((cardData.P02.answer[0]?.bSideId === 'bItem2' && cardData.P02.answer[0]?.isCorrect === false) ||
                (cardData.P02.answer[1]?.bSideId === 'bItem2' && cardData.P02.answer[1]?.isCorrect === false))
            }
            width='100px'
            height='80px'
            itemId='bItem2'
            value='456'
          />
          <ConnectLineItem
            isError={
              cardData.P02.isSubmitted &&
              cardData.P02.isCorrect === false &&
              ((cardData.P02.answer[0]?.bSideId === 'bItem3' && cardData.P02.answer[0]?.isCorrect === false) ||
                (cardData.P02.answer[1]?.bSideId === 'bItem3' && cardData.P02.answer[1]?.isCorrect === false))
            }
            width='100px'
            height='80px'
            itemId='bItem3'
            value='467'
          />
        </ConnectLineSide>
      </ConnectLineContainer>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px'>
            <ConnectLineContainer
              id='solutionContainer'
              direction={direction}
              connectLines={[
                { from: { sideId: 'aSideSolution', itemId: 'aItem1Solution' }, to: { sideId: 'bSideSolution', itemId: 'bItem3Solution' } },
                { from: { sideId: 'aSideSolution', itemId: 'aItem2Solution' }, to: { sideId: 'bSideSolution', itemId: 'bItem1Solution' } },
              ]}
              disabled={true}
            >
              <ConnectLineSide direction={direction} sideId='aSideSolution'>
                <ConnectLineItem width='200px' height='80px' value={'756-▢=289'} itemId='aItem1Solution' />
                <ConnectLineItem width='200px' height='80px' value={'823-▢=375'} itemId='aItem2Solution' />
              </ConnectLineSide>
              <ConnectLineSide direction={direction} sideId='bSideSolution'>
                <ConnectLineItem width='100px' height='80px' itemId='bItem1Solution' value='448' />
                <ConnectLineItem width='100px' height='80px' itemId='bItem2Solution' value='456' />
                <ConnectLineItem width='100px' height='80px' itemId='bItem3Solution' value='467' />
              </ConnectLineSide>
            </ConnectLineContainer>
          </Box>
          <Box marginTop='20px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>756-▢=289 → ▢=756-289=467</Typography>
            <Typography size={EStyleFontSizes.MEDIUM}>823-▢=375 → ▢=823-375=448</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const ConnectLineSide = styled(ConnectLine.Side)<{ direction: 'vertical' | 'horizontal' }>`
  height: 100%;
  display: flex;
  height: 200px;
  flex-direction: ${({ direction }) => (direction === 'horizontal' ? 'row' : 'column')};
  justify-content: space-between;
`;

const ConnectLineContainer = styled(ConnectLine)<{ direction: 'vertical' | 'horizontal' }>`
  display: flex;
  width: 700px;
  height: 400px;
  justify-content: space-between;
  flex-direction: ${({ direction }) => (direction === 'horizontal' ? 'column' : 'row')};
`;

const ConnectLineItem = styled(ConnectLine.Item)`
  button {
    background-color: var(--color-grey-50);
  }
`;

export default P02;
