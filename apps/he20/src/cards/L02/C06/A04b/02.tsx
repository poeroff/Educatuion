import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  Typography,
  BottomSheet,
  Tag,
  ETagLine,
  List,
  Radio,
  Label,
  Scroll,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L02C06A04b } from './store';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A04b);
  const [isOpen, setIsOpen] = useState(false); // 지문 보기

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Light Up Dark Patterns (2)',
  };

  const questionText = (
    <Typography useGap={false}>
      <Typography weight={'var(--font-weight-bold)'} useGap={false}>
        Q1.
      </Typography>{' '}
      Scan the paragraphs. How many types of dark patterns are mentioned?
    </Typography>
  );

  const questionInfo = {
    text: questionText,
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  const data = [
    {
      text: 'two',
    },
    {
      text: 'three',
    },
    {
      text: 'four',
    },
  ];

  const content = `   A widely used dark pattern is the practice of “forced continuity,” which requires users to pay a membership fee after a free trial ends. Companies deliberately avoid informing users about the end of the free trial period or make the cancellation process complicated. As a result, users have to pay membership fees even if they no longer want to use the service.\n
     Another common type of dark pattern is known as “hidden fees.” This design suddenly adds extra fees at the last step of the ordering process. On the final page, consumers are surprised to discover additional charges, such as shipping or processing fees, which the seller has added to increase the final cost of the order.\n
     “Confirm-shaming” is another online trick that users should be aware of. This technique manipulates users into feeling ashamed for cancelling their membership or requesting a refund for an order. Companies use this to keep their members subscribed, even if it goes against the members’ intentions. For example, when users want to cancel their subscription, they are offered two options: “I want to keep my benefits” and “I want to give up my benefits.” The first option is presented in an appealing way, while the second option seems like a bad choice.`;

  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);
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
      <BoxWrap useFull>
        <Box hAlign={'center'} useFull marginRight='24px'>
          <List
            data={data}
            gap={20}
            row={({ value, index = 1 }) => (
              <Radio
                align={'vertical'}
                type={'square'}
                name={'radio-question-A'}
                label={value?.text}
                value={cardData.p02.answer === index}
                onClick={() => handleChange(index)}
                readOnly={cardData.p02.isSubmitted}
                isError={cardData.p02.isSubmitted && cardData.p02.answer !== cardData.p02.solution}
              >
                <Box display='flex'>
                  <Box paddingTop='4px'>
                    <Label value={index} />
                  </Box>
                  <Typography>{value?.text}</Typography>
                </Box>
              </Radio>
            )}
          ></List>
        </Box>
        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {isOpen ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px'>
                <Button
                  color={EStyleButtonTypes.SECONDARY}
                  size={EStyleSizes.SMALL}
                  label='닫기'
                  minWidth='70px'
                  onClick={() => setIsOpen(!isOpen)}
                />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight={'48px'} style={{ whiteSpace: 'pre-wrap' }}>
                  {content}
                </Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={() => setIsOpen(!isOpen)} />
            </Box>
          )}
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height={'40%'} show={isShow} closeOption={{ useYn: true, onClose: () => setShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false}>{cardData.p02.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
