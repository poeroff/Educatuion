import { Fragment, useEffect, useState } from 'react';
import {
  Box,
  Image,
  Typography,
  TMainHeaderInfoTypes,
  IQuestionProps,
  IAudioPlayerProps,
  Radio,
  Label,
  EStyleButtonTypes,
  BottomSheet,
  ETagLine,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L01C02A08 } from './store';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C02A08);
  const [isShow, setShow] = useState<boolean>(false);

  const pageNo = 'P01';
  const pageKey = 'p01';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: 'Listen More',
    iconType: 'listeningStrategy',
  };

  const questionInfo: IQuestionProps = {
    type: 'number',
    number: '1.',
    text: (
      <>
        <Typography useGap={false} color='var(--color-yellow-700)' weight='var(--font-weight-extraBold)' lineHeight='50px'>
          Listen and Check
        </Typography>
        &nbsp;Which is Correct?
      </>
    ),
    mark: getMarking(cardData[pageKey].isSubmitted, cardData[pageKey].isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C02/A08/ME1-L01-C02-A08-P01.mp3',
    right: -5,
    top: -5,
  };

  const handleRadio = (index: number) => {
    const currentAnswer = Array.isArray(cardData[pageKey].answer) ? cardData[pageKey].answer : [];
    const newData = [...currentAnswer];
    newData[0] = index;
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: newData } }));
    changeData(pageNo, 1, 1, newData);
  };

  const handleRadio2 = (index: number) => {
    const currentAnswer = Array.isArray(cardData[pageKey].answer) ? cardData[pageKey].answer : [];
    const newData = [...currentAnswer];
    newData[1] = index;
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: newData } }));
    changeData(pageNo, 1, 2, newData);
  };

  const data = [
    {
      name: 'Yuna Lee',
      class: ['2', '5'],
      movie: ['Kung Fu Panda', 'Wonder Woman'],
    },
  ];

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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNo]: {
            ...prev[pageKey],
            answer: userSubmissionList[0]?.inputData.map((item: { value: string }) => item.value) || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0]?.isCorrect : false,
            isCorrectInput: isSubmitted ? userSubmissionList[0]?.inputData.map((item: { isCorrect: boolean }) => item.isCorrect) : false,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const isError = (index: number) => {
    return cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrectInput[index];
  };

  const onSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
      return;
    } else {
      const isCorrect = cardData[pageKey].answer.every((val, index) => val === cardData[pageKey].solution[index]);
      const result: boolean[] = cardData[pageKey].answer.map((val, index) => val === cardData[pageKey].solution[index]);

      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect, isCorrectInput: result } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageKey].answer[0],
              isAnswer: true,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData[pageKey].answer[1],
              isAnswer: true,
            },
          ],
        },
      ];
      submitDataWithResult(pageKey, userSubmission, isCorrect);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageKey);
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      vAlign='flex-start'
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData[pageKey].answer[0] === -1 || cardData[pageKey].answer[1] === -1}
      submitBtnColor={
        cardData[pageKey].answer[0] === -1 || cardData[pageKey].answer[1] === -1
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={onSubmit}
    >
      <Box useFull useRound vAlign='center' background='#d0edf3' padding='50px 23px' key='dfsdf'>
        <Image src='/L01/C02/A08/ME1-L01-C02-A08-P01.jpg' alt='교복을 입은 여학생이 인사하고 있는 모습' width='268px' height='270px' />
        <Box useFull useRound background='var(--color-white)' padding='20px'>
          {data.map(dataName => (
            <Fragment key={dataName.name}>
              <Box vAlign='center' marginBottom='10px'>
                <Box marginRight='8px'>
                  <Label background={'var(--color-black)'} type={'paint'} size={'xxx-small'} />
                </Box>
                <Typography>Name : </Typography>
                <Typography>{dataName.name}</Typography>
              </Box>
              <Box vAlign='flex-start' marginBottom='10px'>
                <Box marginRight='8px'>
                  <Label background={'var(--color-black)'} type={'paint'} size={'xxx-small'} />
                </Box>
                <Typography>Class : </Typography>
                <Box vAlign='baseline' flexDirection='column' marginLeft='8px'>
                  {dataName.class.map((item, index) => (
                    <Radio
                      type={'circle'}
                      name={'radio-question-A'}
                      label={item}
                      value={index === cardData[pageKey].answer[0]}
                      onClick={() => handleRadio(index)}
                      isError={isError(0)}
                      key={`radio1-${index}`}
                      readOnly={cardData[pageKey].isSubmitted}
                    />
                  ))}
                </Box>
              </Box>
              <Box vAlign='flex-start'>
                <Box marginRight='8px'>
                  <Label background={'var(--color-black)'} type={'paint'} size={'xxx-small'} />
                </Box>
                <Typography>My favorite movie : </Typography>
                <Box vAlign='baseline' flexDirection='column' marginLeft='8px'>
                  {dataName.movie.map((item, index) => (
                    <Radio
                      type={'circle'}
                      name={'radio-question-B'}
                      value={index === cardData[pageKey].answer[1]}
                      onClick={() => handleRadio2(index)}
                      isError={isError(1)}
                      key={`radio2-${index}`}
                      readOnly={cardData[pageKey].isSubmitted}
                    >
                      <Typography fontStyle='italic'>{item}</Typography>
                    </Radio>
                  ))}
                </Box>
              </Box>
            </Fragment>
          ))}
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>2, Wonder Woman</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
