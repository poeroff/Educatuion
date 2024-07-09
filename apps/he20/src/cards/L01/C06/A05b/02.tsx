import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  Scroll,
  Typography,
  Label,
  List,
  Radio,
  BottomSheet,
  ETagLine,
  Tag,
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L01C06A05b } from './store';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import styled from '@emotion/styled';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A05b);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Volunteering at an Animal Sanctuary(3)',
  };
  const questionInfo: IQuestionProps = {
    text: (
      <>
        <QuestionNumber>Q3.</QuestionNumber>
        The following sentences are steps to make a honey-log feeder. Which is NOT true?
      </>
    ),
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  const data = [
    {
      text: 'Step 1. Make several holes in a log.',
    },
    {
      text: 'Step 2. Fill the holes with honey.',
    },
    {
      text: 'Step 3. Hang the honey-log feeder on the wall.',
    },
  ];

  const content =
    'Today, we made a gift for Ben and Lily. These two baby bears were rescued after they had been raised illegally in a tiny cage on a farm for many years. To help the bears restore their natural instincts, we carried out some special activities known as “behavioral enrichment.” For example, we made honey-log feeders for the bears. First, we made several holes in a log and filled them with honey. Then, we hung the honey-log feeders on trees near the bears’ habitat. As bears are intelligent and curious creatures, they can become bored and stressed when lacking mental and physical stimulation. The honey-log feeders stimulate their natural curiosity and keep them as active as they would be in the wild. After a while, Ben and Lily approached the feeders and started eating the honey inside. They are so cute!';

  const [opened, setOpened] = useState<boolean>(false);
  const handleButtonOnClick = () => {
    setOpened(!opened);
  };

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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p02.answer === cardData.p02.solution;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p02.answer,
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

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: index } }));
    changeData('P02', 1, 1, index);
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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData.p02.answer === 0}
      onSubmit={submitAnswer}
      submitBtnColor={cardData.p02.answer === 0 ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <BoxWrap useFull maxHeight={'90%'}>
        <Box vAlign='center' useFull marginRight='24px'>
          <List
            gap={10}
            data={data}
            row={({ value, index = 1 }) => (
              <Radio
                type={'square'}
                align='vertical'
                name={'radio-question-A'}
                label={value?.text}
                ariaLabel={index + '번 보기'}
                value={index === cardData.p02.answer}
                onClick={() => handleChange(index)}
                readOnly={cardData.p02.isSubmitted}
                isError={cardData.p02.isSubmitted && cardData.p02.answer !== cardData.p02.solution}
              >
                <Box display='flex' flexDirection='row' alignItems='start'>
                  <Box marginTop='5px' marginRight='4px'>
                    <Label value={index} />
                  </Box>
                  <Typography>{value?.text}</Typography>
                </Box>
              </Radio>
            )}
          />
        </Box>
        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {opened ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='56px' onClick={handleButtonOnClick} />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight={'48px'} useGap={false} style={{ textIndent: '24px' }}>
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
      <BottomSheet bottomSheetTargetId='targetContainer' height='10%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>{cardData.p02.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;

const QuestionNumber = styled.span`
  font-weight: var(--font-weight-extraBold);
  margin-right: 10px;
`;
