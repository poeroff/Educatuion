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
  Question,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import arrowRight from '@/assets/icon/arrow_right.svg';
import { C01000856 } from './store';
const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01000856);
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
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p01.answer1.trim() === cardData.p01.solution1;
      const isCorrect2 = cardData.p01.answer2.trim() === cardData.p01.solution2;
      const isCorrect3 = cardData.p01.answer3.trim() === cardData.p01.solution3;
      const isCorrect4 = cardData.p01.answer4.trim() === cardData.p01.solution4;
      const isCorrect5 = cardData.p01.answer5 === cardData.p01.solution5;
      console.log(isCorrect1);
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4 && isCorrect5;
      setCardData(prev => ({
        ...prev,
        p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect, isCorrect1, isCorrect2, isCorrect3, isCorrect4, isCorrect5 },
      }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p01.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p01.answer4,
              isAnswer: true,
              isCorrect: isCorrect4,
            },
            {
              subKey: 5,
              type: 'NUMBER',
              value: cardData.p01.answer5,
              isAnswer: true,
              isCorrect: isCorrect5,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };
  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p01.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p01.answer4,
            answer5: userSubmissionList[0].inputData[4]?.value || cardData.p01.answer5,
            isSubmitted,
            isCorrect1: userSubmissionList[0].inputData[0]?.isCorrect || cardData.p01.isCorrect1,
            isCorrect2: userSubmissionList[0].inputData[1]?.isCorrect || cardData.p01.isCorrect2,
            isCorrect3: userSubmissionList[0].inputData[2]?.isCorrect || cardData.p01.isCorrect3,
            isCorrect4: userSubmissionList[0].inputData[3]?.isCorrect || cardData.p01.isCorrect4,
            IsCorrect5: userSubmissionList[0].inputData[4]?.isCorrect || cardData.p01.isCorrect5,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const handleSelectChange = (value: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer5: value } }));
    changeData('P01', 1, 5, value);
  };
  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer4: value } }));
    }
    changeData('P01', 1, subKey, value);
  };
useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);
  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
  };
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='baseline' fontSize={28} width="920px" fontWeight={'var(--font-weight-medium)'}>
        <Box marginRight={8}>[4~7]</Box>
        <Typography lineHeight='48px'>
        놀이공원에서는 하루 입장객 900명에게 풍선을 줍니다. 어느 날 오전에 487명이 입장했고 그날 태호가 받은 오후 입장 순서표에는 395라고 쓰여 있습니다.
        </Typography>
      </Box>
    ),
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
    if (cardData.p01.answer5 !== 0) {
      return cardData.p01.answer5;
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
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p01.answer1 && cardData.p01.answer2 && cardData.p01.answer3 && cardData.p01.answer4 && cardData.p01.answer5)}
      submitBtnColor={
        !(cardData.p01.answer1 && cardData.p01.answer2 && cardData.p01.answer3 && cardData.p01.answer4 && cardData.p01.answer5)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      useRound
    >

        <Box width="903px">
          <Typography lineHeight='48px'>
            <Box fontSize={36}>
              <Question type='number' number='7' mark={cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none'}>
              오후에 풍선을 받을 수 있는 사람은 몇 명인지 구하고, 문장을 완성해 보세요.
              </Question>
            </Box>
          </Typography>
        </Box>

      <Box hAlign='center' marginTop='24px'>
        <Box vAlign='flex-start' marginTop='24px'>
          <Input
            textAlign='center'
            name='answer2'
            value={cardData.p01.answer1}
            readOnly={cardData.p01.isSubmitted}
            status={cardData.p01.isSubmitted && !cardData.p01.isCorrect1 ? InputStatus.ERROR : InputStatus.ENABLE}
            onChange={event => handleChange(1, event.target.value)}
            width='130px'
	    ariaLabel='첫 번째 답란'
          />
          <Typography>-</Typography>
          <Input
            textAlign='center'
            name='answer3'
            value={cardData.p01.answer2}
            readOnly={cardData.p01.isSubmitted}
            status={cardData.p01.isSubmitted && !cardData.p01.isCorrect2 ? InputStatus.ERROR : InputStatus.ENABLE}
            onChange={event => handleChange(2, event.target.value)}
            width='130px'
            ariaLabel='두 번째 답란'
          />
          <Typography>=</Typography>
          <Input
            textAlign='center'
            name='answer4'
            value={cardData.p01.answer3}
            readOnly={cardData.p01.isSubmitted}
            status={cardData.p01.isSubmitted && !cardData.p01.isCorrect3 ? InputStatus.ERROR : InputStatus.ENABLE}
            onChange={event => handleChange(3, event.target.value)}
            width='130px'
            ariaLabel='세 번째 답란'
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
              value={cardData.p01.answer4}
              readOnly={cardData.p01.isSubmitted}
              status={cardData.p01.isSubmitted && !cardData.p01.isCorrect4 ? InputStatus.ERROR : InputStatus.ENABLE}
              onChange={event => handleChange(4, event.target.value)}
              width='130px'
              ariaLabel='오후에 풍선을 받을 수 있는 사람'
            />
            {' '}{'명이 풍선을 받을 수 있고 태호의 입장 순서는 395번째이므로 풍선을 받을 수 ( '}
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
                    readOnly={cardData.p01.isSubmitted}
                    isError={cardData.p01.isSubmitted && rowAnswer !== cardData.p01.solution5}
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
                    readOnly={cardData.p01.isSubmitted}
                    isError={cardData.p01.isSubmitted && rowAnswer !== cardData.p01.solution5}
                  >
                    <Typography>{item?.text}</Typography>
                  </Radio>
                  {index < 1 ? <Typography>,</Typography> : null} 
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
              <Typography>{'900, 487, 413 / 413, 있습니다.'}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{'오후에 풍선을 받을 수 있는 사람은 900-487=413(명)이고 태호의 입장 순서는 395번째이므로 풍선을 받을 수 있습니다.'}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};
export default P01;