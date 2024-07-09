import { useEffect, useState } from 'react';
import {
  Box,
  Label,
  Typography,
  Input,
  IQuestionProps,
  Table,
  EStyleTableTypes,
  TBody,
  TR,
  TH,
  TD,
  THead,
  Image,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleButtonTypes,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { B03000810Atom } from './store';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P05 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(B03000810Atom);
  const [isShow, setShow] = useState<boolean>(false);
  const containerId = `A01000104P05`;

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={4} />
        해열제를 종류별로 하루 동안 먹을 수 있는 횟수를 구해보세요.
      </>
    ),
    mark: getMarking(cardData.p05.isSubmitted, cardData.p05.isCorrect),
  };

  const imageInfo = {
    altText:
      '3가지 해열제가 있습니다. 해열제의 이름과 용법은 다음과 같습니다. 다나 : 4시간마다 먹어요, 시원 : 6시간마다 먹어요, 튼튼 : 8시간마다 먹어요',
    imageSrc: '/B03/0008/10/B-EM31-03-0008-1002.png',
    imageWidth: `${Math.floor(447 * 0.9)}px`,
    imageHeight: `${Math.floor(224 * 0.9)}px`,
  };

  const th_arr = ['해열제', '하루(시간)', '먹는 시간 간격(시간)', '나눗셈', '먹을 수 있는 횟수(회)'];
  const td_arr = [
    [
      '다나',
      24,
      4,
      '24÷4',
      <Input
        key='input1'
        width='65px'
        inputSize='small'
        type='number'
        value={cardData.p05.answer1}
        onChange={event => handleChange(1, event.target.value)}
        ariaLabel='다나의 먹을 수 있는 횟수(회)'
        readOnly={cardData.p05.isSubmitted}
        status={cardData.p05.isSubmitted && !isAnswer(cardData.p05.answer1, cardData.p05.solution1) && InputStatus.ERROR}
      />,
    ],
    [
      '시원',
      24,
      6,
      [
        '24÷',
        <Input
          key='input2'
          width='65px'
          inputSize='small'
          type='number'
          value={cardData.p05.answer2}
          onChange={event => handleChange(2, event.target.value)}
          ariaLabel='시원의 나눗셈'
          readOnly={cardData.p05.isSubmitted}
          status={cardData.p05.isSubmitted && !isAnswer(cardData.p05.answer2, cardData.p05.solution2) && InputStatus.ERROR}
        />,
      ],
      <Input
        key='input3'
        width='65px'
        inputSize='small'
        type='number'
        value={cardData.p05.answer3}
        onChange={event => handleChange(3, event.target.value)}
        ariaLabel='시원의 먹을 수 있는 횟수(회)'
        readOnly={cardData.p05.isSubmitted}
        status={cardData.p05.isSubmitted && !isAnswer(cardData.p05.answer3, cardData.p05.solution3) && InputStatus.ERROR}
      />,
    ],
    [
      '튼튼',
      24,
      <Input
        key='input4'
        width='65px'
        inputSize='small'
        type='number'
        value={cardData.p05.answer4}
        onChange={event => handleChange(4, event.target.value)}
        ariaLabel='튼튼의 먹는 시간 간격(시간)'
        readOnly={cardData.p05.isSubmitted}
        status={cardData.p05.isSubmitted && !isAnswer(cardData.p05.answer4, cardData.p05.solution4) && InputStatus.ERROR}
      />,
      [
        '24÷',
        <Input
          key='input5'
          width='65px'
          inputSize='small'
          type='number'
          value={cardData.p05.answer5}
          onChange={event => handleChange(5, event.target.value)}
          ariaLabel='튼튼의 나눗셈'
          readOnly={cardData.p05.isSubmitted}
          status={cardData.p05.isSubmitted && !isAnswer(cardData.p05.answer5, cardData.p05.solution5) && InputStatus.ERROR}
        />,
      ],
      <Input
        key='input6'
        width='65px'
        inputSize='small'
        type='number'
        value={cardData.p05.answer6}
        onChange={event => handleChange(6, event.target.value)}
        ariaLabel='튼튼의 먹을 수 있는 횟수(회)'
        readOnly={cardData.p05.isSubmitted}
        status={cardData.p05.isSubmitted && !isAnswer(cardData.p05.answer6, cardData.p05.solution6) && InputStatus.ERROR}
      />,
    ],
  ];

  const solutionDetails = {
    solution: '(위에서부터) 6 / 6, 4 / 8, 8, 3',
    commentary: [
      '다나 해열제는 4시간마다 먹으므로 하루 동안 먹을 수 있는 횟수는 24÷4=6(회),',
      '시원 해열제는 6시간마다 먹으므로 하루 동안 먹을 수 있는 횟수는 24÷6=4(회)',
      '튼튼 해열제는 8시간마다 먹으므로 하루 동안 먹을 수 있는 횟수는 24÷8=3(회)입니다.',
    ],
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 6,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p05.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p05.answer1, cardData.p05.solution1);
      const isCorrect2 = isAnswer(cardData.p05.answer2, cardData.p05.solution2);
      const isCorrect3 = isAnswer(cardData.p05.answer3, cardData.p05.solution3);
      const isCorrect4 = isAnswer(cardData.p05.answer4, cardData.p05.solution4);
      const isCorrect5 = isAnswer(cardData.p05.answer5, cardData.p05.solution5);
      const isCorrect6 = isAnswer(cardData.p05.answer6, cardData.p05.solution6);
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4 && isCorrect5 && isCorrect6;
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p05.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p05.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p05.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p05.answer4,
              isAnswer: true,
              isCorrect: isCorrect4,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p05.answer5,
              isAnswer: true,
              isCorrect: isCorrect5,
            },
            {
              subKey: 6,
              type: 'TEXT',
              value: cardData.p05.answer6,
              isAnswer: true,
              isCorrect: isCorrect6,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P05', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P05')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p05: {
            ...prev.p05,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p05.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p05.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p05.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p05.answer4,
            answer5: userSubmissionList[0].inputData[4]?.value || cardData.p05.answer5,
            answer6: userSubmissionList[0].inputData[5]?.value || cardData.p05.answer6,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P05', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer4: value } }));
    } else if (subKey === 5) {
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer5: value } }));
    } else if (subKey === 6) {
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer6: value } }));
    }
    changeData('P05', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P05');
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
      submitLabel={cardData.p05.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={
        !(
          cardData.p05.answer1 &&
          cardData.p05.answer2 &&
          cardData.p05.answer3 &&
          cardData.p05.answer4 &&
          cardData.p05.answer5 &&
          cardData.p05.answer6
        )
      }
      submitBtnColor={
        !(
          cardData.p05.answer1 &&
          cardData.p05.answer2 &&
          cardData.p05.answer3 &&
          cardData.p05.answer4 &&
          cardData.p05.answer5 &&
          cardData.p05.answer6
        )
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      onSubmit={submitAnswer}
      useRound
      vAlign='start'
    >
      <Box useRound tabIndex={101}>
        <Box vAlign='center' flexDirection='column'>
          <Image src={imageInfo.imageSrc} width={imageInfo?.imageWidth || '100%'} height={imageInfo?.imageHeight || '100%'} alt={imageInfo.altText} />
        </Box>
      </Box>
      <Box>
        <Box marginTop='10px' vAlign='flex-start'>
          <Box height={'60px'} display='flex' alignItems='center'>
            <Label value='ㄹ' lineColor='none' background='#969590' color='var(--color-white)' />
          </Box>
          <Box marginLeft='8px'>
            <Typography fontSize='var(--font-size-36)' lineHeight='56px'>
              표를 완성하여 해열제 종류별로 하루 동안 먹을 수 있는 횟수를 구해보세요.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box marginTop='24px'>
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
      <BottomSheet height={'50%'} show={cardData.p05.isSubmitted && isShow} bottomSheetTargetId={containerId}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{solutionDetails.solution}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'0px'}>
              {solutionDetails.commentary.map((commentary, index) => (
                <Typography key={index}>{commentary}</Typography>
              ))}
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P05;
