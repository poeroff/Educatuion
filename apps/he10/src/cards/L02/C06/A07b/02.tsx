import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  IQuestionProps,
  Label,
  List,
  Radio,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L02C06A07b } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const currentPage = 'P02';
  const content =
    'It was early morning and still dark when we returned to Auntie’s place. All the lights were on, and the village people were waiting for us. Smiling, Nani Tama lifted up the whakapapa and offered it to the village. Our hearts were full because our grandfather had saved our past for us. Our Nani Tama smiled again. His smile grew tired. He sighed. “At last, I may go now.” Then, he closed his eyes. “No, Dad!” Auntie Hiraina cried. The sun burst across the hills.';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A07b);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Gathering of the Whakapapa (5) ',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q5. How did the villagers probably feel when Nani Tama offered them the whakapapa?',
    mark: cardData.p02.isSubmitted ? (cardData.p02.answer === cardData.p02.solution ? 'correct' : 'incorrect') : 'none',
  };

  const data = [{ text: 'upset' }, { text: 'grateful' }, { text: 'disappointed' }];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: false,
          isCorrect: false,
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
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: index } }));
    changeData(currentPage, 1, 1, index);
  };

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
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
            isCorrect: cardData.p02.isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(currentPage, userSubmission, isCorrect);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData.p02.answer === 0}
      submitBtnColor={cardData.p02.answer !== 0 ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      onSubmit={submitAnswer}
    >
      <BoxWrap useFull>
        <Box hAlign={'center'} useFull>
          <List data={data}>
            {({ value, index = 2 }) => (
              <Radio
                key={index}
                type={'square'}
                align='vertical'
                name={'radio-question-A'}
                label={value?.text}
                value={index === cardData.p02.answer}
                defaultValue={index === cardData.p02.answer}
                onClick={() => handleChange(index)}
                isError={cardData.p02.isSubmitted && cardData.p02.answer !== cardData.p02.solution}
                readOnly={cardData.p02.isSubmitted}
                ariaLabel={`${index}번째 답`}
              >
                <Box vAlign='baseline' padding='6px 0' gap='4px'>
                  <Label value={index} />
                  <Typography>{value?.text}</Typography>
                </Box>
              </Radio>
            )}
          </List>
        </Box>
        <Box background='blue' useRound useFull>
          {opened ? (
            <>
              <Box hAlign='flex-end' marginBottom={'24px'}>
                <Button
                  tabIndex={111}
                  color={EStyleButtonTypes.SECONDARY}
                  size={EStyleSizes.SMALL}
                  label='닫기'
                  minWidth='70px'
                  onClick={() => setOpened(!opened)}
                />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight={'48px'}>{content}</Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button
                tabIndex={110}
                color={EStyleButtonTypes.SECONDARY}
                label='지문보기'
                minWidth='118px'
                useRound
                onClick={() => setOpened(!opened)}
              />
            </Box>
          )}
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={cardData.p02.isSubmitted && isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p02.solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
