import { ChangeEvent, useState, useRef, useEffect } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  Dialog,
  Scroll,
  Button,
  Input,
  BottomSheet,
  BoxWrap,
  EStyleButtonTypes,
  EStyleSizes,
  Typography,
  Tag,
  ETagLine,
  IQuestionProps,
  SvgIcon,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow_right from '@/assets/icon/arrow_right.svg';
import { isNotEmptyString, isAnswer } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L01_C06_A06b } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const [passageShow, setPassageShow] = useState<boolean>(false);
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);

  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const pageNumber = 'P02';
  const pageKey = 'p02';

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01_C06_A06b);
  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: cardData[pageKey].answer.value1,
          isAnswer: true,
        },
      ],
      isCorrect: cardData[pageKey].isCorrect,
    },
  ];
  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const userInputs = {
      ...cardData[pageKey].answer,
      [name]: value,
    };
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: userInputs,
      },
    }));

    changeData(pageNumber, 1, 1, value);
  };
  const [isShow, setShow] = useState(false);
  const submitAnswer = () => {
    const isCorrect = isAnswer(cardData[pageKey].answer.value1, cardData[pageKey].solution.value1);
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageKey].answer.value1,
            },
          ],
          isCorrect: isCorrect,
        },
      ];
      submitData(pageNumber, userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: { value1: userSubmissionList[0].inputData[0]?.value } || cardData[pageKey].answer,
            isCorrect: userSubmissionList[0].isCorrect,
            isSubmitted,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const questionInfo: IQuestionProps = {
    text: cardData.common.questionInfo.text,
    size: cardData.common.questionInfo.size,
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: cardData.common.headerInfo.headerText,
  };

  const openModal = () => {
    lastFocusedElementRef.current = document.activeElement as HTMLElement;
    setPassageShow(true);
  };

  const closeModal = () => {
    setPassageShow(false);
    if (lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
    }
  };
  useEffect(() => {
    if (passageShow) {
      //Dialog이 열리면 지문 내용이 보이는 부분에 포커스를 준다.
      //Dialog 내부를 수정할 수 없기 때문에, timeout을 주어 해결하였습니다.
      setTimeout(() => {
        const textTabIndex = 103;
        const nextElement = document.querySelector(`[tabindex="${textTabIndex}"]`) as HTMLElement;
        if (nextElement) {
          nextElement.focus();
        }
      }, 10);
    }
  }, [passageShow]);

  const handleShowAnswer = () => {
    setIsShowAnswer(!isShowAnswer);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      submitDisabled={cardData[pageKey].isSubmitted ? false : !isNotEmptyString(cardData[pageKey].answer.value1)}
      onSubmit={cardData[pageKey].isSubmitted ? handleShowAnswer : submitAnswer}
      submitBtnColor={
        isNotEmptyString(cardData[pageKey].answer.value1)
          ? isShow
            ? EStyleButtonTypes.DEFAULT
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      submitLabel={cardData[pageKey].isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      bodyId='targetContainer'
    >
      <BoxWrap marginBottom={'15px'}>
        <Box width={'100%'} hAlign={'flex-end'}>
          <Button tabIndex={101} label={'지문 보기'} color={EStyleButtonTypes.SECONDARY} size={EStyleSizes['SMALL']} onClick={openModal} useRound />
        </Box>
      </BoxWrap>

      <Scroll tabIndex={0}>
        <Box background={'white'} useRound>
          <Box>
            <Typography>How are desirable behaviors encouraged in positive reinforcement training?</Typography>
          </Box>
          <Box>
            <SvgIcon style={{ verticalAlign: 'text-top', padding: '4px 12px' }} src={arrow_right} size='36px' />
            <Typography>They are encouraged using</Typography>
            <Input
              name='value1'
              value={cardData[pageKey].answer.value1}
              width='auto'
              minWidth={'300px'}
              maxLength={30}
              onChange={handleInputChangeEvent}
              placeholder='내용을 넣어 주세요.'
              status={
                cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect
                  ? InputStatus.ERROR
                  : cardData[pageKey].isSubmitted
                  ? InputStatus.ENABLE
                  : isNotEmptyString(cardData[pageKey].answer.value1)
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              disabled={cardData[pageKey].isSubmitted}
            />
          </Box>
        </Box>
      </Scroll>

      <BottomSheet bottomSheetTargetId='targetContainer' show={cardData[pageKey].isSubmitted && isShowAnswer} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='-30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>{cardData[pageKey].solution.value1}</Typography>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog
        width={921}
        height={550}
        isShow={passageShow}
        closeLabel='지문 닫기'
        onClose={closeModal}
        useFooter={true}
        confirmLabel='지문 닫기'
        tabIndex={102}
      >
        <Box useFull padding='24px 32px'>
          <Box vAlign='center' width='100%' height='48px' useRound backgroundColor='#EFF0F2' marginBottom='24px'>
            <Typography weight='bold'>July 31, Wednesday</Typography>
          </Box>
          <Scroll height='290px'>
            <Box padding='4px 12px' display='flex' flexDirection='column' tabIndex={103}>
              <Typography>
                <Typography>This morning, we had the opportunity to learn about animal treatment thanks to Molly, an elderly elephant.</Typography>
              </Typography>
              <Typography>
                <Typography>After spending 25 years carrying tourists along rough roads, she developed a twisted spine and foot pain.</Typography>
              </Typography>
              <Typography>
                <Typography>
                  In order to support Jane in taking care of Molly’s foot, we took part in positive reinforcement training, which involves using
                  rewards to encourage desirable behaviors.
                </Typography>
              </Typography>
              <Typography>
                <Typography>
                  When I gently touched her foot with a pole and called out, “foot,” she lifted it. We then rewarded her with a sweet piece of
                  watermelon, her favorite fruit.
                </Typography>
              </Typography>
              <Typography>
                <Typography>
                  This training helps reduce the stress that animals experience during controlled situations, such as treatment or a health
                  examination.
                </Typography>
              </Typography>
              <Typography>
                <Typography>The good news is Molly seems to be adapting well, and I expect her to get better soon.</Typography>
              </Typography>
            </Box>
          </Scroll>
        </Box>
      </Dialog>
    </Container>
  );
};

export default P02;
