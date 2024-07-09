import { useEffect, useState } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  Scroll,
  Button,
  Input,
  EStyleButtonTypes,
  EStyleSizes,
  Typography,
  Dialog,
  EStyleFontSizes,
  BottomSheet,
  SvgIcon,
  ESvgType,
  InputStatus,
  ETagLine,
  Tag,
  IQuestionProps,
  BoxWrap,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L03C06A03 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer, isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C06A03);
  const pageNo = 'P02';

  const [isShow, setIsShow] = useState<boolean>(false);
  const [openText, setOpenText] = useState<boolean>(false);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', ''],
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].inputData[0]?.isCorrect : false,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmitClick = () => {
    if (cardData.p02.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const isCorrect = cardData.p02.answer.every((val, idx) => isAnswer(val, cardData.p02.solution[idx]));
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p02.answer,
              isAnswer: true,
              isCorrect: isCorrect,
            },
          ],
        },
      ];
      submitDataWithResult(pageNo, userSubmission, isCorrect);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedAnswer = cardData.p02.answer.map((val, idx) => (idx === index ? truncateToMaxBytes(value) : val));
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: updatedAnswer } }));
    changeData(pageNo, 1, 1, updatedAnswer);
  };

  const isNotActive = () => {
    if (cardData.p02.answer.some(val => val == '')) return true;
    else return false;
  };

  const getSubmitBtnColor = () => {
    if (!cardData.p02.isSubmitted) {
      return isNotActive() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;
    } else {
      return !isShow ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.GRAY;
    }
  };

  const getInputStatus = (index: number) => {
    return isNotEmptyString(cardData.p02.answer[index])
      ? isAnswer(cardData.p02.answer[index], cardData.p02.solution[index])
        ? InputStatus.ENABLE
        : cardData.p02.isSubmitted && InputStatus.ERROR
      : InputStatus.DEFAULT;
  };

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'From Shadows to Spotlights (1)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q1. Fill in the blanks to complete the sentences.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const contents =
    'Welcome to the Dream Art Gallery! \n I’m Isabel Williams, the docent for the From Shadows to Spotlights exhibit. \n Today, you’re going to meet three amazing artists who never gave up on their art, despite challenges in their lives. \n Each artist has a unique painting style and story that has made their work highly valued. \n Let’s explore each artist’s life and artwork.';

  return (
    <Container
      bodyId='targetContainer'
      vAlign={'flex-start'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleSubmitClick}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={isNotActive()}
      submitBtnColor={getSubmitBtnColor()}
    >
      <BoxWrap marginBottom={'15px'}>
        <Box width={'100%'} hAlign='flex-end'>
          <Button
            size={EStyleSizes.SMALL}
            color={EStyleButtonTypes.SECONDARY}
            label='지문보기'
            useRound
            onClick={() => {
              setOpenText(true);
            }}
          />
        </Box>
      </BoxWrap>
      {openText && (
        <Dialog
          width={893}
          height={458}
          topHeight={50}
          useHeader
          header={() => (
            <Box height='50px' marginBottom='20px' background={'gray'} useRound={true}>
              <Typography useGap={false} weight={'bold'} size={EStyleFontSizes.MEDIUM}>
                From Shadows to Spotlights (1)
              </Typography>
            </Box>
          )}
          isShow={openText}
          onClose={() => setOpenText(false)}
          useFooter={true}
          closeLabel={'닫기'}
          tabIndex={101}
          tabIndexCount={3}
        >
          <Typography useGap={false} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
            {contents}
          </Typography>
        </Dialog>
      )}
      <Box background={'white'} useRound>
        <Scroll height='100%'>
          What is the topic of today’s exhibition? <br />
          <StyledIcon src={RightArrowIcon} type={ESvgType.IMG} />
          <TextPartLeft>The exhibition is about </TextPartLeft>
          <Input
            width='259px'
            maxLength={2000}
            inputSize='x-small'
            placeholder='내용을 넣어 주세요.'
            ariaLabel='1번 답란'
            status={getInputStatus(0)}
            onChange={e => handleInputChange(0, e.target.value)}
            value={cardData.p02.answer[0]}
            readOnly={cardData.p02.isSubmitted}
          />{' '}
          who never gave up on their art, despite{' '}
          <Input
            width='259px'
            maxLength={2000}
            inputSize='x-small'
            placeholder='내용을 넣어 주세요.'
            ariaLabel='2번 답란'
            status={getInputStatus(1)}
            onChange={e => handleInputChange(1, e.target.value)}
            value={cardData.p02.answer[1]}
            readOnly={cardData.p02.isSubmitted}
          />{' '}
          in their lives.
        </Scroll>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' flexDirection='column' display='flex'>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              artists, challenges
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;

const TextPartLeft = styled.span`
  display: inline;
  padding-left: 12px;
`;

const StyledIcon = styled(SvgIcon)`
  vertical-align: middle;
  padding-right: 12px;
`;
