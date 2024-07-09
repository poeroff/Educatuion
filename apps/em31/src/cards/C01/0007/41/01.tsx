import styled from '@emotion/styled';
import { BottomSheet, ConnectLine, EStyleButtonTypes, EStyleFontSizes, ETagLine, TMainHeaderInfoTypes, Tag, Typography } from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { Box, Label, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C01_0007_41 } from './store';
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

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const direction = 'horizontal';
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C01_0007_41);
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
    mark: getMarking(cardData.P01.isSubmitted, cardData.P01.isCorrect),
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
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P01: {
            ...prev.P01,
            answer: userSubmissionList[0].inputData[0].value.every((val: string) => val !== '')
              ? userSubmissionList[0].inputData[0]?.value
              : cardData.P01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0]?.isCorrect : false,
          },
        }));

        setConnectLines(getConnectionLines());
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleConnect = (props: IConnectResult) => {
    const currentAnswer = Array.isArray(cardData.P01.answer) ? cardData.P01.answer : [];
    const newData = [...currentAnswer];
    let input: ConnectResult;

    if (props.from.sideId === 'aSideId') {
      input = {
        aSideId: props.from.itemId,
        bSideId: props.to.itemId,
        isCorrect: false,
      };
      if (props.from.itemId === cardData.P01.solution[0].aSideId) {
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
      if (props.to.itemId === cardData.P01.solution[0].aSideId) {
        newData[0] = input;
      } else {
        newData[1] = input;
      }
    }

    setCardData(prev => ({ ...prev, P01: { ...prev.P01, answer: newData } }));
    changeData('P01', 1, 1, newData);
  };

  const handleDisConnect = (props: IConnectResult) => {
    const currentAnswer = Array.isArray(cardData.P01.answer) ? cardData.P01.answer : [];
    const newData = [...currentAnswer];

    if (props.from.sideId === 'aSideId') {
      if (props.from.itemId === cardData.P01.solution[0].aSideId) {
        newData[0] = { aSideId: '', bSideId: '' };
      } else {
        newData[1] = { aSideId: '', bSideId: '' };
      }
    } else if (props.to.sideId === 'aSideId') {
      if (props.to.itemId === cardData.P01.solution[0].aSideId) {
        newData[0] = { aSideId: '', bSideId: '' };
      } else {
        newData[1] = { aSideId: '', bSideId: '' };
      }
    }

    setCardData(prev => ({ ...prev, P01: { ...prev.P01, answer: newData } }));
    changeData('P01', 1, 1, newData);
  };

  const validationCheck = () => {
    for (const answer of cardData.P01.answer) {
      if (!answer.aSideId && !answer.bSideId) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = () => {
    if (cardData.P01.isSubmitted) {
      setIsShow(!isShow);
      return;
    } else {
      let isCorrect = true;
      const updateCardData = { ...cardData.P01, answer: [{ ...cardData.P01.answer[0] }, { ...cardData.P01.answer[1] }] };

      cardData.P01.answer.map((answer, index) => {
        if (answer.aSideId === cardData.P01.solution[index].aSideId && answer.bSideId === cardData.P01.solution[index].bSideId) {
          updateCardData.answer[index].isCorrect = true;
          isCorrect = isCorrect && true;
        } else {
          updateCardData.answer[index].isCorrect = false;
          isCorrect = isCorrect && false;
        }
      });

      setCardData(prev => ({ ...prev, P01: { ...updateCardData, isSubmitted: true, isCorrect: isCorrect } }));
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
    if (cardData.P01.answer.some(val => val['aSideId'] !== '')) {
      for (const connect of cardData.P01.answer) {
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
      submitLabel={cardData.P01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
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
        disabled={cardData.P01.isSubmitted ? true : false}
      >
        <ConnectLineSide direction={direction} sideId='aSideId'>
          <ConnectLineItem
            isError={cardData.P01.isSubmitted && !cardData.P01.answer[0].isCorrect}
            width='200px'
            height='80px'
            value={'613-▢=247'}
            itemId='aItem1'
          />
          <ConnectLineItem
            isError={cardData.P01.isSubmitted && !cardData.P01.answer[1].isCorrect}
            width='200px'
            height='80px'
            value={'854-▢=498'}
            itemId='aItem2'
          />
        </ConnectLineSide>
        <ConnectLineSide direction={direction} sideId='bSideId'>
          <ConnectLineItem
            isError={
              cardData.P01.isSubmitted &&
              cardData.P01.isCorrect === false &&
              ((cardData.P01.answer[0]?.bSideId === 'bItem1' && cardData.P01.answer[0]?.isCorrect === false) ||
                (cardData.P01.answer[1]?.bSideId === 'bItem1' && cardData.P01.answer[1]?.isCorrect === false))
            }
            width='100px'
            height='80px'
            itemId='bItem1'
            value='356'
          />
          <ConnectLineItem
            isError={
              cardData.P01.isSubmitted &&
              cardData.P01.isCorrect === false &&
              ((cardData.P01.answer[0]?.bSideId === 'bItem2' && cardData.P01.answer[0]?.isCorrect === false) ||
                (cardData.P01.answer[1]?.bSideId === 'bItem2' && cardData.P01.answer[1]?.isCorrect === false))
            }
            width='100px'
            height='80px'
            itemId='bItem2'
            value='366'
          />
          <ConnectLineItem
            isError={
              cardData.P01.isSubmitted &&
              cardData.P01.isCorrect === false &&
              ((cardData.P01.answer[0]?.bSideId === 'bItem3' && cardData.P01.answer[0]?.isCorrect === false) ||
                (cardData.P01.answer[1]?.bSideId === 'bItem3' && cardData.P01.answer[1]?.isCorrect === false))
            }
            width='100px'
            height='80px'
            itemId='bItem3'
            value='376'
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
                { from: { sideId: 'aSideSolution', itemId: 'aItem1Solution' }, to: { sideId: 'bSideSolution', itemId: 'bItem2Solution' } },
                { from: { sideId: 'aSideSolution', itemId: 'aItem2Solution' }, to: { sideId: 'bSideSolution', itemId: 'bItem1Solution' } },
              ]}
              disabled={true}
            >
              <ConnectLineSide direction={direction} sideId='aSideSolution'>
                <ConnectLineItem width='200px' height='80px' value={'613-▢=247'} itemId='aItem1Solution' />
                <ConnectLineItem width='200px' height='80px' value={'854-▢=498'} itemId='aItem2Solution' />
              </ConnectLineSide>
              <ConnectLineSide direction={direction} sideId='bSideSolution'>
                <ConnectLineItem width='100px' height='80px' itemId='bItem1Solution' value='356' />
                <ConnectLineItem width='100px' height='80px' itemId='bItem2Solution' value='366' />
                <ConnectLineItem width='100px' height='80px' itemId='bItem3Solution' value='376' />
              </ConnectLineSide>
            </ConnectLineContainer>
          </Box>
          <Box marginTop='20px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>613-▢=247 → ▢=613-247=366</Typography>
            <Typography size={EStyleFontSizes.MEDIUM}>854-▢=498 → ▢=854-498=356</Typography>
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

const LabelBox = styled.span<{ isActive?: boolean }>`
  color: ${({ isActive }) => (isActive ? 'rgba(30, 120, 255, 1)' : 'black')};
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

export default P01;
