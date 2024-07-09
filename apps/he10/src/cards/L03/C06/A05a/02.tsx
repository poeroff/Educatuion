import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  Textarea,
  BottomSheet,
  Tag,
  ETagLine,
  Scroll,
  Typography,
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { L03C06A05a } from './store';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Tuning Out: The Science of Noise-Cancellation (3)',
};
const questionInfo: IQuestionProps = {
  text: (
    <Typography>
      <Typography useGap={false} weight={800}>
        Q3.
      </Typography>{' '}
      What kind of sounds can be completely eliminated by noise-cancelling technology?
    </Typography>
  ),
};

const content: React.ReactNode = (
  <Typography>
    Destructive interference is used in the noise-cancelling feature of headphones when we listen to music. Inside the headphones are microphones and
    noise-cancelling circuitry. The microphones pick up sounds from the outside, and the circuitry analyzes them to produce opposite sound waves. For
    example, if outside noise has a value of +1, the circuitry will generate an opposite noise of –1 and transmit it to the speakers. This cancels out
    the unwanted sound even in noisy surroundings, so you can hear the music sound clearly without turning up the volume. However, it is not easy to
    entirely eliminate external noise with this technology. To achieve full noise cancellation, the circuitry must convert the noise into digital data
    and instantly transmit the opposite sound to the speakers as soon as the noise reaches the microphones. Therefore, this noise-cancellation
    technology is effective for predictable sounds like those of car engines and subways that occur regularly or over a period of time. However, it’s
    relatively less effective for inconsistent sounds such as those of people talking close to you.
  </Typography>
);

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C06A05a);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);
  const [isPassageShow, setPassageShow] = useState(false);

  const handlePassageButtonClick = () => {
    setPassageShow(!isPassageShow);
  };

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
      ],
    },
  ];
  const onGrade = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p02.answer1, cardData.p02.solution1);
      const isCorrect = isCorrect1;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    }
    changeData('P02', 1, subKey, value);
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
      onSubmit={onGrade}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!cardData.p02.answer1}
      submitBtnColor={!cardData.p02.answer1 ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <BoxWrap useFull>
        <Box useFull marginRight='24px'>
          <Textarea
            name={'value1'}
            width='100%'
            height='100%'
            readOnly={cardData.p02.isSubmitted}
            placeholder='내용을 넣어 주세요.'
            ariaLabel={'질문에 대한 답을 입력'}
            value={cardData.p02.answer1}
            onChange={event => handleChange(1, event.target.value)}
          />
        </Box>
        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {isPassageShow ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button
                  color={EStyleButtonTypes.SECONDARY}
                  size={EStyleSizes.SMALL}
                  label='닫기'
                  minWidth='70px'
                  onClick={handlePassageButtonClick}
                />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight={'48px'} useGap={false} usePre>
                  {content}
                </Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handlePassageButtonClick} />
            </Box>
          )}
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p02.solution1}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
