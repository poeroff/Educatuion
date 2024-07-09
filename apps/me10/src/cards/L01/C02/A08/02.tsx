import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
  TMainHeaderInfoTypes,
  Typography,
  IAudioPlayerProps,
  IQuestionProps,
  ConnectLine,
  BottomSheet,
  Box,
  Tag,
  ETagLine,
  EStyleButtonTypes,
  Image,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L01C02A08 } from './store';
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

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C02A08);
  const [isShow, setShow] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const pageNo = 'P02';
  const pageKey = 'p02';

  const peapleSideId = 'peapleSide';
  const valueSideId = 'valueSide';

  type ConnectResult = {
    peapleId: string;
    valueId: string;
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: 'Listen More',
    iconType: 'listeningStrategy',
  };

  const questionInfo: IQuestionProps = {
    type: 'number',
    number: '2.',
    text: (
      <>
        <Typography useGap={false} color='var(--color-yellow-700)' weight='var(--font-weight-extraBold)' lineHeight='50px'>
          Listen Again and Match
        </Typography>
        &nbsp;What do Dylan and Yuna like?
      </>
    ),
    mark: getMarking(cardData[pageKey].isSubmitted, cardData[pageKey].isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C02/A08/ME1-L01-C02-A08-P02.mp3',
  };

  const peopleData = [
    {
      backgroundColor: 'var(--color-red-200)',
      name: 'Dylan',
      itemId: 'Dylan',
    },
    {
      backgroundColor: 'var(--color-green-100)',
      name: 'Yuna',
      itemId: 'Yuna',
    },
  ];

  const valueData = [
    {
      backgroundColor: 'var(--color-blue-100)',
      content: 'action movies',
      itemId: 'actionMovies',
    },
    {
      backgroundColor: 'var(--color-yellow-100)',
      content: 'comedies',
      itemId: 'comedies',
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
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNo]: {
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

    if (props.from.sideId === peapleSideId) {
      input = {
        peapleId: props.from.itemId,
        valueId: props.to.itemId,
      };
      if (props.from.itemId === peopleData[0].itemId) {
        newData[0] = input;
      } else {
        newData[1] = input;
      }
    } else if (props.to.sideId === peapleSideId) {
      input = {
        peapleId: props.to.itemId,
        valueId: props.from.itemId,
      };
      if (props.to.itemId === peopleData[0].itemId) {
        newData[0] = input;
      } else {
        newData[1] = input;
      }
    }

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: newData } }));
    changeData(pageNo, 1, 1, newData);
  };

  const handleDisConnect = (props: IConnectResult) => {
    const currentAnswer = Array.isArray(cardData[pageKey].answer) ? cardData[pageKey].answer : [];
    const newData = [...currentAnswer];

    if (props.from.sideId === peapleSideId) {
      if (props.from.itemId === peopleData[0].itemId) {
        newData[0] = {};
      } else {
        newData[1] = {};
      }
    } else if (props.to.sideId === peapleSideId) {
      if (props.to.itemId === peopleData[0].itemId) {
        newData[0] = {};
      } else {
        newData[1] = {};
      }
    }

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: newData } }));
    changeData(pageNo, 1, 1, newData);
  };

  const validationCheck = () => {
    for (const answer of cardData[pageKey].answer) {
      if (!answer.peapleId && !answer.valueId) {
        return true;
      }
    }
    return false;
  };

  const onSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
      return;
    } else {
      let isCorrect = false;
      cardData[pageKey].answer.map((answer, index) => {
        if (answer.peapleId === cardData[pageKey].solution[index].peapleId && answer.valueId === cardData[pageKey].solution[index].valueId) {
          isCorrect = true;
        } else {
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
              value: cardData[pageKey].answer[0],
              isAnswer: true,
            },
            {
              subKey: 2,
              type: 'TEXT_LIST',
              value: cardData[pageKey].answer[1],
              isAnswer: true,
            },
          ],
        },
      ];
      submitDataWithResult(pageKey, userSubmission, isCorrect);
    }
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

  const getConnectionLines = () => {
    const lines: IConnectResult[] = [];
    if (cardData[pageKey].answer.every(val => val['peapleId'] !== '')) {
      for (const connect of cardData[pageKey].answer) {
        const line: IConnectResult = {
          from: {
            sideId: peapleSideId,
            itemId: connect['peapleId'],
          },
          to: {
            sideId: valueSideId,
            itemId: connect['valueId'],
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
      vAlign='center'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={validationCheck()}
      submitBtnColor={validationCheck() ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      onSubmit={onSubmit}
      useScroll
      scrollRef={scrollRef}
    >
      <Box vAlign='center'>
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
          itemGap='100px'
          useItemFull
        >
          <ConnectLineSide sideId={peapleSideId}>
            {peopleData.map((value, index) => (
              <ConnectLineItem
                isError={cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect}
                value={value.name}
                itemId={value.itemId}
                key={'peaple_' + index}
                bgColor={value.backgroundColor}
              />
            ))}
          </ConnectLineSide>
          <ConnectLineSide sideId={valueSideId}>
            {valueData.map((value, index) => (
              <ConnectLineItem
                isError={cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect}
                value={value.content}
                itemId={value.itemId}
                key={'value_' + index}
                bgColor={value.backgroundColor}
              />
            ))}
          </ConnectLineSide>
        </ConnectLineContainer>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='40px' gap={'20px'} hAlign='center'>
            <Image src={'/L01/C02/A08/ME1-L01-C02-A08-P02.png'} width='700px' height='200px' />
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const ConnectLineContainer = styled(ConnectLine)``;

const ConnectLineSide = styled(ConnectLine.Side)``;

const ConnectLineItem = styled(ConnectLine.Item)``;

export default P02;
