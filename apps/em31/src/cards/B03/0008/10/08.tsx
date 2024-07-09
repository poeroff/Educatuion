import React, { useEffect, useState } from 'react';
import {
  Box,
  Label,
  Typography,
  IQuestionProps,
  Table,
  EStyleTableTypes,
  TBody,
  TR,
  TH,
  TD,
  THead,
  BottomSheet,
  Tag,
  ETagLine,
  Radio,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { B03000810Atom } from './store';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P08 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(B03000810Atom);
  const [isShow, setIsShow] = useState<boolean>(false);
  const containerId = `A01000104P08`;

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={7} />
        에서 알게 된 점을 살펴보세요.
      </>
    ),
    mark: getMarking(cardData.p08.isSubmitted, cardData.p08.isCorrect),
  };

  const th_arr = ['해열제', '하루(시간)', '먹는 시간 간격(시간)', '나눗셈', '먹을 수 있는 횟수(회)'];
  const td_arr = [
    ['다나', 24, 4, '24÷4', 6],
    ['시원', 24, 6, '24÷6', 4],
    ['튼튼', 24, 8, '24÷8', 3],
  ];

  const radioInfo = [
    {
      value: 'increase',
      text: '커집니다',
    },
    {
      value: 'decrease',
      text: '작아집니다',
    },
  ];

  const solutionDetails = {
    solution: `${radioInfo[1].text}.`,
    commentary: '나누어지는 수가 같을 때 나누는 수가 커질수록 몫은 작아집니다.',
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
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p08.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const isCorrect = isAnswer(cardData.p08.answer, cardData.p08.solution);
      setCardData(prev => ({ ...prev, p08: { ...prev.p08, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p08.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P08', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P08')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p08: {
            ...prev.p08,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p08.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isInit: true,
          },
        }));
      } else {
        setCardData(prev => ({
          ...prev,
          p08: {
            ...prev.p08,
            isInit: true,
          },
        }));
      }
      initData('P08', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleRadioChange = (value: string) => {
    setCardData(prev => ({ ...prev, p08: { ...prev.p08, answer: value } }));
    changeData('P08', 1, 1, value);
  };

  useEffect(() => {
    return () => {
      saveData('P08');
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
      submitLabel={cardData.p08.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p08.answer}
      submitBtnColor={!cardData.p08.answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={submitAnswer}
      useRound
      vAlign='start'
    >
      <Box>
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
      <Box>
        <Box marginTop='10px' vAlign='flex-start'>
          <Box height={'60px'} display='flex' alignItems='center'>
            <Label value='ㄷ' lineColor='none' background='#969590' color='var(--color-white)' />
          </Box>
          <Box marginLeft='8px'>
            <Typography fontSize='var(--font-size-36)' lineHeight='56px'>
              나누어지는 수가 같을 때 나누는 수가 커질수록 몫은 어떻게 되는지 설명해 보세요.
            </Typography>
          </Box>
        </Box>
        <Box flexDirection='column' marginLeft='60px'>
          나누어지는 수가 같을 때 나누는 수가 커질수록 몫은 (&nbsp;
          {cardData.p08.isInit &&
            radioInfo.map((radio, index) => {
              return (
                <React.Fragment key={index}>
                  <Radio
                    gap={0}
                    type={'box'}
                    name={'radio-group'}
                    label={radio.text}
                    ariaLabel={radio.text}
                    value={radio.value === cardData.p08.answer}
                    onClick={() => handleRadioChange(radio.value)}
                    readOnly={cardData.p08.isSubmitted}
                    isError={cardData.p08.isSubmitted && cardData.p08.answer !== cardData.p08.solution}
                  >
                    {radio.text}
                  </Radio>
                  {index < radioInfo.length - 1 && <Typography>,</Typography>}
                </React.Fragment>
              );
            })}
          &nbsp; ).
        </Box>
      </Box>
      <BottomSheet height={'50%'} show={cardData.p08.isSubmitted && isShow} bottomSheetTargetId={containerId}>
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
              <Typography>{solutionDetails.commentary}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P08;
