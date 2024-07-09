import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

import { Box, Label, Typography, EStyleFontSizes, IQuestionProps, ConnectLine, EStyleButtonTypes, BottomSheet, Tag, ETagLine } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { A03_0007_03 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

interface IConnectResult {
  from: {
    sideId: string;
    itemId: string;
  };
  to: {
    sideId: string;
    itemId: string;
  };
}

const P07 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(A03_0007_03);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const scrollRef = useRef<HTMLDivElement>(null);

  const pageNo = 'P07';
  const pageKey = 'p07';

  const topSideId = 'topSide';
  const bottomSideId = 'bottomSide';

  type ConnectResult = {
    topId: string;
    bottomId: string;
  };

  const topData = [
    {
      backgroundColor: 'white',
      name: '하루',
      itemId: '하루',
    },
    {
      backgroundColor: 'white',
      name: '먹는 시간 간격',
      itemId: '먹는 시간 간격',
    },
    {
      backgroundColor: 'white',
      name: '먹을 수 있는 횟수',
      itemId: '먹을 수 있는 횟수',
    },
  ];

  const bottomData = [
    {
      backgroundColor: 'var(--color-grey-50)',
      content: '나누는 수',
      itemId: '나누는 수',
    },
    {
      backgroundColor: 'var(--color-grey-50)',
      content: '나누어지는 수',
      itemId: '나누어지는 수',
    },
    {
      backgroundColor: 'var(--color-grey-50)',
      content: '몫',
      itemId: '몫',
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: { topId: '', valueId: '' },
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT_LIST',
          value: { topId: '', valueId: '' },
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'TEXT_LIST',
          value: { topId: '', valueId: '' },
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0]?.inputData.map((item: { value: string }) => item.value) || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0]?.isCorrect : false,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleConnect = (props: IConnectResult) => {
    const currentAnswer = Array.isArray(cardData[pageKey].answer) ? cardData[pageKey].answer : [];
    const newData = [...currentAnswer];
    let input: ConnectResult;

    if (props.from.sideId === topSideId) {
      input = {
        topId: props.from.itemId,
        bottomId: props.to.itemId,
      };
      topData.forEach((top, index) => {
        if (props.from.itemId === top.itemId) {
          newData[index] = input;
        }
      });
    } else if (props.to.sideId === topSideId) {
      input = {
        topId: props.to.itemId,
        bottomId: props.from.itemId,
      };
      topData.forEach((top, index) => {
        if (props.to.itemId === top.itemId) {
          newData[index] = input;
        }
      });
    }

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: newData } }));
    changeData(pageNo, 1, 1, newData);
  };

  const handleDisConnect = (props: IConnectResult) => {
    const currentAnswer = Array.isArray(cardData[pageKey].answer) ? cardData[pageKey].answer : [];
    const newData = [...currentAnswer];

    if (props.from.sideId === topSideId) {
      topData.forEach((top, index) => {
        if (props.from.itemId === top.itemId) {
          newData[index] = { topId: '', bottomId: '' };
        }
      });
    } else if (props.to.sideId === topSideId) {
      topData.forEach((top, index) => {
        if (props.to.itemId === top.itemId) {
          newData[index] = { topId: '', bottomId: '' };
        }
      });
    }
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: newData } }));
    changeData(pageNo, 1, 1, newData);
  };

  const validationCheck = () => {
    for (const answer of cardData[pageKey].answer) {
      if (!answer.topId && !answer.bottomId) {
        return true;
      }
    }
    return false;
  };

  const checkError = (item: string) => {
    let isError = true;
    cardData[pageKey].answer.map((ans, index) => {
      if (ans.topId === item && ans.bottomId === cardData[pageKey].solution[index].bottomId) {
        isError = false;
      } else if (ans.bottomId === item && ans.bottomId === cardData[pageKey].solution[index].bottomId) {
        isError = false;
      }
    });
    return isError;
  };

  const onGrade = () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
      return;
    } else {
      let isCorrect = true;
      cardData[pageKey].answer.map((answer, index) => {
        if (!(answer.topId === cardData[pageKey].solution[index].topId && answer.bottomId === cardData[pageKey].solution[index].bottomId)) {
          isCorrect = false;
        }
      });

      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: { topId: cardData[pageKey].answer[0].topId, bottomId: cardData[pageKey].answer[0].bottomId },
              isAnswer: true,
            },
            {
              subKey: 2,
              type: 'TEXT_LIST',
              value: { topId: cardData[pageKey].answer[1].topId, bottomId: cardData[pageKey].answer[1].bottomId },
              isAnswer: true,
            },
            {
              subKey: 3,
              type: 'TEXT_LIST',
              value: { topId: cardData[pageKey].answer[2].topId, bottomId: cardData[pageKey].answer[2].bottomId },
              isAnswer: true,
            },
          ],
          isCorrect: isCorrect,
        },
      ];
      submitDataWithResult(pageNo, userSubmission, isCorrect);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  const getConnectionLines = () => {
    const lines: IConnectResult[] = [];
    if (cardData[pageKey].answer.every(val => val['topId'] !== '')) {
      for (const connect of cardData[pageKey].answer) {
        const line: IConnectResult = {
          from: {
            sideId: topSideId,
            itemId: connect['topId'],
          },
          to: {
            sideId: bottomSideId,
            itemId: connect['bottomId'],
          },
        };
        lines.push(line);
      }
    }
    return lines;
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    size: 'large',
    text: (
      <>
        <Label type='icon' size='small' value={2} />
        <Box vAlign='center'>
          <Label type='icon' size='small' value={1} marginRight={8} />
          에서 알게 된 점을 살펴보세요.
        </Box>
      </>
    ),
    mark: getMarking(cardData[pageKey].isSubmitted, cardData[pageKey].isCorrect),
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={validationCheck()}
      submitBtnColor={validationCheck() ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={onGrade}
      useRound
    >
      <Box useFull>
        <Box vAlign='flex-start' marginBottom={'24px'}>
          <Box height={'60px'} display='flex' alignItems='center'>
            <Label value='ㄴ' lineColor='none' background='#969590' color='var(--color-white)' marginRight={20} />
          </Box>
          <Typography useGap={false} size={EStyleFontSizes.LARGE}>
            ‘하루’, ‘먹는 시간 간격’, ‘먹을 수 있는 횟수’는 나눗셈식에서 각각 무엇을 나타내는지 이어 보세요.
          </Typography>
        </Box>
        <Box paddingLeft={'20px'}>
          <ConnectLineContainer
            onConnect={props => {
              handleConnect(props);
            }}
            onDisConnect={props => {
              handleDisConnect(props);
            }}
            connectLines={getConnectionLines()}
            disabled={cardData[pageKey].isSubmitted}
            targetRef={scrollRef}
          >
            <ConnectLineSide sideId={topSideId}>
              {topData.map((value, index) => (
                <ConnectLineItem
                  isError={cardData[pageKey].isSubmitted && checkError(value.itemId)}
                  value={value.name}
                  dotPosition={'bottom'}
                  itemId={value.itemId}
                  key={'top_' + index}
                  color={value.backgroundColor}
                />
              ))}
            </ConnectLineSide>
            <ConnectLineSide sideId={bottomSideId}>
              {bottomData.map((value, index) => (
                <ConnectLineItem
                  isError={cardData[pageKey].isSubmitted && checkError(value.itemId)}
                  value={value.content}
                  dotPosition={'top'}
                  itemId={value.itemId}
                  key={'bottom_' + index}
                  color={value.backgroundColor}
                />
              ))}
            </ConnectLineSide>
          </ConnectLineContainer>
        </Box>
      </Box>

      <BottomSheet height={'50%'} show={isShow} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
              <ConnectLineContainer
                connectLines={[
                  { from: { sideId: 'topSide', itemId: '하루' }, to: { sideId: 'bottomSide', itemId: '나누어지는 수' } },
                  { from: { sideId: 'topSide', itemId: '먹는 시간 간격' }, to: { sideId: 'bottomSide', itemId: '나누는 수' } },
                  { from: { sideId: 'topSide', itemId: '먹을 수 있는 횟수' }, to: { sideId: 'bottomSide', itemId: '몫' } },
                ]}
                disabled={true}
              >
                <ConnectLineSide sideId={topSideId}>
                  {topData.map((value, index) => (
                    <ConnectLineItem
                      value={value.name}
                      dotPosition={'bottom'}
                      itemId={value.itemId}
                      key={'top_' + index}
                      color={value.backgroundColor}
                    />
                  ))}
                </ConnectLineSide>
                <ConnectLineSide sideId={bottomSideId}>
                  {bottomData.map((value, index) => (
                    <ConnectLineItem
                      value={value.content}
                      dotPosition={'top'}
                      itemId={value.itemId}
                      key={'bottom_' + index}
                      color={value.backgroundColor}
                    />
                  ))}
                </ConnectLineSide>
              </ConnectLineContainer>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'10px'}>
              <Typography>'하루'는 나누어지는 수, '먹는 시간 간격'은 나누는 수, '먹을 수 있는 횟수'는 몫을 나타냅니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const ConnectLineContainer = styled(ConnectLine)`
  display: flex;
  width: 880px;
  height: 250px;
  justify-content: space-between;
  flex-direction: column;
`;

const ConnectLineSide = styled(ConnectLine.Side)`
  display: flex;
  width: 880px;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  flex-wrap: nowrap;

  div + div {
    margin-left: 50px;
  }
`;

const ConnectLineItem = styled(ConnectLine.Item)<{ color: string }>`
  width: 440px;
  button {
    background-color: ${({ color }) => color};
    width: 254px;
    height: 60px;
    padding: 4px 12px 4px 12px;
    border-radius: 8px;
  }
`;

export default P07;
