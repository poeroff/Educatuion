import styled from '@emotion/styled';

import {
  Box,
  EStyleButtonTypes,
  IQuestionProps,
  TMainHeaderInfoTypes,
  Tag,
  BottomSheet,
  ETagLine,
  ConnectLine,
  Typography,
  Image,
  Button,
  EStyleSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import React, { useEffect, useRef, useState } from 'react';
import { L01C07A02b, getDialogText } from './store';

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

const P01 = () => {
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C07A02b);
  const [isShow, setShow] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleShowDialog = () => {
    setIsShowDialog(!isShowDialog);
  };

  const pageNo = 'P01';
  const pageKey = 'p01';

  const peopleSideId = 'peopleSide';
  const valueSideId = 'valueSide';

  type ConnectResult = {
    peopleId: string;
    valueId: string;
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'readAndWrite',
  };

  const questionText: React.ReactNode = (
    <>
      <Typography fontSize='inherit'>그림을 참고하여 학생들이 학교 생존 키트에 넣고 싶은 것을 연결해 봅시다.</Typography>{' '}
      <Box hAlign='flex-end' width='940px' marginTop='-10px'>
        <Button
          tabIndex={101}
          minWidth='96px'
          size={EStyleSizes.SMALL}
          color={EStyleButtonTypes.SECONDARY}
          label='지문 보기'
          useRound
          onClick={handleShowDialog}
        />
      </Box>
    </>
  );

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: questionText,
    mark: getMarking(cardData[pageKey].isSubmitted, cardData[pageKey].isCorrect),
  };

  const getImage = (index: number): React.ReactNode => {
    const imageSrcPrefix = '/L01/C07/A02/';
    const imageSrcList = ['ME1-L01-C07-A02-P01-02.jpg', 'ME1-L01-C07-A02-P02-02.jpg', 'ME1-L01-C07-A02-P03-02.jpg', 'ME1-L01-C07-A02-P04-02.jpg'];
    const imageAltList = [
      '남학생의 얼굴과 공 ‘Jiwon’',
      '여학생의 얼굴과 반창고 ‘Emily’',
      '남학생의 얼굴과 지우개 ‘Mike’',
      '여학생의 얼굴과 손거울 ‘Somin’',
    ];
    return <Image width='150px' height='150px' src={imageSrcPrefix + imageSrcList[index]} alt={imageAltList[index]} />;
  };

  const peopleData = [
    {
      itemId: 'Jiwon',
    },
    {
      itemId: 'Emily',
    },
    {
      itemId: 'Mike',
    },
    {
      itemId: 'Somin',
    },
  ];

  const valueData = [
    {
      itemId: 'a mirror',
    },
    {
      itemId: 'an eraser',
    },
    {
      itemId: 'a Band-Aid',
    },
    {
      itemId: 'a stress ball',
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: { peopleId: '', valueId: '' },
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT_LIST',
          value: { peopleId: '', valueId: '' },
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'TEXT_LIST',
          value: { peopleId: '', valueId: '' },
          isAnswer: true,
        },
        {
          subKey: 4,
          type: 'TEXT_LIST',
          value: { peopleId: '', valueId: '' },
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

    if (props.from.sideId === peopleSideId) {
      input = {
        peopleId: props.from.itemId,
        valueId: props.to.itemId,
      };
      peopleData.forEach((person, index) => {
        if (props.from.itemId === person.itemId) {
          newData[index] = input;
        }
      });
    } else if (props.to.sideId === peopleSideId) {
      input = {
        peopleId: props.to.itemId,
        valueId: props.from.itemId,
      };
      peopleData.forEach((person, index) => {
        if (props.to.itemId === person.itemId) {
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

    if (props.from.sideId === peopleSideId) {
      peopleData.forEach((person, index) => {
        if (props.from.itemId === person.itemId) {
          newData[index] = { peopleId: '', valueId: '' };
        }
      });
    } else if (props.to.sideId === peopleSideId) {
      peopleData.forEach((person, index) => {
        if (props.to.itemId === person.itemId) {
          newData[index] = { peopleId: '', valueId: '' };
        }
      });
    }
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: newData } }));
    changeData(pageNo, 1, 1, newData);
  };

  const validationCheck = () => {
    for (const answer of cardData[pageKey].answer) {
      if (!answer.peopleId && !answer.valueId) {
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
      let isCorrect = true;
      cardData[pageKey].answer.map((answer, index) => {
        if (!(answer.peopleId === cardData[pageKey].solution[index].peopleId && answer.valueId === cardData[pageKey].solution[index].valueId)) {
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
              value: { peopleId: cardData[pageKey].answer[0].peopleId, valueId: cardData[pageKey].answer[0].valueId },
              isAnswer: true,
            },
            {
              subKey: 2,
              type: 'TEXT_LIST',
              value: { peopleId: cardData[pageKey].answer[1].peopleId, valueId: cardData[pageKey].answer[1].valueId },
              isAnswer: true,
            },
            {
              subKey: 3,
              type: 'TEXT_LIST',
              value: { peopleId: cardData[pageKey].answer[2].peopleId, valueId: cardData[pageKey].answer[2].valueId },
              isAnswer: true,
            },
            {
              subKey: 4,
              type: 'TEXT_LIST',
              value: { peopleId: cardData[pageKey].answer[3].peopleId, valueId: cardData[pageKey].answer[3].valueId },
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
    return () => {
      saveData(pageNo);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const getConnectionLines = () => {
    const lines: IConnectResult[] = [];
    if (cardData[pageKey].answer.every(val => val['peopleId'] !== '')) {
      for (const connect of cardData[pageKey].answer) {
        const line: IConnectResult = {
          from: {
            sideId: peopleSideId,
            itemId: connect['peopleId'],
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

  const checkError = (item: string) => {
    let isError = true;
    cardData[pageKey].answer.map((ans, index) => {
      if (ans.peopleId === item && ans.valueId === cardData[pageKey].solution[index].valueId) {
        isError = false;
      } else if (ans.valueId === item && ans.valueId === cardData[pageKey].solution[index].valueId) {
        isError = false;
      }
    });
    return isError;
  };

  return (
    <Container
      bodyId='targetContainer'
      vAlign='flex-start'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={validationCheck()}
      submitBtnColor={validationCheck() ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      onSubmit={onSubmit}
      useScroll
    >
      {' '}
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
        <ConnectLineSide sideId={peopleSideId}>
          {peopleData.map((value, index) => (
            <ConnectLineItem
              isError={cardData[pageKey].isSubmitted && checkError(value.itemId)}
              value={value.itemId}
              content={getImage(index)}
              dotPosition={'bottom'}
              itemId={value.itemId}
              key={'people_' + index}
            />
          ))}
        </ConnectLineSide>
        <ConnectLineSide sideId={valueSideId}>
          {valueData.map((value, index) => (
            <ConnectLineItem
              isError={cardData[pageKey].isSubmitted && checkError(value.itemId)}
              value={value.itemId}
              dotPosition={'top'}
              itemId={value.itemId}
              key={'value_' + index}
            />
          ))}
        </ConnectLineSide>
      </ConnectLineContainer>
      {getDialogText(isShowDialog, handleShowDialog)}
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box>
            <Box marginTop='10px' marginBottom='22px'>
              <Typography usePre>{cardData[pageKey].solution.map((sol, idx) => `${sol.peopleId} - ${sol.valueId}\n`).join('')}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
  ``;
};

const ConnectLineContainer = styled(ConnectLine)`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  flex-direction: column;
`;

const ConnectLineSide = styled(ConnectLine.Side)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
`;

const ConnectLineItem = styled(ConnectLine.Item)`
  button {
    background-color: transparent;
    width: 180px;
    height: 180px;
    padding: 4px 12px;
    border-radius: 8px;
    text-align: center;
  }
  > div {
    background-color: var(--color-grey-600);
  }
`;

export default P01;
