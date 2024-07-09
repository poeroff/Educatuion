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
  SvgIcon,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
  Radio,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import arrowRight from '@/assets/icon/arrow_right.svg';
import { C01000860_Atom } from './store';

const P09 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01000860_Atom);
  const [isShow, setShow] = useState<boolean>(false);

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
          type: 'NUMBER',
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
      const isCorrect1 = cardData.p09.answer1.trim() === cardData.p09.solution1;
      const isCorrect2 = cardData.p09.answer2.trim() === cardData.p09.solution2;
      const isCorrect3 = cardData.p09.answer3.trim() === cardData.p09.solution3;
      const isCorrect4 = cardData.p09.answer4.trim() === cardData.p09.solution4;
      const isCorrect5 = cardData.p09.answer5 === cardData.p09.solution5;
      console.log(isCorrect1);
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4 && isCorrect5;
      setCardData(prev => ({
        ...prev,
        p09: { ...prev.p09, isSubmitted: true, isCorrect: isCorrect, isCorrect1, isCorrect2, isCorrect3, isCorrect4, isCorrect5 },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
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
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p09.answer4,
              isAnswer: true,
              isCorrect: isCorrect4,
            },
            {
              subKey: 5,
              type: 'NUMBER',
              value: cardData.p09.answer5,
              isAnswer: true,
              isCorrect: isCorrect5,
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
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p09.answer4,
            answer5: userSubmissionList[0].inputData[4]?.value || cardData.p09.answer5,
            isSubmitted,
            isCorrect1: userSubmissionList[0].inputData[0]?.isCorrect || cardData.p09.isCorrect1,
            isCorrect2: userSubmissionList[0].inputData[1]?.isCorrect || cardData.p09.isCorrect2,
            isCorrect3: userSubmissionList[0].inputData[2]?.isCorrect || cardData.p09.isCorrect3,
            isCorrect4: userSubmissionList[0].inputData[3]?.isCorrect || cardData.p09.isCorrect4,
            IsCorrect5: userSubmissionList[0].inputData[4]?.isCorrect || cardData.p09.isCorrect5,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P09', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSelectChange = (value: number) => {
    setCardData(prev => ({ ...prev, p09: { ...prev.p09, answer5: value } }));
    changeData('P09', 1, 5, value);
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p09: { ...prev.p09, answer1: value } }));
    } else if (subKey === 2) {
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
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={7} />
        오후에 기념품을 받을 수 있는 사람은 몇 명인지 구하고, 문장을 완성해 보세요.
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
    if (cardData.p09.answer5 !== 0) {
      return cardData.p09.answer5;
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
      submitDisabled={!(cardData.p09.answer1 && cardData.p09.answer2 && cardData.p09.answer3 && cardData.p09.answer4 && cardData.p09.answer5)}
      submitBtnColor={
        !(cardData.p09.answer1 && cardData.p09.answer2 && cardData.p09.answer3 && cardData.p09.answer4 && cardData.p09.answer5)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      useRound
    >
      <Box hAlign='center' marginTop='24px'>
        <Box>
          <Input
            textAlign='center'
            name='answer2'
            value={cardData.p09.answer1}
            readOnly={cardData.p09.isSubmitted}
            status={cardData.p09.isSubmitted && !cardData.p09.isCorrect1 ? InputStatus.ERROR : InputStatus.ENABLE}
            onChange={event => handleChange(1, event.target.value)}
            width='130px'
          />
          <Typography>-</Typography>
          <Input
            textAlign='center'
            name='answer3'
            value={cardData.p09.answer2}
            readOnly={cardData.p09.isSubmitted}
            status={cardData.p09.isSubmitted && !cardData.p09.isCorrect2 ? InputStatus.ERROR : InputStatus.ENABLE}
            onChange={event => handleChange(2, event.target.value)}
            width='130px'
          />
          <Typography>=</Typography>
          <Input
            textAlign='center'
            name='answer4'
            value={cardData.p09.answer3}
            readOnly={cardData.p09.isSubmitted}
            status={cardData.p09.isSubmitted && !cardData.p09.isCorrect3 ? InputStatus.ERROR : InputStatus.ENABLE}
            onChange={event => handleChange(3, event.target.value)}
            width='130px'
            ariaLabel='오후에 기념품을 받을 수 있는 사람'
          />
        </Box>
      </Box>
      <Box hAlign='center' marginTop='24px'>
        <Box vAlign='flex-start' marginTop='24px'>
          <SvgIcon src={arrowRight} size='50px' style={{ marginTop: '4px' }} />
          <Typography>
            오후에&nbsp;
            <Input
              textAlign='center'
              name='answer1'
              value={cardData.p09.answer4}
              readOnly={cardData.p09.isSubmitted}
              status={cardData.p09.isSubmitted && !cardData.p09.isCorrect4 ? InputStatus.ERROR : InputStatus.ENABLE}
              onChange={event => handleChange(4, event.target.value)}
              width='130px'
              ariaLabel='오후에 기념품을 받을 수 있는 사람'
            />
            {'명이 기념품을 받을 수 있고 윤서의 입장 순서는 399번째이므로 풍선을 받을 수 ( '}
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
                    isError={cardData.p09.isSubmitted && rowAnswer !== cardData.p09.solution5}
                  >
                    <Typography>{item?.text}</Typography>
                  </Radio>
                  {index < 1 ? ' , ' : ''}
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
                    isError={cardData.p09.isSubmitted && rowAnswer !== cardData.p09.solution5}
                  >
                    {/* {item.text} */}
                    <Typography>{item?.text}</Typography>
                    {/* {index < 1 ? ' , ' : ''} */}
                  </Radio>
                  {index < 1 ? ' , ' : ''}
                </span>
              ))}
            {' ).'}
          </Typography>
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
            <Tag type={ETagLine.GREEN} label='정답' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{'400 / 800, 400, 400'}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{'389를 400으로 생각하여 어림셈을 하면 800-400=400입니다.'}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P09;
