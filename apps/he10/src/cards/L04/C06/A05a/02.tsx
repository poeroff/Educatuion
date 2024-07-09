import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleSizes,
  ETagLine,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Textarea,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { ChangeEventHandler, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C06A05a } from './store';

const page = 'P02';
const headerText = 'A Better Future for Coffee Waste (3)';
const questionText = 'Q3. What economic model is proposed as a solution to the coffee waste problem?';
const content = `So, what happens to all the waste from the coffee extraction process? Spent coffee grounds (SCGs) are classified as general waste and sent to landfills. There they break down, releasing methane, a greenhouse gas that is approximately 25 times more potent than CO2. Some SCGs are incinerated instead of being buried, but this releases a lot of CO2: 338 kg per ton. However, neither of these waste management options takes into account the potential value of coffee grounds. Although the grounds contain valuable organic compounds and minerals, they are simply destroyed. 
  
  Fortunately, thanks to increased awareness of the coffee waste problem, companies, organizations, and governments around the world are working hard to improve the environmental impact of the coffee industry through circular economy measures. A circular economy promotes the reuse of resources for as long as possible, reducing waste and environmental costs.`;
const answer = `A circular economy is proposed as a solution to the coffee waste problem.`;

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: headerText,
  };
  const questionInfo = {
    text: questionText,
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
      ],
    },
  ];

  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A05a);
  const { changeData, initData, submitData, saveData } = usePageData();
  const { userAnswer, isSubmitted } = cardData.p02;
  const [isTextShow, setIsTextShow] = useState<boolean>(false);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const isDisabled = useMemo(() => !isNotEmptyString(userAnswer), [userAnswer]);
  const submitLabel = useMemo(() => (isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '완료하기'), [isSubmitted, isAnswerShow]);

  const init = async () => {
    const pageId = pageIds.find(p => p.page === page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            userAnswer: userSubmissionList[0].inputData[0]?.value || userAnswer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmitClick = () => {
    if (isSubmitted) {
      setIsAnswerShow(!isAnswerShow);
    } else {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: userAnswer,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData(page, userSubmission);
    }
  };

  const handleTextAreaChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, userAnswer: e.target.value } }));
    changeData(page, 1, 1, e.target.value);
  };

  const handleButtonOnClick = () => {
    setIsTextShow(!isTextShow);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(page);
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={submitLabel}
      onSubmit={handleSubmitClick}
      submitDisabled={isDisabled}
      submitBtnColor={isDisabled ? EStyleButtonTypes.SECONDARY : isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <BoxWrap useFull>
        <Box useFull marginRight='24px'>
          <Textarea
            width='100%'
            height='100%'
            placeholder='내용을 넣어 주세요.'
            readOnly={isSubmitted}
            ariaLabel='입력란'
            onChange={handleTextAreaChange}
            value={userAnswer}
          />
        </Box>
        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {isTextShow ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='56px' onClick={handleButtonOnClick} />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight={'48px'} usePre>
                  {content}
                </Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleButtonOnClick} />
            </Box>
          )}
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Tag type={ETagLine.GREEN} label='예시답안' />
          <Box marginTop='10px'>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              {answer}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
