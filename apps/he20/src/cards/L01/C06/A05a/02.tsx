import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
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
  IQuestionProps,
  Input,
  Question,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isAnswer, removeSpaces } from '@maidt-cntn/util/CommonUtil';
import React, { ChangeEventHandler, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C06A05a } from './store';

const textContentA02 = {
  title: `July 30, Tuesday`,
  content: `Today, we made a gift for Ben and Lily. These two baby bears were rescued after they had been raised illegally in a tiny cage on a farm for many years. To help the bears restore their natural instincts, we carried out some special activities known as “behavioral enrichment.” For example, we made honey-log feeders for the bears. First, we made several holes in a log and filled them with honey. Then, we hung the honey-log feeders on trees near the bears’ habitat. As bears are intelligent and curious creatures, they can become bored and stressed when lacking mental and physical stimulation. The honey-log feeders stimulate their natural curiosity and keep them as active as they would be in the wild. After a while, Ben and Lily approached the feeders and started eating the honey inside. They are so cute!
    As technology advances, many people expect it will solve various social issues caused by noise pollution. A common source of these problems is noisy neighbors, as the noise they make can lead to conflict among residents. Noise-cancellation technology can help address these problems by reducing unwanted disturbances, allowing people to lead more peaceful and healthier lives.`,
  subTitleIndexes: new Set([1, 3, 5]),
};
const answer = 'Fill the holes with honey';
const headerText = 'Volunteering at an Animal Sanctuary(3)';
const questionText = 'Q3. The following sentences are steps to make a honey-log feeder. Fill in the blanks.';

const P02 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A05a);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userAnswer, isSubmitted } = cardData.p02;
  const { title, content, subTitleIndexes } = textContentA02;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const isDisabled = useMemo(() => !removeSpaces(userAnswer), [userAnswer]);
  const submitLabel = useMemo(() => (isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '완료하기'), [isSubmitted, isAnswerShow]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: headerText,
  };

  const questionInfo: IQuestionProps = {
    text: questionText,
    size: 'small',
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
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
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      setIsAnswerShow(!isAnswerShow);
    } else {
      const isCorrect = isAnswer(userAnswer, answer);
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: userAnswer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, userAnswer: e.target.value } }));
    changeData('P02', 1, 1, e.target.value);
  };

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      useExtend
      vAlign='flex-start'
      submitLabel={submitLabel}
      onSubmit={handleSubmit}
      submitDisabled={isDisabled}
      submitBtnColor={isDisabled ? EStyleButtonTypes.SECONDARY : isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <Box hAlign='right'>
        <Button minWidth='96px' size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문보기' onClick={handleButtonClick} useRound />
      </Box>

      <Dialog width={893} height={468} isShow={isDialogOpen} onClose={handleDialogClose} useFooter={true} closeLabel={'지문 닫기'}>
        <Box height={'15%'} background={'gray'} useRound={true} hAlign='flex-start' vAlign='flex-center' useFull={true}>
          <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM}>
            {title}
          </Typography>
        </Box>
        <Box hAlign='center' marginTop='24px'>
          <Scroll height={'270px'}>
            {content.split('\n').map((paragraph, index, arr) => (
              <React.Fragment key={index}>
                <Typography weight={!subTitleIndexes.has(index) ? 'normal' : 'semi-bold'} size={EStyleFontSizes.MEDIUM}>
                  {paragraph}
                </Typography>
                <br />
                {index !== arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </Scroll>
        </Box>
      </Dialog>

      <BoxWrap marginTop={'30px'} marginLeft={'200px'} flexDirection='column'>
        <Box vAlign='center'>
          <Question type='text' size='small'>
            Step 1. Make several holes in a log.
          </Question>
        </Box>
        <Box vAlign='center'>
          <Question type='text' size='small'>
            Step 2.
          </Question>
          <Input
            ariaLabel='답란'
            width='459px'
            value={userAnswer}
            onChange={handleInputChange}
            maxLength={100}
            placeholder='내용을 넣어 주세요.'
            readOnly={isSubmitted}
          />
        </Box>
        <Box vAlign='center'>
          <Question type='text' size='small'>
            Step 3. Hang the honey-log feeder on a tree.
          </Question>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Tag type={ETagLine.GREEN} label='모범답안' />
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
