import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  Dialog,
  EStyleButtonTypes,
  EStyleSizes,
  ESvgType,
  ETagLine,
  Input,
  Tag,
  SvgIcon,
  Typography,
  EStyleFontSizes,
  TMainHeaderInfoTypes,
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

import { ChangeEventHandler, useEffect, useState } from 'react';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';
import styled from '@emotion/styled';

import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L02C06A06 } from './store';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const DialogHeader = () => {
  return (
    <Box background={'gray'} height='50px' marginBottom='20px' useRound useFull>
      <Typography weight={'bold'} lineHeight='unset' size={EStyleFontSizes.MEDIUM}>
        Gathering of the Whakapapa (4)
      </Typography>
    </Box>
  );
};

const P02 = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A06);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Gathering of the Whakapapa (4)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q4. Fill in the blanks to complete the sentences.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isAllCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const modalText = {
    text1:
      'Just before noon, we arrived at a small town called Murupara. “Where do we go now?” I asked Nani. He did not reply, but he was searching inside himself, staring at the small houses. Then, at a street corner, he told us to turn. After turning the corner, we saw an old man standing in front of a house. He welcomed Nani Tama with a gentle smile, but in his eyes, I saw the message, “We must hurry.”',
    text2:
      'Now that day seems like a dream to me. I remember the two old men sitting at the table and the soft sounds of the Maori words as they talked. All through the quiet afternoon and into the evening, they recalled missing names. I had a strange feeling that there were other people in the room. I felt as if people from the past were looking over the shoulders of the two old men to see if the work was correct. Finally, they stopped. It was done. After a moment of silence, the old man whispered to Nani, “Goodbye, friend.” Crying, they pressed their noses together to say goodbye.',
  };

  const answers = {
    answer1: 'missing',
    answer2: 'names',
  };

  const handleInput1OnChange: ChangeEventHandler<HTMLInputElement> = event => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: { ...prev.p02.answer1, value: event.target.value } } }));
    changeData('P02', 1, 1, event.target.value);
  };

  const handleInput2OnChange: ChangeEventHandler<HTMLInputElement> = event => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: { ...prev.p02.answer2, value: event.target.value } } }));
    changeData('P02', 1, 2, event.target.value);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    if (!cardData.p02.isSubmitted) {
      checkAnswerCorrect();
    } else {
      setShowAnswer(!showAnswer);
    }
  };

  const checkAnswerCorrect = () => {
    const correct1 = cardData.p02.answer1.value.trim().toLowerCase() === answers.answer1;
    const correct2 = cardData.p02.answer2.value.trim().toLowerCase() === answers.answer2;
    const isAllCorrect = correct1 && correct2;

    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer1: {
          ...cardData.p02.answer1,
          isCorrect: correct1,
        },
        answer2: {
          ...cardData.p02.answer2,
          isCorrect: correct2,
        },
        isSubmitted: true,
        isAllCorrect: isAllCorrect,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer1.value,
            isCorrect: correct1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p02.answer2.value,
            isCorrect: correct2,
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];
    submitDataWithResult('P02', userSubmission, isAllCorrect);
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
        {
          subKey: 2,
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
            answer1: {
              ...prev.p02.answer1,
              value: userSubmissionList[0].inputData[0]?.value || prev.p02.answer1.value,
              isCorrect: userSubmissionList[0].inputData[0]?.isCorrect || prev.p02.answer1.isCorrect,
            },
            answer2: {
              ...prev.p02.answer2,
              value: userSubmissionList[0].inputData[1]?.value || prev.p02.answer2.value,
              isCorrect: userSubmissionList[0].inputData[1]?.isCorrect || prev.p02.answer2.isCorrect,
            },
            isAllCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted: isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
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
      vAlign={'flex-start'}
      submitLabel={cardData.p02.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={cardData.p02.answer1.value.trim() === '' || cardData.p02.answer2.value.trim() === ''}
      submitBtnColor={
        isNotEmptyString(cardData.p02.answer1.value) && isNotEmptyString(cardData.p02.answer2.value)
          ? showAnswer
            ? EStyleButtonTypes.DEFAULT
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
    >
      <BoxWrap marginBottom={'15px'}>
        <Box useFull hAlign='center' flexDirection='column'>
          <Box alignSelf='end'>
            <Button
              tabIndex={101}
              minWidth='118px'
              size={EStyleSizes.SMALL}
              color={EStyleButtonTypes.SECONDARY}
              label='지문 보기'
              useRound
              onClick={openModal}
            />
          </Box>
        </Box>
      </BoxWrap>

      <Box background={'white'} useRound hAlign={'center'}>
        <Box>
          <Typography>What did the two old men do from the afternoon to the evening?</Typography>
          <Box hAlign={'flex-start'}>
            <Typography>
              <StyledIcon src={RightArrowIcon} type={ESvgType.IMG} />
              <TextPartRight>The two old men recalled</TextPartRight>
              <InputWrapper>
                <Input
                  status={cardData.p02.isSubmitted ? (cardData.p02.answer1.isCorrect ? '' : 'error') : 'default'}
                  width={'230px'}
                  textAlign='start'
                  value={cardData.p02.answer1.value}
                  onChange={handleInput1OnChange}
                  maxLength={99}
                  readOnly={cardData.p02.isSubmitted}
                />
              </InputWrapper>{' '}
              <InputWrapper>
                <Input
                  status={cardData.p02.isSubmitted ? (cardData.p02.answer2.isCorrect ? '' : 'error') : 'default'}
                  width={'230px'}
                  textAlign='start'
                  value={cardData.p02.answer2.value}
                  onChange={handleInput2OnChange}
                  maxLength={99}
                  readOnly={cardData.p02.isSubmitted}
                />
              </InputWrapper>
              <TextPartLeft>from the afternoon to the evening.</TextPartLeft>
            </Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer && cardData.p02.isSubmitted}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{answers.answer1 + ' ' + answers.answer2}</Box>
        </Box>
      </BottomSheet>

      <Dialog
        useHeader
        header={DialogHeader}
        width={921}
        topHeight={50}
        height={500}
        isShow={showModal}
        onClose={closeModal}
        useFooter={true}
        closeLabel='지문 닫기'
        tabIndex={103}
      >
        <Box>
          <Typography>
            &nbsp;&nbsp;&nbsp;&nbsp;{modalText.text1}
            <br /> <br /> &nbsp;&nbsp;&nbsp;&nbsp;{modalText.text2}
          </Typography>
        </Box>
      </Dialog>
    </Container>
  );
};

export default P02;

const TextPartLeft = styled.span`
  display: inline;
  padding-left: 12px;
`;
const TextPartRight = styled.span`
  display: inline;
  padding-right: 12px;
`;
const StyledIcon = styled(SvgIcon)`
  vertical-align: text-top;
  padding-right: 8px;
`;
const InputWrapper = styled.div`
  display: inline-block;
  margin-bottom: 6px;
`;
