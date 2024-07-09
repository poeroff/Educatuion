import { useState, useEffect } from 'react';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C06A04b } from './store';

import {
  TMainHeaderInfoTypes,
  Box,
  Dialog,
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
  EStyleFontSizes,
  ESvgType,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow_right from '@/assets/icon/arrow_right.svg';
import { isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const currentPage = 'P02';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A04b);
  const { userId } = useRecoilValue(studentAtom);

  const [showAnswer, setShowAnswer] = useState(false);
  const [opened, setOpened] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A Better Future for Coffee Waste (2)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q2. Fill in the blanks to complete the sentences.',
  };

  const content = ` The world’s widespread love of coffee comes at a substantial environmental cost, as the extraction process generates significant waste. Only 0.2 percent of a coffee bean is used to make coffee, with the remaining 99.8 percent disposed of as waste. As a result, the vast quantity of coffee consumed worldwide produces millions of tons of coffee waste each year.`;

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
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
          [currentPage]: {
            ...prev[currentPage],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[currentPage].answer,
            isSubmitted,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (value: string) => {
    const truncateValue = truncateToMaxBytes(value);
    setCardData(prev => ({ ...prev, [currentPage]: { ...prev[currentPage], answer: truncateValue } }));
    changeData(currentPage, 1, 1, truncateValue);
  };

  const onSubmitText = () => {
    if (cardData[currentPage].isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      setCardData(prev => ({ ...prev, [currentPage]: { ...prev[currentPage], isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[currentPage].answer,
            },
          ],
        },
      ];
      submitData(currentPage, userSubmission);
    }
  };

  const openModal = () => {
    setOpened(true);
  };
  const closeModal = () => {
    setOpened(false);
  };

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={!cardData[currentPage].isSubmitted ? '완료하기' : !showAnswer ? '답안 보기' : '답안 닫기'}
      submitBtnColor={
        isNotEmptyString(cardData[currentPage].answer)
          ? showAnswer
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      submitDisabled={!isNotEmptyString(cardData[currentPage].answer)}
      onSubmit={onSubmitText}
      bodyId='targetContainer'
      vAlign='flex-start'
    >
      <BoxWrap marginBottom={'15px'}>
        <Box width={'100%'} hAlign={'flex-end'}>
          <Button
            tabIndex={101}
            minWidth='96px'
            label={'지문 보기'}
            color={EStyleButtonTypes.SECONDARY}
            size={EStyleSizes['SMALL']}
            onClick={openModal}
            useRound
          />
        </Box>
      </BoxWrap>

      <Box background={'white'} useRound>
        <Box>
          <Typography>What other environmental problems can be caused by consuming coffee?</Typography>
        </Box>
        <Box>
          <SvgIcon style={{ verticalAlign: 'text-top' }} src={arrow_right} alt='오른쪽을 가르키는 화살표 아이콘' type={ESvgType.IMG} />
          <Typography>Using</Typography>
          <Input
            value={cardData[currentPage].answer}
            width='550px'
            maxLength={100}
            onChange={e => handleInputChange(e.target.value)}
            placeholder='내용을 넣어 주세요.'
            readOnly={cardData[currentPage].isSubmitted}
            ariaLabel='답안 입력란'
          />
          <Typography>can cause environmental pollution.</Typography>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' show={showAnswer} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>
              Using
              <Typography textDecoration={'underline'}>plastic covers, sticks, and cups</Typography>
              can cause environmental pollution.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog
        tabIndex={102}
        width={893}
        height={458}
        topHeight={50}
        useHeader
        header={() => (
          <Box height='50px' marginBottom='20px' background={'var(--color-grey-100)'} vAlign='center' useRound={true}>
            <Typography weight={'var(--font-weight-bold)'} size={EStyleFontSizes.MEDIUM}>
              A Better Future for Coffee Waste (2)
            </Typography>
          </Box>
        )}
        isShow={opened}
        onClose={closeModal}
        useFooter={true}
        closeLabel={'지문 닫기'}
      >
        <Typography weight={'var(--font-weight-medium)'} size={EStyleFontSizes.MEDIUM} style={{ whiteSpace: 'pre-wrap' }}>
          &nbsp;{content}
        </Typography>
      </Dialog>
    </Container>
  );
};

export default P02;
