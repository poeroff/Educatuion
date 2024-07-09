import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  ConnectLine,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Image,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L06C02A05, TConnection } from './store';

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

const page = 'P01';
const pageKey = 'p01';

const peopleData = [
  {
    imgSrc: '/L06/C02/A05/ME1-L06-C02-A05-P01-01.jpg',
    imgAlt: '여자아이 얼굴',
    name: 'Jiwoo',
  },
  {
    imgSrc: '/L06/C02/A05/ME1-L06-C02-A05-P01-02.jpg',
    imgAlt: '남자아이 얼굴',
    name: 'Eric',
  },
];

const valueData = [
  {
    backgroundColor: 'var(--color-blue-100)',
    content: 'dancing',
  },
  {
    backgroundColor: 'var(--color-yellow-100)',
    content: 'talking pictures',
  },
  {
    backgroundColor: 'var(--color-blue-100)',
    content: 'making webtoons',
  },
  {
    backgroundColor: 'var(--color-yellow-100)',
    content: 'playing soccer',
  },
];

const FROM = 0;
const TO = 1;
const leftSideId = 'peopleSide';
const rightSideId = 'valueSide';

const P01 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L06C02A05);
  const { changeData, initData, submitDataWithResult, saveData, clearData } = usePageData();
  const { answer, solution, isSubmitted, isCorrect } = cardData[pageKey];
  const [isShowAnswer, setShowAnswer] = useState(false);
  const isDisabled = answer.length < solution.length;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Match',
    headerPattern: 'icon',
    iconType: 'listeningStrategy',
  };

  const questionInfo: IQuestionProps = {
    text: 'What are Jiwoo and Eric interested in?',
    mark: getMarking(isSubmitted, isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L06/C02/A05/ME1-L06-C02-A05-P01.mp3',
    captionSrc: '/L06/C02/A05/ME1-L06-C02-A05-P01.srt',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
        },
        {
          subKey: 2,
          type: 'TEXT_LIST',
        },
      ],
    },
  ];

  const getConnectedLines = (array: TConnection[]): IConnectResult[] => {
    return array.map(data => {
      return {
        from: {
          sideId: leftSideId,
          itemId: data?.[FROM],
        },
        to: {
          sideId: rightSideId,
          itemId: data?.[TO],
        },
      };
    });
  };

  const isCorrectAnswer = (answer: TConnection[], solution: TConnection[]) => {
    const answerSet = new Set(answer.map(item => JSON.stringify(item)));
    const solutionSet = new Set(solution.map(item => JSON.stringify(item)));

    if (answerSet.size !== solutionSet.size) {
      return false;
    }

    for (const answer of answerSet) {
      if (!solutionSet.has(answer)) {
        return false;
      }
    }

    return true;
  };

  const init = async () => {
    const pageId = pageIds.find(p => p.page === page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData
              .filter((item: { value: TConnection }) => item.value)
              .map((item: { value: TConnection }) => item.value),
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      setShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = isCorrectAnswer(answer, solution);
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: answer[0],
              isAnswer: true,
            },
            {
              subKey: 2,
              type: 'TEXT_LIST',
              value: answer[1],
              isAnswer: true,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(page, userSubmission, isCorrect);
    }
  };

  const getOrderedConnection = (connection: IConnectResult): TConnection => {
    return connection.from.sideId === leftSideId ? [connection.from.itemId, connection.to.itemId] : [connection.to.itemId, connection.from.itemId];
  };

  const handleConnect = (connection: IConnectResult) => {
    const newAnswer = [...answer, getOrderedConnection(connection)];
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: newAnswer } }));

    newAnswer.map((ans, idx) => {
      changeData(page, 1, idx + 1, ans);
    });
  };

  const handleDisConnect = (connection: IConnectResult) => {
    const orderedConnection = getOrderedConnection(connection);
    const newAnswer = answer.filter(value => !(value[FROM] === orderedConnection[FROM] && value[TO] === orderedConnection[TO]));

    answer.map((ans, idx) => {
      changeData(page, 1, idx + 1, newAnswer[idx] ?? undefined);
    });

    setCardData(prev => ({
      ...prev,
      [pageKey]: { ...prev[pageKey], answer: newAnswer },
    }));
  };

  const checkError = (itemId: string, side: number) => {
    let isError = true;
    let isSelected = false;
    const otherSide = side === FROM ? TO : side;

    answer.forEach(ans => {
      if (ans?.[side] === itemId) {
        isSelected = true;
        if (solution.find(sol => sol[side] === itemId)?.[otherSide] === ans[otherSide]) {
          isError = false;
        }
      }
    });

    if (!isSelected) {
      return false;
    }

    return isError;
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(page);
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={isDisabled ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      submitDisabled={isDisabled}
      onSubmit={handleSubmit}
    >
      <Box hAlign='center' useFull>
        <ConnectLine connectLines={getConnectedLines(answer)} onConnect={handleConnect} onDisConnect={handleDisConnect} disabled={isSubmitted}>
          <ConnectLine.Side sideId={leftSideId}>
            {peopleData.map((data, index) => (
              <ConnectLine.Item
                key={`${leftSideId}-${index}`}
                itemId={data.name}
                ariaLabel={`점 ${data.name}`}
                isError={isSubmitted && checkError(data.name, FROM)}
                content={
                  <Box display='flex' flexDirection='column' alignItems='center'>
                    <Image src={data.imgSrc} alt={data.imgAlt} width='130px' height='130px' />
                    <Typography>{data.name}</Typography>
                  </Box>
                }
              />
            ))}
          </ConnectLine.Side>
          <ConnectLine.Side sideId={rightSideId}>
            {valueData.map((data, index) => (
              <ConnectLine.Item
                key={`${rightSideId}-${index}`}
                itemId={data.content}
                ariaLabel={`점 ${data.content}`}
                isError={isSubmitted && checkError(data.content, TO)}
                content={data.content}
                bgColor={data.backgroundColor}
              />
            ))}
          </ConnectLine.Side>
        </ConnectLine>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box marginTop='12px'>
            <Typography usePre>{solution.map(sol => `${sol[FROM]} - ${sol[TO]}`).join('\n')}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
