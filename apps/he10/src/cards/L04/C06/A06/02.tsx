import { useEffect, useState } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  Dialog,
  Scroll,
  Button,
  Input,
  EStyleButtonTypes,
  EStyleSizes,
  EStyleFontSizes,
  Typography,
  BottomSheet,
  Tag,
  ETagLine,
  IQuestionProps,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C06A06 } from './store';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(L04C06A06);
  const [isShow, setIsShow] = useState<boolean>(false);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const contents =
    'An example of a circular economy in action occurs when a chain of coffee shops collaborates with an organization to collect spent coffee grounds from its shops. These grounds are processed to remove impurities and dried out. The resulting SCGs are sold to fertilizer companies, where they are transformed into organic fertilizer. This fertilizer is later sold back to the coffee shop chain. The chain provides the fertilizer to local ecofriendly farmers, who then sell their produce back to the chain. The farm produce can be used to create various food items, such as rice chips and dried sweet potatoes, which are sold in the chain’s coffee shops. By repurposing coffee grounds in this manner, related businesses and local farmers can benefit both economically and environmentally.';

  const handleInputChangeEvent = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    }
    changeData('P02', 1, subKey, value);
  };

  const onGrade = () => {
    if (cardData.p02.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const isCorrect1 = cardData.p02.answer1.trim() === cardData.p02.solution1;
      const isCorrect2 = cardData.p02.answer2.trim() === cardData.p02.solution2;

      const isCorrect = isCorrect1 && isCorrect2;
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
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
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
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
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
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A Better Future for Coffee Waste (4)',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Q4. Fill in the blanks to complete the sentences.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
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

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      onSubmit={onGrade}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p02.answer1 && cardData.p02.answer2)}
      submitBtnColor={
        !(cardData.p02.answer1 && cardData.p02.answer2) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
    >
      <Box hAlign='right' marginBottom={'10px'}>
        <Button minWidth='118px' size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문보기' useRound onClick={openModal} />
      </Box>

      <Box background={'white'} useRound marginTop={'40px'}>
        <Typography useGap={false} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
          What kind of food items are made from produce grown with coffee fertilizer? <br /> Food items such as{' '}
          <Input
            value={cardData.p02.answer1}
            width='150px'
            onChange={e => handleInputChangeEvent(1, e.target.value)}
            maxLength={15}
            status={
              !cardData.p02.isSubmitted
                ? !cardData.p02.answer1
                : cardData.p02.answer1.trim() !== cardData.p02.solution1
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            inputSize='x-small'
            readOnly={cardData.p02.isSubmitted}
            ariaLabel='1번 답란'
          />{' '}
          <Input
            value={cardData.p02.answer2}
            width='150px'
            onChange={e => handleInputChangeEvent(2, e.target.value)}
            maxLength={15}
            status={
              !cardData.p02.isSubmitted
                ? !cardData.p02.answer2
                : cardData.p02.answer2.trim() !== cardData.p02.solution2
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            inputSize='x-small'
            readOnly={cardData.p02.isSubmitted}
            ariaLabel='2번 답란'
          />{' '}
          and dried sweet potatoes are made.
        </Typography>
      </Box>

      <Dialog
        width={921}
        height={500}
        topHeight={50}
        useHeader
        header={() => (
          <Box height='50px' marginBottom='20px' background={'gray'} useRound={true}>
            <Typography useGap={false} weight='var(--font-weight-bold)' size={EStyleFontSizes.MEDIUM}>
              A Better Future for Coffee Waste (4)
            </Typography>
          </Box>
        )}
        isShow={isShowModal}
        closeLabel='지문 닫기'
        onClose={closeModal}
        useFooter={true}
        confirmLabel='지문 닫기'
      >
        <Scroll tabIndex={0}>
          <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
            {contents}
          </Typography>
        </Scroll>
      </Dialog>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false} size={EStyleFontSizes.MEDIUM} usePre>
              rice, chips
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
