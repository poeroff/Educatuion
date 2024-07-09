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
  EStyleFontSizes,
  EStyleSizes,
  ETagLine,
  Typography,
  BottomSheet,
  Tag,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { STL03C06A06 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const DialogHeader = () => {
  return (
    <Box vAlign='center' width='100%' height='48px' useRound backgroundColor='var(--color-grey-100)' marginBottom='24px' tabIndex={105}>
      <Typography weight={'bold'} lineHeight='unset' size={EStyleFontSizes.MEDIUM}>
        Exploring the Technology and Its Applications
      </Typography>
    </Box>
  );
};

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(STL03C06A06);
  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setIsShow] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Turning Out: The Science of Noise-Cancellation (4)',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Q4. Fill in the blanks to complete the sentence.',
    mark: cardData.p02.isSubmitted ? (isCorrect ? 'correct' : 'incorrect') : 'none',
    marksize: 'middle',
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
  const submitBtnColor = isShow
    ? EStyleButtonTypes.GRAY
    : cardData.p02.answer1 === '' || cardData.p02.answer2 === ''
    ? EStyleButtonTypes.SECONDARY
    : EStyleButtonTypes.PRIMARY;
  const modalText = (
    <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM} style={{ marginBottom: '20px' }}>
      Noise-cancelling technology is not only used in music devices. Other fields also take advantage of this technology, such as ticket offices at
      tourist attractions which are often very noisy. Microphones are installed in ticket offices to detect external noise, and an opposite sound wave
      is generated and transmitted through a speaker, enabling the ticket agent to hear the customer’s voice clearly. Another area in which this
      technology is used is drive-through fast-food restaurants and coffee shops. They use noise-cancelling headsets to improve communication between
      employees and customers by eliminating vehicle noise.These noise-cancelling headsets help drive-through employees take orders accurately. The
      same technology is also used for cars, whose audio systems generate waves to cancel out unpleasant sounds such as engine, wind, and road noise.
      Thanks to noise-cancelling devices, it is possible for drivers to focus on driving without being disturbed by distracting noises.
    </Typography>
  );
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
  const handelSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setIsShow(!isShow);
    } else {
      setIsCorrect(cardData.p02.answer1 === cardData.p02.solution[0] && cardData.p02.answer2 === cardData.p02.solution[1]);
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
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answer2,
              isAnswer: true,
            },
          ],
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };
  const handleInputChangeEvent = (index: number, { target }: ChangeEvent<HTMLInputElement>) => {
    if (index === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: target.value, answer2: prev.p02.answer2 } }));
    } else if (index === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: prev.p02.answer1, answer2: target.value } }));
    }
    changeData('P02', 1, index, target.value);
  };
  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };
  useEffect(() => {
    console.log(cardData.p02);
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);
  useEffect(() => {}, [cardData.p02]);
  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      onSubmit={handelSubmit}
      submitDisabled={cardData.p02.answer1 === '' || cardData.p02.answer2 === ''}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={submitBtnColor}
      bodyId='targetContainer'
    >
      <BoxWrap marginBottom={'15px'}>
        <Box width={'100%'} hAlign={'flex-end'}>
          <Button label={'지문 보기'} color={EStyleButtonTypes.SECONDARY} size={EStyleSizes['SMALL']} onClick={openModal} useRound />
        </Box>
      </BoxWrap>
      <Box background={'white'} useRound display='flex' alignContent='center'>
        <Scroll height='120px'>
          Noise-cancelling headsets improve communication between drive-through employees and customers by eliminating
          <Input
            ariaLabel='1번 답란'
            readOnly={cardData.p02.isSubmitted ? true : false}
            width='115px'
            maxLength={19}
            name='value1'
            value={cardData.p02.answer1}
            marginLeft={10}
            onChange={e => {
              handleInputChangeEvent(1, e);
            }}
            status={
              !cardData.p02.isSubmitted
                ? InputStatus.ENABLE
                : cardData.p02.answer1.trim() !== cardData.p02.solution[0]
                ? InputStatus.ERROR
                : InputStatus.DEFAULT
            }
          />
          <Input
            ariaLabel='2번 답란'
            readOnly={cardData.p02.isSubmitted ? true : false}
            width='95px'
            maxLength={19}
            name='value2'
            value={cardData.p02.answer2}
            marginLeft={10}
            onChange={e => {
              handleInputChangeEvent(2, e);
            }}
            status={
              !cardData.p02.isSubmitted
                ? InputStatus.ENABLE
                : cardData.p02.answer2.trim() !== cardData.p02.solution[1]
                ? InputStatus.ERROR
                : InputStatus.DEFAULT
            }
          />{' '}
          .
        </Scroll>
      </Box>

      <Dialog
        useHeader
        header={DialogHeader}
        topHeight={50}
        width={921}
        height={470}
        isShow={isShowModal}
        closeLabel='확인'
        onClose={closeModal}
        useFooter={true}
        confirmLabel='확인'
      >
        <Box>
          <Typography>{modalText}</Typography>
        </Box>
      </Dialog>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow} closeOption={{ useYn: true, onClose: () => setIsShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시답안' />
          </Box>
          <Box marginTop='12px'>(1)vehicle (2)noise</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
