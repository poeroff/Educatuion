import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  Textarea,
  Scroll,
  Typography,
  IQuestionProps,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C06A05a } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const currentPage = 'P02';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A05a);
  const { userId } = useRecoilValue(studentAtom);

  const [showAnswer, setShowAnswer] = useState(false);
  const [opened, setOpened] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'What’s in Your School Survival Kit? (2)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'What does Ms. Seo have in her school survival kit?',
    type: 'text',
  };

  const content = `This box is my school survival kit. I have many things in it. First, I have some sticky notes. I use them on the first day. I write your names and remember them. Next, I have some candies. These are for you. They’re sweet, like your smiles.`;

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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [currentPage]: {
            ...prev[currentPage],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[currentPage].answer,
            isSubmitted,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (value: string) => {
    const truncateValue = truncateToMaxBytes(value);
    setCardData(prev => ({ ...prev, [currentPage]: { ...prev[currentPage], answer: truncateValue } }));
    changeData(currentPage, 1, 1, truncateValue);
  };

  const onSubmitText = () => {
    if (cardData[currentPage].isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      setCardData(prev => ({ ...prev, [currentPage]: { ...prev[currentPage], isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[currentPage].answer,
            },
          ],
        },
      ];
      submitData(currentPage, userSubmission);
    }
  };

  const handleButtonOnClick = () => {
    setOpened(!opened);
  };

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={!cardData[currentPage].isSubmitted ? '완료하기' : !showAnswer ? '답안 보기' : '답안 닫기'}
      submitBtnColor={cardData[currentPage].answer ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!cardData[currentPage].answer}
      onSubmit={onSubmitText}
      bodyId='targetContainer'
      vAlign='flex-start'
    >
      <BoxWrap useFull>
        <Box useFull marginRight='24px'>
          <Textarea
            width='100%'
            height='100%'
            placeholder='내용을 넣어 주세요.'
            value={cardData[currentPage].answer}
            onChange={e => handleInputChange(e.target.value)}
            readOnly={cardData[currentPage].isSubmitted}
            ariaLabel={'답안 입력란'}
          />
        </Box>
        <Box useFull>
          <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
            {opened ? (
              <>
                <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                  <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='56px' onClick={handleButtonOnClick} />
                </Box>
                <Scroll height='calc(100% - 52px)' tabIndex={0}>
                  <Typography lineHeight={'48px'}>&nbsp;{content}</Typography>
                </Scroll>
              </>
            ) : (
              <Box vAlign='center' hAlign='center' useFull>
                <Button color={EStyleButtonTypes.SECONDARY} label='지문 보기' minWidth='118px' useRound onClick={handleButtonOnClick} />
              </Box>
            )}
          </Box>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>She has some sticky notes and candies in her school survival kit.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
