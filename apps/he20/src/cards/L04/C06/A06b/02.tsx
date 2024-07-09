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
  Scroll,
  Dropdown,
  IQuestionProps,
  SvgIcon,
  ESvgType,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';

import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L04C06A06b } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const pageNumber = 'P02';
  const [isShow, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownLabels = ['protected', 'controlled'];

  const { changeData, initData, saveData, submitDataWithResult } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A06b);
  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: false,
          isCorrect: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isCorrect: userSubmissionList[0].inputData[0]?.isCorrect || cardData.p02.isCorrect,
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

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Will AI-Powered Neural Implants Make Us Super-Humans? (4)',
  };
  const questionText = (
    <Typography useGap={false}>
      <Typography weight={'var(--font-weight-bold)'} useGap={false}>
        Q4.
      </Typography>{' '}
      Choose the one to complete the sentences.{' '}
    </Typography>
  );

  const questionInfo: IQuestionProps = {
    text: questionText,
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const content = `Before we can fully embrace the era of AI-powered neural implants, many tricky ethical issues should be addressed. The integration of AI technology with the human brain raises concerns about what it means to be human. Our brains are believed to be central to our identity, existence, and value as human beings. However, an over-reliance on technology may delay our natural development and create confusion about whether we are human, AI, or something in between. Another critical issue is privacy. There’s a risk that organizations or hackers could access personal data without permission through AI-connected implants. This means that our thoughts, emotions, and behaviors could be controlled by hackers. There’s an additional risk that this technology could lead to even greater social inequality, given that it may not be available to all due to its high cost. Such unequal access to the technology could intensify the division between those who can afford the implants and those who cannot.`;

  const handleSubmit = () => {
    if (!cardData.p02.isSubmitted) {
      const isCorrect = cardData.p02.answer === cardData.p02.solution;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer,
              isCorrect: isCorrect,
              isAnswer: true,
            },
          ],
        },
      ];
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
    } else {
      setShow(!isShow);
    }
  };

  const handleDropdownClick = (index: number, value: string | undefined) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    changeData(pageNumber, 1, 1, value);
  };

  const getSubmitLabel = () => (cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기');
  const getButtonColor = () => {
    if (!cardData.p02.isSubmitted) {
      return !cardData.p02.answer ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;
    } else {
      return isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const getDropDownSelectedValue = () => {
    return !cardData.p02.isSubmitted && !cardData.p02.answer ? '' : cardData.p02.answer;
  };

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={getSubmitLabel()}
      submitDisabled={!cardData.p02.answer && !cardData.p02.isSubmitted}
      submitBtnColor={getButtonColor()}
      onSubmit={() => handleSubmit()}
    >
      <BoxWrap useFull>
        <Box vAlign={'center'} hAlign={'center'} useFull useRound border={'1px solid var(--color-grey-600)'}>
          <Box padding={'0px 20px 0px 20px'}>
            <Typography lineHeight={'36px'}>
              What problem would occur if hackers could freely access personal data through neural implants?
              <Box vAlign={'center'}>
                <StyledIcon src={RightArrowIcon} type={ESvgType.IMG} />
                Our thoughts, emotions,
              </Box>
              and behaviors could be
              <Box marginTop={'10px'} display={'inline-block'}>
                <Dropdown
                  type='up'
                  dropdownList={dropdownLabels}
                  selectedValue={getDropDownSelectedValue()}
                  width={'240px'}
                  readOnly={cardData.p02.isSubmitted}
                  isError={cardData.p02.isSubmitted && !cardData.p02.isCorrect}
                  onClick={value => handleDropdownClick(1, value)}
                />
              </Box>{' '}
              by hackers.
            </Typography>
          </Box>
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
                <Typography lineHeight={'48px'} useGap={true}>
                  &nbsp;{content}
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

      <BottomSheet bottomSheetTargetId='container' height={'40%'} show={isShow} closeOption={{ useYn: true, onClose: () => setShow(false) }}>
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
const StyledIcon = styled(SvgIcon)`
  vertical-align: middle;
  padding-right: 12px;
`;
