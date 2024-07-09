import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  List,
  Question,
  Radio,
  SvgIcon,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { A01_0011_04 } from './store';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import arrowRight from '@/assets/icon/arrow_right.svg';

const P05 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0011_04);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Box vAlign='baseline' fontSize='var(--font-size-28)' fontWeight='var(--font-weight-medium)' lineHeight='48px'>
        <Box marginRight={20}>[5~6]</Box>
        문구점에서 스케치북 1권은 813원, 자 1개는 489원에 할인하여 팝니다. 우진이는 용돈 1200원으로 스케치북 1권과 자 1개를 사려고 합니다. 물음에
        답하세요.
      </Box>
    ),
  };

  const question: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={5} />
        스케치북 1권과 자 1개는 얼마쯤일지 어림하는 식을 쓰고, 어림셈을 하여 문장을 완성해 보세요.
      </>
    ),
    mark: getMarking(cardData.p05.isSubmitted, cardData.p05.isCorrect),
  };
  const data = [{ text: '있을' }, { text: '없을' }];

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
          value: cardData.p05.answerRadio,
          isAnswer: true,
          isCorrect: cardData.p05.answerRadio === cardData.p05.solutionRadio,
        },
      ],
    },
  ];

  const onGrade = () => {
    if (cardData.p05.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p05.answer1.trim() === cardData.p05.solution1;
      const isCorrect2 = cardData.p05.answer2.trim() === cardData.p05.solution2;
      const isCorrect3 = cardData.p05.answer3.trim() === cardData.p05.solution3;
      const isCorrect4 = cardData.p05.answer4.trim() === cardData.p05.solution4;
      const isCorrectRadio = cardData.p05.answerRadio === cardData.p05.solutionRadio;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4 && isCorrectRadio;
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
              isCorrect: true,
            },
            {
              subKey: 5,
              type: 'NUMBER',
              value: cardData.p05.answerRadio,
              isAnswer: true,
              isCorrect: cardData.p05.answerRadio === cardData.p05.solutionRadio,
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
            answerRadio: userSubmissionList[0].inputData[4]?.value || cardData.p05.answerRadio,
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
    }
    changeData('P05', 1, subKey, value);
  };

  const handleRadioChange = (index: number) => {
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, answerRadio: index } }));
    changeData('P05', 1, 5, index);
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
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      submitLabel={cardData.p05.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p05.answer1 && cardData.p05.answer2 && cardData.p05.answer3 && cardData.p05.answer4 && cardData.p05.answerRadio)}
      submitBtnColor={
        !(cardData.p05.answer1 && cardData.p05.answer2 && cardData.p05.answer3 && cardData.p05.answer4 && cardData.p05.answerRadio)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      onSubmit={onGrade}
      useRound
    >
      <Question text={question.text} type={question.type} mark={question.mark} />

      <Box hAlign='center' marginTop='24px'>
        <Input
          textAlign='center'
          name='value1'
          value={cardData.p05.answer1}
          onChange={event => handleChange(1, event.target.value)}
          width='130px'
          ariaLabel='스케치북 1권의 값'
          readOnly={cardData.p05.isSubmitted}
          status={
            !cardData.p05.isSubmitted
              ? InputStatus.DEFAULT
              : cardData.p05.answer1.trim() !== cardData.p05.solution1
              ? InputStatus.ERROR
              : InputStatus.ENABLE
          }
        />
        <Typography>+</Typography>
        <Input
          textAlign='center'
          name='value2'
          value={cardData.p05.answer2}
          onChange={event => handleChange(2, event.target.value)}
          width='130px'
          maxLength={5}
          ariaLabel='자 1개의 값'
          readOnly={cardData.p05.isSubmitted}
          status={
            !cardData.p05.isSubmitted
              ? InputStatus.DEFAULT
              : cardData.p05.answer2.trim() !== cardData.p05.solution2
              ? InputStatus.ERROR
              : InputStatus.ENABLE
          }
        />
        <Typography>=</Typography>
        <Input
          textAlign='center'
          name='value3'
          value={cardData.p05.answer3}
          onChange={event => handleChange(3, event.target.value)}
          width='130px'
          maxLength={5}
          ariaLabel='스케치북 1권과 자 1개를 더해 어림한 값'
          readOnly={cardData.p05.isSubmitted}
          status={
            !cardData.p05.isSubmitted
              ? InputStatus.DEFAULT
              : cardData.p05.answer3.trim() !== cardData.p05.solution3
              ? InputStatus.ERROR
              : InputStatus.ENABLE
          }
        />
      </Box>
      <Box vAlign='flex-start' marginTop='24px'>
        <SvgIcon src={arrowRight} size='50px' />
        <Typography>
          어림셈을 하면 스케치북 1권과 자 1개는&nbsp;
          <Input
            textAlign='center'
            name='value4'
            value={cardData.p05.answer4}
            onChange={event => handleChange(4, event.target.value)}
            width='130px'
            maxLength={5}
            ariaLabel='스케치북 1권과 자 1개를 더해 어림한 값'
            readOnly={cardData.p05.isSubmitted}
            status={
              !cardData.p05.isSubmitted
                ? InputStatus.DEFAULT
                : cardData.p05.answer4.trim() !== cardData.p05.solution4
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
          />
          &nbsp;원 쯤이므로 1200원으로 살 수&nbsp;(&nbsp;
          <Box display='inline-block'>
            <List
              align='horizontal'
              gap={0}
              data={data}
              row={({ value, index = 1 }) => (
                <Box>
                  <Radio
                    gap={0}
                    type={'box'}
                    align='horizontal'
                    name={'radio-group'}
                    label={value?.text}
                    ariaLabel={value?.text}
                    value={index === cardData.p05.answerRadio}
                    onClick={() => handleRadioChange(index)}
                    readOnly={cardData.p05.isSubmitted}
                    isError={cardData.p05.isSubmitted && cardData.p05.answerRadio !== cardData.p05.solutionRadio}
                  >
                    <Box>
                      <Typography>{value?.text}</Typography>
                    </Box>
                  </Radio>
                  {index === 1 && <Typography>,</Typography>}
                </Box>
              )}
            />
          </Box>
          &nbsp;)&nbsp;것 같습니다.
        </Typography>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={cardData.p05.isSubmitted && isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>
              {`(예시 답안)\n`}
              {cardData.p05.solution1} , {cardData.p05.solution2} , {cardData.p05.solution3} , {cardData.p05.solution4}
              {`\n 없을`}
            </Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>
              {`813을 800, 489를 500으로 생각하여 어림셈을 하면 800+500=1300입니다. 1300>1200이므로 1300원으로 살 수 없을 것 같습니다.`}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P05;
