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
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import arrowRight from '@/assets/icon/arrow_right.svg';
import { C01000820_Atom } from './store';

const P08 = () => {
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
      ],
    },
  ];

  const onCalculate = () => {
    if (cardData.p08.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p08.answer1.trim() === cardData.p08.solution1;
      const isCorrect2 = cardData.p08.answer2.trim() === cardData.p08.solution2;
      const isCorrect3 = cardData.p08.answer3.trim() === cardData.p08.solution3;
      const isCorrect4 = cardData.p08.answer4.trim() === cardData.p08.solution4;
      console.log(isCorrect1);
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4;
      setCardData(prev => ({
        ...prev,
        p08: { ...prev.p08, isSubmitted: true, isCorrect: isCorrect, isCorrect1, isCorrect2, isCorrect3, isCorrect4 },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p08.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p08.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p08.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p08.answer4,
              isAnswer: true,
              isCorrect: isCorrect4,
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p08.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p08.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p08.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p08.answer4,
            isSubmitted,
            isCorrect1: userSubmissionList[0].inputData[0]?.isCorrect || cardData.p08.isCorrect1,
            isCorrect2: userSubmissionList[0].inputData[1]?.isCorrect || cardData.p08.isCorrect2,
            isCorrect3: userSubmissionList[0].inputData[2]?.isCorrect || cardData.p08.isCorrect3,
            isCorrect4: userSubmissionList[0].inputData[3]?.isCorrect || cardData.p08.isCorrect4,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P08', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p08: { ...prev.p08, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p08: { ...prev.p08, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p08: { ...prev.p08, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p08: { ...prev.p08, answer4: value } }));
    }
    changeData('P08', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P08');
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
        <Label type='icon' size='small' value={5} />
        오후에 기념품을 받을 수 있는 사람은 몇 명쯤일지 어림하는 식을 쓰고 어림셈을 해 보세요.
      </>
    ),
    mark: cardData.p08.isSubmitted ? (cardData.p08.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      onSubmit={onCalculate}
      submitLabel={cardData.p08.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p08.answer1 && cardData.p08.answer2 && cardData.p08.answer3 && cardData.p08.answer4)}
      submitBtnColor={
        !(cardData.p08.answer1 && cardData.p08.answer2 && cardData.p08.answer3 && cardData.p08.answer4)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      useRound
    >
      <Box hAlign='center' marginTop='24px'>
        <Box vAlign='flex-start' marginTop='24px'>
          <Typography>
            389를&nbsp;
            <Input
              textAlign='center'
              type='number'
              name='answer1'
              value={cardData.p08.answer1}
              readOnly={cardData.p08.isSubmitted}
              status={cardData.p08.isSubmitted && !cardData.p08.isCorrect1 ? InputStatus.ERROR : InputStatus.ENABLE}
              onChange={event => handleChange(1, event.target.value)}
              width='130px'
              ariaLabel='스케치북 1권과 자 1개를 더해 어림한 값'
            />
            으로 생각합니다.
          </Typography>
        </Box>
      </Box>
      <Box hAlign='center' marginTop='24px'>
        <Box vAlign='flex-start' marginTop='24px'>
          <SvgIcon src={arrowRight} size='50px' style={{ marginTop: '4px' }} />
          <Input
            textAlign='center'
            type='number'
            name='answer2'
            value={cardData.p08.answer2}
            readOnly={cardData.p08.isSubmitted}
            status={cardData.p08.isSubmitted && !cardData.p08.isCorrect2 ? InputStatus.ERROR : InputStatus.ENABLE}
            onChange={event => handleChange(2, event.target.value)}
            width='130px'
          />
          <Typography>-</Typography>
          <Input
            textAlign='center'
            type='number'
            name='answer3'
            value={cardData.p08.answer3}
            readOnly={cardData.p08.isSubmitted}
            status={cardData.p08.isSubmitted && !cardData.p08.isCorrect3 ? InputStatus.ERROR : InputStatus.ENABLE}
            onChange={event => handleChange(3, event.target.value)}
            width='130px'
          />
          <Typography>=</Typography>
          <Input
            textAlign='center'
            type='number'
            name='answer4'
            value={cardData.p08.answer4}
            readOnly={cardData.p08.isSubmitted}
            status={cardData.p08.isSubmitted && !cardData.p08.isCorrect4 ? InputStatus.ERROR : InputStatus.ENABLE}
            onChange={event => handleChange(4, event.target.value)}
            width='130px'
            ariaLabel='오후에 기념품을 받을 수 있는 사람'
          />
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
              <Typography>{'400 / 800, 400, 400'}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{'389를 400으로 생각하여 어림셈을 하면 800-400=400입니다.'}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P08;
