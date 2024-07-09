import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  Dialog,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleSizes,
  ESvgType,
  ETagLine,
  Input,
  InputStatus,
  IQuestionProps,
  SvgIcon,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';
import { ChangeEvent, useEffect, useState } from 'react';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L01C06A03 } from './store';
import { isAnswer, isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import { useRecoilState, useRecoilValue } from 'recoil';

const P02 = () => {
  const [isContentShow, setContentShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A03);
  const pageNumber = 'P02';
  const pageKey = 'p02';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Volunteering at an Animal Sanctuary (1)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q1. Fill in the blank to complete the sentences.',
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

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
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = isAnswer(cardData[pageKey].answer, cardData[pageKey].solution);
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageKey].answer,
              isAnswer: true,
              isCorrect: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const truncateValue = truncateToMaxBytes(e.target.value);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: truncateValue } }));
    changeData(pageNumber, 1, 1, truncateValue);
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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      submitDisabled={!cardData[pageKey].answer}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={onGrade}
      submitBtnColor={!cardData[pageKey].answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <BoxWrap marginBottom={'15px'}>
        <Box width={'100%'} hAlign={'flex-end'}>
          <Button
            tabIndex={101}
            label={'지문 보기'}
            color={EStyleButtonTypes.SECONDARY}
            size={EStyleSizes['SMALL']}
            onClick={() => {
              setContentShow(!isContentShow);
            }}
            useRound
          />
        </Box>
      </BoxWrap>
      <Box background={'white'} useRound marginTop={30}>
        <Box>
          <StyledTypography>Where did the club members decide to go for their volunteer work?</StyledTypography>
        </Box>
        <Box hAlign={'flex-start'}>
          <StyledTypography>
            <StyledIcon src={RightArrowIcon} type={ESvgType.IMG} />
            <Typography>They decided to go to an animal</Typography>{' '}
            <Input
              width={'220px'}
              textAlign='start'
              value={cardData[pageKey].answer}
              onChange={handleChange}
              maxLength={2000}
              inputSize={'x-small'}
              readOnly={cardData[pageKey].isSubmitted}
              status={
                !isNotEmptyString(cardData[pageKey].answer)
                  ? InputStatus.DEFAULT
                  : cardData[pageKey].isSubmitted && !isAnswer(cardData[pageKey].answer, cardData[pageKey].solution)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              ariaLabel='답란'
            />
            <Typography useGap={false}>.</Typography>
          </StyledTypography>
        </Box>
      </Box>
      <Dialog
        isShow={isContentShow}
        width={893}
        height={458}
        topHeight={50}
        useHeader
        header={() => (
          <Box height='50px' marginBottom='20px' background={'gray'} useRound={true}>
            <Typography useGap={false} weight={'bold'} size={EStyleFontSizes.MEDIUM}>
              Volunteering at an Animal Sanctuary (1)
            </Typography>
          </Box>
        )}
        useFooter
        onClose={() => setContentShow(!isContentShow)}
        closeLabel='닫기'
      >
        <Typography>
          As the leader of our school club Care for Animals, I organized a volunteer trip to an animal sanctuary for my club members. An animal
          sanctuary is a special place where rescued, injured, or abused animals can live in a safe and caring environment. All the club members and I
          agreed that the sanctuary would be the perfect place to learn about animal care. Excited for a new experience, we set out to volunteer.
        </Typography>
      </Dialog>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              {cardData[pageKey].solution}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;

const StyledTypography = styled(Typography)`
  display: block;
  position: relative;
  max-width: 100%;
`;
const StyledIcon = styled(SvgIcon)`
  vertical-align: middle;
  padding-right: 12px;
`;
