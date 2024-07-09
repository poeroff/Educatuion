import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  Dialog,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleSizes,
  ETagLine,
  Input,
  IQuestionProps,
  SvgIcon,
  Tag,
  TMainHeaderInfoTypes,
  TMarkType,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useMemo, useState } from 'react';

import arrow_right from '@/assets/icon/arrow_right.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getInputStatus } from '@maidt-cntn/util/CommonUtil';
import { useRecoilState, useRecoilValue } from 'recoil';
import L04C06A05State from './store';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A05State);

  const [showContent, setShowContent] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [markType, setMarkType] = useState<TMarkType>('none');

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A Better Future for Coffee Waste (3)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q3. Fill in the blanks to complete the sentences.',
    mark: markType,
    markSize: 'middle',
  };

  const answers = {
    answer1: 'circular',
    answer2: 'economy',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            input1: userSubmissionList[0].inputData[0]?.value || cardData.p02.input1,
            input2: userSubmissionList[0].inputData[1]?.value || cardData.p02.input2,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const isAnswer1Correct = useMemo(() => cardData.p02.input1.trim().toLowerCase() === answers.answer1, [cardData.p02.input1, answers.answer1]);
  const isAnswer2Correct = useMemo(() => cardData.p02.input2.trim().toLowerCase() === answers.answer2, [cardData.p02.input2, answers.answer2]);
  const isAllCorrect = useMemo(() => isAnswer1Correct && isAnswer2Correct, [isAnswer1Correct, isAnswer2Correct]);

  useEffect(() => {
    if (cardData.p02.isSubmitted) {
      setMarkType(isAllCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p02.isSubmitted, isAllCorrect]);

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isAllCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.input1.trim(),
            isAnswer: true,
            isCorrect: isAnswer1Correct,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p02.input2.trim(),
            isAnswer: true,
            isCorrect: isAnswer1Correct,
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];
    submitDataWithResult('P02', userSubmission, isAllCorrect);
  };

  const handleInputChange = (subKey: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, [`input${subKey}`]: e.target.value } }));
    changeData('P02', 1, subKey, e.target.value);
  };

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      submitAnswer();
    }
  };

  const isInputComplete = useMemo(() => {
    return !!cardData.p02.input1.trim() && !!cardData.p02.input2.trim();
  }, [cardData.p02]);

  const getSubmitBtnColor = (isInputComplete: boolean, showAnswer: boolean): EStyleButtonTypes => {
    if (!isInputComplete) {
      return EStyleButtonTypes.SECONDARY;
    } else if (showAnswer) {
      return EStyleButtonTypes.GRAY;
    }
    return EStyleButtonTypes.PRIMARY;
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      onSubmit={handleSubmit}
      submitLabel={showAnswer ? '답안 닫기' : cardData.p02.isSubmitted ? '답안 보기' : '채점하기'}
      submitBtnColor={getSubmitBtnColor(isInputComplete, showAnswer)}
      submitDisabled={!isInputComplete}
    >
      <BoxWrap marginBottom={'15px'}>
        <Box width={'100%'} hAlign={'flex-end'}>
          <Button
            width='96px'
            label='지문보기'
            color={EStyleButtonTypes.SECONDARY}
            size={EStyleSizes['SMALL']}
            onClick={() => {
              setShowContent(!showContent);
            }}
            useRound
          />
        </Box>
      </BoxWrap>
      <Box background={'white'} useRound>
        <BoxWrap marginBottom='20px'>What economic model is proposed as a solution to the coffee waste problem?</BoxWrap>
        <StyledIcon src={arrow_right} size='34px' />A
        <InputWrapper>
          <Input
            name='value1'
            status={cardData.p02.isSubmitted && getInputStatus(cardData.p02.input1.trim().toLowerCase() === answers.answer1, cardData.p02.input1)}
            width={'250px'}
            textAlign='start'
            placeholder={'내용을 넣어 주세요.'}
            value={cardData.p02.input1}
            onChange={e => handleInputChange(1, e)}
            maxLength={99}
            readOnly={cardData.p02.isSubmitted}
            ariaLabel='1번 답 입력란'
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            name='value2'
            status={cardData.p02.isSubmitted && getInputStatus(cardData.p02.input2.trim().toLowerCase() === answers.answer2, cardData.p02.input2)}
            width={'250px'}
            textAlign='start'
            placeholder={'내용을 넣어 주세요.'}
            value={cardData.p02.input2}
            onChange={e => handleInputChange(2, e)}
            maxLength={99}
            readOnly={cardData.p02.isSubmitted}
            ariaLabel='2번 답 입력란'
          />
        </InputWrapper>
        is proposed as a solution to the coffee waste problem.
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>circular, economy</Typography>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog
        isShow={showContent}
        width={893}
        height={458}
        topHeight={50}
        useHeader
        header={() => (
          <Box height='50px' marginBottom='20px' backgroundColor='var(--color-grey-100)' useRound={true} padding='4px 12px'>
            <Typography useGap={false} weight={'bold'} size={EStyleFontSizes.MEDIUM}>
              A Better Future for Coffee Waste (3)
            </Typography>
          </Box>
        )}
        useFooter
        onClose={() => setShowContent(!showContent)}
        closeLabel='닫기'
        tabIndex={101}
      >
        <Typography>
          So, what happens to all the waste from the coffee extraction process? Spent coffee grounds (SCGs) are classified as general waste and sent
          to landfills. There they break down, releasing methane, a greenhouse gas that is approximately 25 times more potent than CO2. Some SCGs are
          incinerated instead of being buried, but this releases a lot of CO2: 338 kg per ton. However, neither of these waste management options
          takes into account the potential value of coffee grounds. Although the grounds contain valuable organic compounds and minerals, they are
          simply destroyed.
        </Typography>
        <br />
        <br />
        <Typography>
          Fortunately, thanks to increased awareness of the coffee waste problem, companies, organizations, and governments around the world are
          working hard to improve the environmental impact of the coffee industry through circular economy measures. A circular economy promotes the
          reuse of resources for as long as possible, reducing waste and environmental costs.
        </Typography>
      </Dialog>
    </Container>
  );
};

const InputWrapper = styled.span`
  margin: 0 5px;
`;

const StyledIcon = styled(SvgIcon)`
  vertical-align: text-top;
  padding-right: 8px;
`;

export default P02;
