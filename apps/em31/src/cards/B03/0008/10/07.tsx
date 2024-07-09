import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

import {
  BottomSheet,
  Box,
  ConnectLine,
  EStyleButtonTypes,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
  Image,
  Label,
  TBody,
  TD,
  TH,
  THead,
  TR,
  Table,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { B03000810Atom } from './store';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const direction = 'horizontal';

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

type ConnectResult = {
  group1ItemId: string;
  group2ItemId: string;
};

const P07 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(B03000810Atom);
  const [isShow, setIsShow] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerId = `A01000104P07`;

  const questionInfo: IQuestionProps = {
    type: 'icon',
    size: 'large',
    text: (
      <>
        <Label type='icon' size='small' value={6} />
        에서 알게 된 점을 살펴보세요.
      </>
    ),
    mark: getMarking(cardData.p07.isSubmitted, cardData.p07.isCorrect),
  };

  const th_arr = ['해열제', '하루(시간)', '먹는 시간 간격(시간)', '나눗셈', '먹을 수 있는 횟수(회)'];
  const td_arr = [
    ['다나', 24, 4, '24÷4', 6],
    ['시원', 24, 6, '24÷6', 4],
    ['튼튼', 24, 8, '24÷8', 3],
  ];

  const connectInfo = {
    lineSlideIds: { group1: 'group1', group2: 'group2' },
    lineItems: {
      group1: [
        { itemId: 'time_period', text: '하루' },
        { itemId: 'interval', text: '먹는 시간 간격' },
        { itemId: 'meal_frequency', text: '먹을 수 있는 횟수' },
      ],
      group2: [
        { itemId: 'divisor', text: '나누는 수' },
        { itemId: 'dividend', text: '나누어지는 수' },
        { itemId: 'quotient', text: '몫' },
      ],
    },
  };

  const solutionDetails = {
    solution: {
      altText: '',
      imageSrc: '/B03/0008/10/B-EM31-03-0008-1007.png',
      imageWidth: `${Math.floor(334 * 0.5)}px`,
      imageHeight: `${Math.floor(191 * 0.5)}px`,
    },
    commentary: '‘하루’는 나누어지는 수, ‘먹는 시간 간격’은 나누는 수, ‘먹을 수 있는 횟수’는 몫을 나타냅니다.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: { group1ItemId: '', group2ItemId: '' },
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT_LIST',
          value: { group1ItemId: '', group2ItemId: '' },
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'TEXT_LIST',
          value: { group1ItemId: '', group2ItemId: '' },
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P07')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p07: {
            ...prev.p07,
            answer: userSubmissionList[0]?.inputData.map((item: { value: ConnectResult }) => item.value) || cardData.p07.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0]?.isCorrect : false,
          },
        }));
      }
      initData('P07', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleConnect = (props: IConnectResult) => {
    const currentAnswer = Array.isArray(cardData.p07.answer) ? cardData.p07.answer : [];
    const newData = [...currentAnswer];
    let input: ConnectResult;
    let findIndex = -1;

    if (props.from.sideId === connectInfo.lineSlideIds.group1) {
      input = {
        group1ItemId: props.from.itemId,
        group2ItemId: props.to.itemId,
      };
      connectInfo.lineItems.group1.forEach((group1, index) => {
        if (props.from.itemId === group1.itemId) {
          newData[index] = input;
          findIndex = index;
        }
      });
    } else if (props.to.sideId === connectInfo.lineSlideIds.group1) {
      input = {
        group1ItemId: props.to.itemId,
        group2ItemId: props.from.itemId,
      };
      connectInfo.lineItems.group1.forEach((group1, index) => {
        if (props.to.itemId === group1.itemId) {
          newData[index] = input;
          findIndex = index;
        }
      });
    }

    setCardData(prev => ({ ...prev, p07: { ...prev.p07, answer: newData } }));
    changeData('P07', 1, findIndex + 1, input!);
  };

  const handleDisConnect = (props: IConnectResult) => {
    const currentAnswer = Array.isArray(cardData.p07.answer) ? cardData.p07.answer : [];
    const newData = [...currentAnswer];
    let findIndex = -1;

    if (props.from.sideId === connectInfo.lineSlideIds.group1) {
      connectInfo.lineItems.group1.forEach((group1, index) => {
        if (props.from.itemId === group1.itemId) {
          newData[index] = { group1ItemId: '', group2ItemId: '' };
          findIndex = index;
        }
      });
    } else if (props.to.sideId === connectInfo.lineSlideIds.group1) {
      connectInfo.lineItems.group1.forEach((group1, index) => {
        if (props.to.itemId === group1.itemId) {
          newData[index] = { group1ItemId: '', group2ItemId: '' };
          findIndex = index;
        }
      });
    }

    setCardData(prev => ({ ...prev, p07: { ...prev.p07, answer: newData } }));
    changeData('P07', 1, findIndex + 1, { group1ItemId: '', group2ItemId: '' });
  };

  const validationCheck = () => {
    for (const answer of cardData.p07.answer) {
      if (!answer.group1ItemId && !answer.group2ItemId) {
        return true;
      }
    }
    return false;
  };

  const onSubmit = () => {
    if (cardData.p07.isSubmitted) {
      setIsShow(!isShow);
      return;
    } else {
      const isCorrect = cardData.p07.answer.every((answer, index) => {
        return (
          isAnswer(answer.group1ItemId, cardData.p07.solution[index].group1ItemId) &&
          isAnswer(answer.group2ItemId, cardData.p07.solution[index].group2ItemId)
        );
      });

      setCardData(prev => ({ ...prev, p07: { ...prev.p07, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: { group1ItemId: cardData.p07.answer[0].group1ItemId, group2ItemId: cardData.p07.answer[0].group2ItemId },
              isAnswer: true,
            },
            {
              subKey: 2,
              type: 'TEXT_LIST',
              value: { group1ItemId: cardData.p07.answer[1].group1ItemId, group2ItemId: cardData.p07.answer[1].group2ItemId },
              isAnswer: true,
            },
            {
              subKey: 3,
              type: 'TEXT_LIST',
              value: { group1ItemId: cardData.p07.answer[2].group1ItemId, group2ItemId: cardData.p07.answer[2].group2ItemId },
              isAnswer: true,
            },
          ],
          isCorrect: isCorrect,
        },
      ];
      submitDataWithResult('P07', userSubmission, isCorrect);
    }
  };

  const getConnectionLines = () => {
    const lines: IConnectResult[] = [];
    if (cardData.p07.answer.every(val => val['group1ItemId'] !== '')) {
      for (const connect of cardData.p07.answer) {
        const line: IConnectResult = {
          from: {
            sideId: connectInfo.lineSlideIds.group1,
            itemId: connect['group1ItemId'],
          },
          to: {
            sideId: connectInfo.lineSlideIds.group2,
            itemId: connect['group2ItemId'],
          },
        };
        lines.push(line);
      }
    }
    return lines;
  };

  const checkError = (item: string) => {
    let isError = true;
    cardData.p07.answer.map((ans, index) => {
      if (ans.group1ItemId === item && ans.group2ItemId === cardData.p07.solution[index].group2ItemId) {
        isError = false;
      } else if (ans.group2ItemId === item && ans.group2ItemId === cardData.p07.solution[index].group2ItemId) {
        isError = false;
      }
    });
    return isError;
  };

  useEffect(() => {
    return () => {
      saveData('P07');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId={containerId}
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p07.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={validationCheck()}
      submitBtnColor={validationCheck() ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={onSubmit}
      useRound
    >
      <Box marginTop='233px'>
        <Table color={EStyleTableTypes.TERTIARY} sizes={['110px', '149px', 'auto', '142px', 'auto']}>
          <THead>
            <TR>
              {th_arr.map((item, idx) => {
                return (
                  <TH key={idx} scope='col' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                    {item}
                  </TH>
                );
              })}
            </TR>
          </THead>
          <TBody>
            {td_arr.map((item, index) => (
              <TR key={index}>
                {item.map((value, index) => {
                  return (
                    <TD key={index} hAlign='center' color={EStyleTableTypes.TERTIARY}>
                      {value}
                    </TD>
                  );
                })}
              </TR>
            ))}
          </TBody>
        </Table>
      </Box>
      <Box marginTop='10px' vAlign='flex-start'>
        <Box height={'60px'} display='flex' alignItems='center'>
          <Label value='ㄴ' lineColor='none' background='#969590' color='var(--color-white)' />
        </Box>
        <Box marginLeft='8px'>
          <Typography fontSize='var(--font-size-36)' lineHeight='56px'>
            ‘하루’, ‘먹는 시간 간격’, ‘먹을 수 있는 횟수’는 나눗셈식에서 각각 무엇을 나타내는지 이어 보세요.
          </Typography>
        </Box>
      </Box>
      <Box useFull marginTop='15px'>
        <ConnectLineContainer
          direction={direction}
          useFull
          useItemFull
          onConnect={props => {
            handleConnect(props);
          }}
          onDisConnect={props => {
            handleDisConnect(props);
          }}
          connectLines={getConnectionLines()}
          disabled={cardData.p07.isSubmitted}
          targetRef={scrollRef}
        >
          <ConnectLineSide sideId={connectInfo.lineSlideIds.group1}>
            {connectInfo.lineItems.group1.map((value, index) => (
              <ConnectLineItem
                isError={cardData.p07.isSubmitted && checkError(value.itemId)}
                value={value.itemId}
                content={<>{value.text}</>}
                itemId={value.itemId}
                key={`group1_` + index}
              />
            ))}
          </ConnectLineSide>
          <ConnectLineSide sideId={connectInfo.lineSlideIds.group2} bgColor='var(--color-grey-50)'>
            {connectInfo.lineItems.group2.map((value, index) => (
              <ConnectLineItem
                isError={cardData.p07.isSubmitted && checkError(value.itemId)}
                value={value.itemId}
                content={<>{value.text}</>}
                itemId={value.itemId}
                key={`group2_` + index}
              />
            ))}
          </ConnectLineSide>
        </ConnectLineContainer>
      </Box>
      <BottomSheet height={'50%'} show={cardData.p07.isSubmitted && isShow} bottomSheetTargetId={containerId}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Image
                src={solutionDetails.solution.imageSrc}
                width={solutionDetails.solution?.imageWidth || '100%'}
                height={solutionDetails.solution?.imageHeight || '100%'}
                alt={solutionDetails.solution.altText}
              />
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{solutionDetails.commentary}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const ConnectLineContainer = styled(ConnectLine)``;

const ConnectLineSide = styled(ConnectLine.Side)`
  &:first-of-type {
    height: 180px;
  }
`;

const ConnectLineItem = styled(ConnectLine.Item)``;

export default P07;
