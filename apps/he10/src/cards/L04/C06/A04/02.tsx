import { ChangeEvent, useEffect, useState } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  Dialog,
  Scroll,
  Button,
  Input,
  BoxWrap,
  EStyleButtonTypes,
  EStyleSizes,
  Typography,
  EStyleFontSizes,
  IQuestionProps,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L04C06A04 } from './store';
import { studentAtom } from '@/stores/student';

const PAGE_NUMBER = 'P02';
const PAGE_KEY = 'p02';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A04);

  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShow, setShow] = useState(false);

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A Better Future for Coffee Waste (2)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q2. Fill in the blanks to complete the sentences.',
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      const newData = cardData[PAGE_KEY].data.map((data, index) => {
        return { ...data, answer: userSubmissionList[0]?.inputData[index].value || cardData[PAGE_KEY].data[index].answer };
      });

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [PAGE_KEY]: {
            ...prev[PAGE_KEY],
            data: [...newData],
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData[PAGE_KEY].isSubmitted) {
      setShow(prev => !prev);
      return;
    }

    const result = cardData[PAGE_KEY];

    setCardData(prev => ({
      ...prev,
      [PAGE_KEY]: {
        ...prev[PAGE_KEY],
        isSubmitted: true,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: result.data[0].answer,
            isAnswer: true,
          },
        ],
      },
    ];
    submitDataWithResult(PAGE_NUMBER, userSubmission, true);
  };

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const subKey = Number(name.split('_')[1]);

    const newData = [...cardData[PAGE_KEY].data];
    newData[subKey] = {
      ...newData[subKey],
      answer: value,
    };

    setCardData(prev => ({ ...prev, [PAGE_KEY]: { ...prev[PAGE_KEY], data: newData } }));
    changeData(PAGE_NUMBER, 1, subKey + 1, value);
  };

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  const handleShowAnswer = () => {
    setShow(!isShow);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      onSubmit={cardData[PAGE_KEY].isSubmitted ? handleShowAnswer : handleSubmit}
      submitLabel={cardData[PAGE_KEY].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!cardData[PAGE_KEY].data[0].answer}
      submitBtnColor={
        cardData[PAGE_KEY].isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : cardData[PAGE_KEY].data[0].answer === ''
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <Box background={'white'} useRound>
        <Scroll height='300px'>
          What other environmental problems can be caused by consuming coffee?
          <br />
          <Input
            name='input_0'
            maxLength={100}
            value={cardData[PAGE_KEY].data[0].answer}
            width='610px'
            readOnly={cardData[PAGE_KEY].isSubmitted}
            onChange={handleInputChangeEvent}
            placeholder='내용을 넣어 주세요.'
            aria-label='내용을 넣어 주세요.'
          />
          &nbsp; can cause environmental pollution.
        </Scroll>
      </Box>

      <BoxWrap justifyContent={'space-between'} marginTop={'24px'} width={'100%'}>
        <Box width={'30%'}></Box>
        <Box width={'30%'} hAlign='center'></Box>
        <Box width={'30%'} hAlign='flex-end'>
          <Button label={'지문 보기'} color={EStyleButtonTypes.SECONDARY} size={EStyleSizes['SMALL']} minWidth='132px' useRound onClick={openModal} />
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false}>Using plastic covers, sticks, and cups</Typography>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog
        isShow={isShowModal}
        width={893}
        height={458}
        topHeight={50}
        useHeader
        header={() => (
          <Box height='50px' marginBottom='20px' background={'gray'} useRound={true}>
            <Typography useGap={false} weight={'bold'} size={EStyleFontSizes.MEDIUM}>
              A Better Future for Coffee Waste (2)
            </Typography>
          </Box>
        )}
        useFooter
        onClose={closeModal}
        closeLabel='닫기'
      >
        <Typography>
          The world’s widespread love of coffee comes at a substantial environmental cost, as the extraction process generates significant waste. Only
          0.2 percent of a coffee bean is used to make coffee, with the remaining 99.8 percent disposed of as waste. As a result, the vast quantity of
          coffee consumed worldwide produces millions of tons of coffee waste each year.
        </Typography>
      </Dialog>
    </Container>
  );
};

export default P02;
