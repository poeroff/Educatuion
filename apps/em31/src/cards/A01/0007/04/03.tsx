import {
  Box,
  IQuestionProps,
  BottomSheet,
  InputStatus,
  EStyleButtonTypes,
  ETagLine,
  Tag,
  Input,
  Label,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState, useEffect, ChangeEvent } from 'react';
import { isAnswer, getMarking } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { A01_0006_04_store } from './store';
import { studentAtom } from '@/stores/student';

const PAGE_NUMBER = 'P03';
const PAGE_KEY = 'p03';

const P03 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(A01_0006_04_store);
  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setShow] = useState(false);

  const submitLabel = cardData[PAGE_KEY].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기';
  const submitDisabled = cardData[PAGE_KEY].data.some(data => data.answer === '');
  const submitBtnColor = !submitDisabled
    ? cardData[PAGE_KEY].isSubmitted
      ? isShow
        ? EStyleButtonTypes.GRAY
        : EStyleButtonTypes.YELLOW
      : EStyleButtonTypes.YELLOW
    : EStyleButtonTypes.SECONDARY;

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
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '오후에 심을 나무 수 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄷ' type='paint' background='#969590' color='var(--color-white)' />
        오후에 심을 나무 수를 구해 보세요.
      </>
    ),
    mark: getMarking(cardData[PAGE_KEY].isSubmitted, cardData[PAGE_KEY].isCorrect),
    markSize: 'middle',
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
        {
          subKey: 3,
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
      console.log(userSubmissionList);
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

    const isCorrect1 = isAnswer(result.data[0].answer.trim(), result.data[0].solution);
    const isCorrect2 = isAnswer(result.data[1].answer.trim(), result.data[1].solution);
    const isCorrect3 = isAnswer(result.data[2].answer.trim(), result.data[2].solution);
    const allCorrect = isCorrect1 && isCorrect2 && isCorrect3;

    setCardData(prev => ({
      ...prev,
      [PAGE_KEY]: {
        ...prev[PAGE_KEY],
        isSubmitted: true,
        isCorrect: allCorrect,
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
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: result.data[1].answer,
            isAnswer: true,
            isCorrect: isCorrect2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: result.data[2].answer,
            isAnswer: true,
            isCorrect: isCorrect3,
          },
        ],
        isCorrect: allCorrect,
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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={submitLabel}
      onSubmit={handleSubmit}
      vAlign='flex-start'
      submitDisabled={submitDisabled}
      submitBtnColor={submitBtnColor}
      useRound
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' padding={'20px 44px'} useRound>
          <Input
            name='input_0'
            value={cardData[PAGE_KEY].data[0].answer}
            onChange={handleInputChangeEvent}
            width='130px'
            ariaLabel='오늘 심을 나무의 그루 수'
            status={
              cardData[PAGE_KEY].isSubmitted && !cardData[PAGE_KEY].isCorrect
                ? InputStatus.ERROR
                : cardData[PAGE_KEY].data[0].answer
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            readOnly={cardData[PAGE_KEY].isSubmitted}
          />
          <Typography>-</Typography>
          <Input
            name='input_1'
            value={cardData[PAGE_KEY].data[1].answer}
            onChange={handleInputChangeEvent}
            width='130px'
            ariaLabel='오전에 심은 나무의 그루 수'
            status={
              cardData[PAGE_KEY].isSubmitted && !cardData[PAGE_KEY].isCorrect
                ? InputStatus.ERROR
                : cardData[PAGE_KEY].data[1].answer
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            readOnly={cardData[PAGE_KEY].isSubmitted}
          />
          <Typography>=</Typography>
          <Input
            name='input_2'
            value={cardData[PAGE_KEY].data[2].answer}
            onChange={handleInputChangeEvent}
            width='130px'
            ariaLabel='오후에 심을 나무의 그루 수'
            status={
              cardData[PAGE_KEY].isSubmitted && !cardData[PAGE_KEY].isCorrect
                ? InputStatus.ERROR
                : cardData[PAGE_KEY].data[2].answer
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            readOnly={cardData[PAGE_KEY].isSubmitted}
          />
        </Box>
      </Box>

      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{cardData[PAGE_KEY].data.map(t => t.solution).join(', ')}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>325 - 168 = 157 이므로 157 그루입니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
