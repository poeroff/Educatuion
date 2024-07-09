import { useEffect, useState } from 'react';
import {
  BottomSheet,
  Box,
  ConnectLine,
  EStyleButtonTypes,
  ETagLine,
  Image,
  IQuestionProps,
  SvgIcon,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { DialogContainer } from '@maidt-cntn/ui/math';
import headerIcon from '@/assets/icon/m_default_01.svg';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { C02000110_store, TConnectResult } from '@/cards/C02/0001/10/store';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';

interface IConnection {
  from: IConnectionItem;
  to: IConnectionItem;
}

interface IConnectionItem {
  sideId: string;
  itemId: string;
}

interface IDiagram {
  imgSrc: string;
  imgAlt: string;
  value: string;
}

interface IExample {
  backgroundColor: string;
  value: string;
}

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C02000110_store);
  const [isShow, setShow] = useState<boolean>(false);

  const pageKey = 'p01';
  const pageNo = 'P01';

  const diagramKey = 'diagramId';
  const exampleKey = 'exampleId';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathTween',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <SvgIcon src={headerIcon} size={'36px'} />
        <Typography> 관계있는 것끼리 이어 보세요.</Typography>
      </Box>
    ),
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const diagrams: IDiagram[] = [
    {
      imgSrc: '/C02/0001/10/DEC312001_02.png',
      imgAlt: '위의 그림은 변이 4개, 꼭짓점이 4개인 도형이 그려진 그림입니다.',
      value: 'rectangle',
    },
    {
      imgSrc: '/C02/0001/10/DEC312001_01.png',
      imgAlt: '아래의 그림은 변이 3개, 꼭짓점이 3개인 도형이 그려진 그림입니다.',
      value: 'triangle',
    },
  ];

  const examples: IExample[] = [
    {
      backgroundColor: 'var(--color-green-100)',
      value: '삼각형',
    },
    {
      backgroundColor: 'var(--color-green-100)',
      value: '사각형',
    },
    {
      backgroundColor: 'var(--color-green-100)',
      value: '원',
    },
  ];

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
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      console.log(userSubmissionList);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNo]: {
            ...prev[pageKey],
            answers: userSubmissionList[0]?.inputData.map((item: { value: string }) => item.value) || cardData[pageKey].answers,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0]?.isCorrect : false,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleConnect = (connection: IConnection) => {
    const currentAnswer = Array.isArray(cardData[pageKey].answers) ? cardData[pageKey].answers : [];
    const newAnswer = [...currentAnswer];
    let input: TConnectResult = {
      diagramId: '',
      exampleId: '',
    };
    let targetSubkey = 0;

    if (connection.from.sideId === diagramKey) {
      input = {
        diagramId: connection.from.itemId,
        exampleId: connection.to.itemId,
      };
      if (connection.from.itemId === diagrams[0].value) {
        newAnswer[0] = input;
      } else {
        newAnswer[1] = input;
        targetSubkey = 1;
      }
    } else if (connection.to.sideId === diagramKey) {
      input = {
        diagramId: connection.to.itemId,
        exampleId: connection.from.itemId,
      };
      if (connection.to.itemId === diagrams[0].value) {
        newAnswer[0] = input;
      } else {
        newAnswer[1] = input;
        targetSubkey = 1;
      }
    }

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answers: newAnswer } }));
    changeData(pageNo, 1, targetSubkey, input);
  };

  const getConnectedLines = (array: TConnectResult[]): IConnection[] => {
    return array.map(data => {
      return {
        from: {
          sideId: diagramKey,
          itemId: data[diagramKey],
        },
        to: {
          sideId: exampleKey,
          itemId: data[exampleKey],
        },
      };
    });
  };

  const handleDisConnect = (connection: IConnection) => {
    const currentAnswer = Array.isArray(cardData[pageKey].answers) ? cardData[pageKey].answers : [];
    const newAnswer = [...currentAnswer];
    const erasedConnection = { diagramId: '', exampleId: '' };
    let targetSubkey = 0;

    if (connection.from.sideId === diagramKey) {
      if (connection.from.itemId === diagrams[0].value) {
        newAnswer[0] = erasedConnection;
      } else {
        newAnswer[1] = erasedConnection;
        targetSubkey = 1;
      }
    } else if (connection.to.sideId === diagramKey) {
      if (connection.to.itemId === diagrams[0].value) {
        newAnswer[0] = erasedConnection;
      } else {
        newAnswer[1] = erasedConnection;
        targetSubkey = 1;
      }
    }

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answers: newAnswer } }));
    changeData(pageNo, 1, targetSubkey, erasedConnection);
  };

  const onSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
      return;
    }

    const isCorrect = cardData[pageKey].answers.every(
      (answer, index) => JSON.stringify(answer) === JSON.stringify(cardData[pageKey].solutions[index]),
    );

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData[pageKey].answers[0],
            isAnswer: true,
          },
          {
            subKey: 2,
            type: 'TEXT_LIST',
            value: cardData[pageKey].answers[1],
            isAnswer: true,
          },
        ],
      },
    ];
    submitDataWithResult(pageKey, userSubmission, isCorrect);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageKey);
    };
  }, []);

  const canSubmit = () => {
    return cardData[pageKey].answers.every(val => isNotEmptyString(val[diagramKey]) && isNotEmptyString(val[exampleKey]));
  };

  const checkError = (itemId: string, side: string) => {
    let isError = true;
    let isSelected = false;
    const fixedSide = side === diagramKey ? diagramKey : exampleKey;
    const otherSide = side === diagramKey ? exampleKey : diagramKey;

    cardData[pageKey].answers.forEach(ans => {
      if (ans[fixedSide] === itemId) {
        isSelected = true;
        if (cardData[pageKey].solutions.find(sol => sol[fixedSide] === itemId)?.[otherSide] === ans[otherSide]) {
          isError = false;
        }
      }
    });
    if (!isSelected) {
      return false;
    }

    return isError;
  };

  return (
    <DialogContainer
      bodyId={'targetContainer1'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!canSubmit()}
      submitBtnColor={cardData[pageKey].isSubmitted || canSubmit() ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY}
      onSubmit={onSubmit}
    >
      <Box transform='translate3d(0px, 0px, 0px)' vAlign='center' useFull>
        <ConnectLineContainer
          onConnect={handleConnect}
          onDisConnect={connection => {
            handleDisConnect(connection);
          }}
          connectLines={getConnectedLines(cardData[pageKey].answers)}
          disabled={cardData[pageKey].isSubmitted}
          useItemFull
        >
          <ConnectLineSide sideId={diagramKey}>
            {diagrams.map((value, index) => (
              <ConnectLineItem
                content={
                  <Box vAlign={'center'}>
                    <Image src={value?.imgSrc} width='100px' altText={value.imgAlt} />
                  </Box>
                }
                isError={cardData[pageKey].isSubmitted && checkError(value.value, diagramKey)}
                itemId={value.value}
                key={'diagram_' + index}
              />
            ))}
          </ConnectLineSide>
          <ConnectLineSide sideId={exampleKey} bgColor='var(--color-green-100)'>
            {examples.map((value, index) => (
              <ConnectLineItem
                isError={cardData[pageKey].isSubmitted && checkError(value.value, exampleKey)}
                value={value.value}
                itemId={value.value}
                key={'example_' + index}
                bgColor={value.backgroundColor}
              />
            ))}
          </ConnectLineSide>
        </ConnectLineContainer>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer1' height='40%' show={isShow} marginTop={40}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='22px' hAlign={'center'} useFull>
            <ConnectLineContainer
              id='solutionContainer'
              connectLines={getConnectedLines(
                cardData[pageKey].solutions.map(value => ({ diagramId: value.diagramId + '-sol', exampleId: value.exampleId + '-sol' })),
              )}
              disabled={true}
              useItemFull
            >
              <ConnectLineSide sideId={diagramKey}>
                {diagrams.map((value, index) => (
                  <ConnectLineItem
                    content={
                      <Box vAlign={'center'}>
                        <Image src={value?.imgSrc} width='100px' altText={value.imgAlt} />
                      </Box>
                    }
                    itemId={value.value + '-sol'}
                    key={'diagram_' + index}
                  />
                ))}
              </ConnectLineSide>
              <ConnectLineSide sideId={exampleKey} bgColor='var(--color-green-100)'>
                {examples.map((value, index) => (
                  <ConnectLineItem value={value.value} itemId={value.value + '-sol'} key={'example_' + index} bgColor={value.backgroundColor} />
                ))}
              </ConnectLineSide>
            </ConnectLineContainer>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{`변이 4개, 꼭짓점이 4개인 도형은 사각형,\n 변이 3개, 꼭짓점이 3개인 도형은 삼각형입니다.`}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};
const ConnectLineContainer = styled(ConnectLine)``;

const ConnectLineSide = styled(ConnectLine.Side)``;

const ConnectLineItem = styled(ConnectLine.Item)``;

export default P01;
