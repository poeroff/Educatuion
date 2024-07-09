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
import { L02C06A05a } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Gathering of the Whakapapa (3)',
};
const questionInfo: IQuestionProps = {
  text: (
    <Typography>
      <Typography useGap={false} weight='var(--font-weight-extraBold)'>
        Q3.
      </Typography>{' '}
      If you were Nani Tama’s grandson, would you drive him to Murupara? Why or why not?
    </Typography>
  ),
};

const content: React.ReactNode = (
  <Typography>
    When I arrived at Auntie’s place, I was shocked to see how thin Nani Tama was. “Look, Nani,” I said. “I’m not taking you anywhere. You could die
    on me!” Nani looked at me in anger. “You want me to die here in this room? Looking at these four walls? When the whakapapa is not yet finished?”
    The old man held on tightly to the side of the bed and cried out as he stood up. Every slow, painful step hurt him, but he tried to walk. I could
    not help but carry him to the car, and we set off with Auntie. We traveled all night, mostly in silence, listening to Nani chanting in the
    darkness. It was strange but wonderful to hear him. Sometimes, he burst into a song that he had taught Auntie. They sang together, lifting up
    their voices to send the song flying like a bird through the sky.
  </Typography>
);

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A05a);
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
      const isCorrect2 = isAnswer(cardData.p02.answer1, cardData.p02.solution2);
      const isCorrect = isCorrect1 || isCorrect2;
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
          <Box marginTop='12px'>
            {' * '}
            {cardData.p02.solution1}
          </Box>
          <Box marginTop='12px'>
            {' * '}
            {cardData.p02.solution2}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
