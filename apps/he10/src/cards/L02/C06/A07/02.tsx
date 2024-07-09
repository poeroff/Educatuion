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
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { L02C06A07 } from './store';

const DialogHeader = () => {
  return (
    <Box border={'none'} background={'gray'} height='50px' marginBottom='20px' useRound useFull>
      <Typography weight={'bold'} lineHeight='unset' size={EStyleFontSizes.MEDIUM}>
        Gathering of the Whakapapa (5)
      </Typography>
    </Box>
  );
};

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A07);
  const { userId } = useRecoilValue(studentAtom);

  const [openText, setOpenText] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Gathering of the Whakapapa (5)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q5. Fill in the blanks to complete the sentences.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const contents =
    'It was early morning and still dark when we returned to Auntie’s place. All the lights were on, and the village people were waiting for us. Smiling, Nani Tama lifted up the whakapapa and offered it to the village. Our hearts were full because our grandfather had saved our past for us. Our Nani Tama smiled again. His smile grew tired. He sighed. “At last, I may go now.” Then, he closed his eyes. “No, Dad!” Auntie Hiraina cried. The sun burst across the hills.';

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

  const handleInputChangeEvent = (value: string) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    changeData('P02', 1, 1, value);
  };

  const handleSubmitChange = () => {
    if (cardData.p02.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const isCorrect = isAnswer(cardData.p02.answer, cardData.p02.solution);
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
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
      onSubmit={handleSubmitChange}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitDisabled={!isNotEmptyString(cardData.p02.answer)}
      submitBtnColor={
        isNotEmptyString(cardData.p02.answer) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
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
          useHeader
          header={DialogHeader}
          width={893}
          height={458}
          topHeight={50}
          isShow={openText}
          onClose={() => setOpenText(false)}
          useFooter={true}
          closeLabel={'지문 닫기'}
        >
          <Typography>
            <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM} style={{ marginBottom: '20px' }}>
              {contents}
            </Typography>
          </Typography>
        </Dialog>
      )}
      <Box background={'white'} useRound>
        <Scroll height='100%'>
          How did the villagers probably feel when Nani Tama offered them the whakapapa? <br />
          <StyledIcon src={RightArrowIcon} type={ESvgType.IMG} />
          <TextPartLeft>They probably felt </TextPartLeft>
          <Input
            value={cardData.p02.answer}
            minWidth='259px'
            onChange={e => handleInputChangeEvent(e.target.value)}
            maxLength={33}
            placeholder='내용을 넣어 주세요.'
            status={
              !isNotEmptyString(cardData.p02.answer)
                ? InputStatus.DEFAULT
                : cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer, cardData.p02.solution)
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            inputSize='x-small'
            readOnly={cardData.p02.isSubmitted}
          />
          .
        </Scroll>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              {cardData.p02.solution}
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
