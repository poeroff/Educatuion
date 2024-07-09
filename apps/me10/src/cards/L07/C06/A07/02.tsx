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
  EStyleSizes,
  ETagLine,
  Input,
  InputStatus,
  IQuestionProps,
  List,
  Scroll,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L07C06A07 } from './store';

const P02 = () => {
  const [isAnswerOpen, setIsAnswerOpen] = useState<boolean>(false);
  const [isParagraphOpen, setIsParagraphOpen] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L07C06A07);

  interface IListenAndAnswer {
    label?: string;
    labelColor?: string;
    originText: string;
    translation: string;
  }

  const data: IListenAndAnswer[] = [
    {
      label: 'Host',
      labelColor: 'var(--color-purple-700)',
      originText: 'Now, here comes the final question.',
      translation: '이제 마지막 문제 나갑니다.',
    },
    {
      originText: 'Which country has the most pyramids in the world?',
      translation: '세계에서 어느 나라에 피라미드가 가장 많이 있을까요?',
    },
    {
      label: 'Sara',
      labelColor: 'var(--color-green-500)',
      originText: 'I’m sure it’s Egypt!',
      translation: '그것은 이집트인 것이 확실합니다!',
    },
    {
      label: 'Namjun',
      labelColor: 'var(--color-red-500)',
      originText: 'It’s Sudan.',
      translation: '그것은 수단입니다.',
    },
    {
      label: 'Host',
      labelColor: 'var(--color-purple-700)',
      originText: 'The answer is … Sudan!',
      translation: '정답은… 수단입니다!',
    },
    {
      label: 'Sara',
      labelColor: 'var(--color-green-500)',
      originText: 'Oh, really?',
      translation: '오, 정말요?',
    },
    {
      label: 'Host',
      labelColor: 'var(--color-purple-700)',
      originText: 'I’m surprised, too.',
      translation: '저도 놀랐습니다.',
    },
    {
      originText: 'Hey Joe, tell us more about it.',
      translation: '이봐요, Joe, 그것에 대해 좀 더 말해 주세요.',
    },
    {
      label: 'AI Joe',
      labelColor: 'var(--color-blue-400)',
      originText: 'Please look at this map.',
      translation: '이 지도를 보세요.',
    },
    {
      originText: 'Sudan and Egypt are close to each other.',
      translation: '수단과 이집트는 서로 가까이 있습니다.',
    },
    {
      originText: 'Egypt is more famous for its pyramids, but Sudan has more pyramids than Egypt.',
      translation: '이집트가 피라미드로 더 유명하지만, 수단에는 이집트보다 더 많은 피라미드가 있어요.',
    },
  ];

  const content = (
    <List<IListenAndAnswer>
      data={data}
      row={({ value, index = 1 }) => (
        <BoxWrap boxGap={10}>
          <Box minWidth='120px' textAlign='right' color={value?.labelColor} height='fit-content' borderRadius='8px'>
            <Typography weight='var(--font-weight-bold)'>{value?.label || ``}</Typography>
          </Box>
          <Box>
            <Typography>{value?.originText}</Typography>
          </Box>
        </BoxWrap>
      )}
    />
  );

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Amazing Facts About the World (4)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Which country is more famous for its pyramids, Egypt or Sudan? Fill in the blanks.',
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [{ subKey: 1, type: 'TEXT', value: '', isCorrect: false, isAnswer: true }],
      isCorrect: false,
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
            answer: userSubmissionList[0].inputData[0]?.value || '',
            isSubmitted,
            isCorrect: userSubmissionList[0].isCorrect || false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setIsAnswerOpen(!isAnswerOpen);
    } else {
      const isCorrect = isAnswer(cardData.p02.answer, cardData.p02.solution);

      setCardData(prev => ({
        ...prev,
        p02: { ...prev.p02, isSubmitted: true, isCorrect },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [{ subKey: 1, type: 'TEXT', value: cardData.p02.answer, isCorrect: isCorrect, isAnswer: true }],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const status = isNotEmptyString(value) ? InputStatus.ENABLE : InputStatus.DEFAULT;

    setCardData(prev => ({
      ...prev,
      p02: { ...prev.p02, answer: value, inputStatus: status },
    }));
    changeData('P02', 1, 1, value);
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

  const handleParagraphOpen = () => {
    setIsParagraphOpen(!isParagraphOpen);
  };

  const getSubmitLabel = () => (cardData.p02.isSubmitted ? (isAnswerOpen ? '답안 닫기' : '답안 보기') : '채점하기');

  const isSubmitDisabled = () => !isNotEmptyString(cardData.p02.answer);

  const getButtonColor = () => {
    if (!cardData.p02.isSubmitted) {
      return isSubmitDisabled() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;
    } else {
      return isAnswerOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  return (
    <Container
      bodyId={'targetContainer'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={getSubmitLabel()}
      onSubmit={handleSubmit}
      submitBtnColor={getButtonColor()}
      submitDisabled={isSubmitDisabled()}
    >
      <BoxWrap useFull>
        <Box vAlign={'center'} hAlign={'center'} useRound>
          <Box padding={'0px 20px 0px 20px'}>
            <Box marginBottom={'10px'} display={'inline-block'}>
              <Input
                tabIndex={101}
                maxLength={80}
                value={cardData.p02.answer}
                inputSize={'x-small'}
                width='220px'
                placeholder={'내용을 넣어 주세요.'}
                onChange={handleInputChange}
                readOnly={cardData.p02.isSubmitted}
                ariaLabel={'답란'}
                status={
                  !cardData.p02.isSubmitted
                    ? isNotEmptyString(cardData.p02.answer)
                      ? InputStatus.ENABLE
                      : InputStatus.DEFAULT
                    : isAnswer(cardData.p02.answer, cardData.p02.solution)
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                }
              />
            </Box>{' '}
            is more famous for its pyramids.
          </Box>
        </Box>
        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {isParagraphOpen ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button
                  tabIndex={103}
                  color={EStyleButtonTypes.SECONDARY}
                  size={EStyleSizes.SMALL}
                  label='닫기'
                  minWidth='70px'
                  onClick={handleParagraphOpen}
                />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={104}>
                <Typography lineHeight={'48px'}>{content}</Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button tabIndex={105} color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleParagraphOpen} />
            </Box>
          )}
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerOpen}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{cardData.p02.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
