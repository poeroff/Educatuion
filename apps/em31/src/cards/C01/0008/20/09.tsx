import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  Radio,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { C01000820_Atom } from './store';

const P09 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01000820_Atom);
  const [isShow, setShow] = useState<boolean>(false);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
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
      ],
    },
  ];

  const onCalculate = () => {
    if (cardData.p09.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p09.answer1 === cardData.p09.solution1;
      const isCorrect2 = cardData.p09.answer2.trim() === cardData.p09.solution2;
      const isCorrect3 = cardData.p09.answer3.trim() === cardData.p09.solution3;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
      setCardData(prev => ({
        ...prev,
        p09: { ...prev.p09, isSubmitted: true, isCorrect: isCorrect, isCorrect1, isCorrect2, isCorrect3 },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p09.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p09.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p09.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P09', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P09')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p09: {
            ...prev.p09,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p09.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p09.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p09.answer3,
            isSubmitted,
            isCorrect1: userSubmissionList[0].inputData[0]?.isCorrect || cardData.p09.isCorrect1,
            isCorrect2: userSubmissionList[0].inputData[1]?.isCorrect || cardData.p09.isCorrect2,
            isCorrect3: userSubmissionList[0].inputData[2]?.isCorrect || cardData.p09.isCorrect3,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P09', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const handleSelectChange = (value: number) => {
    setCardData(prev => ({ ...prev, p09: { ...prev.p09, answer1: value } }));
    changeData('P09', 1, 1, value);
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 2) {
      setCardData(prev => ({ ...prev, p09: { ...prev.p09, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p09: { ...prev.p09, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p09: { ...prev.p09, answer4: value } }));
    }
    changeData('P09', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P09');
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
    // eslint-disable-next-line
  }, [pageIds]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={6} />
        윤서가 기념품을 받을 수 있을지 답을 쓰고 왜 그렇게 생각하는지 이유를 써보세요.
      </>
    ),
    mark: cardData.p09.isSubmitted ? (cardData.p09.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const data = [
    {
      text: '있습니다',
    },
    {
      text: '없습니다',
    },
  ];

  const rowAnswer = useMemo(() => {
    if (cardData.p09.answer1 !== 0) {
      return cardData.p09.answer1;
    }
  }, [cardData]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      onSubmit={onCalculate}
      submitLabel={cardData.p09.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p09.answer1 && cardData.p09.answer2 && cardData.p09.answer3)}
      submitBtnColor={
        !(cardData.p09.answer1 && cardData.p09.answer2 && cardData.p09.answer3)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      useRound
    >
      <Box hAlign='center'>
        <Box vAlign='baseline' flexDirection='column' marginTop='24px'>
          <Box hAlign='center'>
            <Label
              value={'답'}
              color='var(--color-yellow-800)'
              background='var(--color-yellow-100)'
              lineColor='var(--color-yellow-700)'
              marginRight={8}
            />

            <Typography>
              {'기념품을 받을 수 ( '}
              {rowAnswer &&
                data.map((item, index) => (
                  <span key={'stage' + index}>
                    <Radio
                      type={'box'}
                      gap={0}
                      name={'radio-group'}
                      label={item.text}
                      value={rowAnswer === index + 1}
                      onClick={() => handleSelectChange(index + 1)}
                      readOnly={cardData.p09.isSubmitted}
                      isError={cardData.p09.isSubmitted && rowAnswer !== cardData.p09.solution1}
                    >
                      {/* {item.text} */}
                      <Typography>{item?.text}</Typography>
                      {/* {index < 1 ? <Typography>,</Typography> : ''} */}
                    </Radio>
                    {index < 1 ? <Typography>,</Typography> : ''}
                  </span>
                ))}
              {!rowAnswer &&
                data.map((item, index) => (
                  <span key={'stage' + index}>
                    <Radio
                      type={'box'}
                      gap={0}
                      name={'radio-group'}
                      label={item.text}
                      value={false}
                      onClick={() => handleSelectChange(index + 1)}
                      readOnly={cardData.p09.isSubmitted}
                      isError={cardData.p09.isSubmitted && rowAnswer !== cardData.p09.solution1}
                    >
                      {/* {item.text} */}
                      <Typography>{item?.text}</Typography>
                      {/* {index < 1 ? <Typography>,</Typography> : ''} */}
                    </Radio>
                    {index < 1 ? <Typography>,</Typography> : ''}
                  </span>
                ))}
              {' ).'}
            </Typography>
          </Box>
          <Box hAlign='center' vAlign={'baseline'} marginTop='8px'>
            <Label
              value={'이유'}
              color='var(--color-yellow-800)'
              background='var(--color-yellow-100)'
              lineColor='var(--color-yellow-700)'
              marginRight={8}
            />
            {/* <Input width='217px' textAlign='center' value={value2} onChange={e => setValue2(e.target.value)} ariaLabel='답을 적어주세요.' /> */}
            <Typography>
              {'어림셈을 하면 오후에 기념품을 받을 수 있는 사람'}
              <br />
              <Box>
                <Typography useGap={false}>{'은'}</Typography>
                <Typography align='right'>
                  <Input
                    textAlign='center'
                    type='number'
                    inputSize='x-small'
                    name='answer2'
                    value={cardData.p09.answer2}
                    readOnly={cardData.p09.isSubmitted}
                    status={cardData.p09.isSubmitted && !cardData.p09.isCorrect2 ? InputStatus.ERROR : InputStatus.ENABLE}
                    onChange={event => handleChange(2, event.target.value)}
                    width='130px'
                    ariaLabel='어림셈으로 오후에 기념품을 받을 수 있는 사람'
                  />
                  {'명쯤이고 윤서의 입장 순서는'}
                </Typography>
                <Typography></Typography>
              </Box>
              <Input
                textAlign='center'
                type='number'
                inputSize='x-small'
                name='answer3'
                value={cardData.p09.answer3}
                readOnly={cardData.p09.isSubmitted}
                status={cardData.p09.isSubmitted && !cardData.p09.isCorrect3 ? InputStatus.ERROR : InputStatus.ENABLE}
                onChange={event => handleChange(3, event.target.value)}
                width='130px'
                ariaLabel='윤서의 입장 순서'
              />
              {'번째이기 때문입니다.'}
            </Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{'있습니다 / 400, 399'}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{'어림셈을 이용하여 문제를 해결합니다.'}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P09;
