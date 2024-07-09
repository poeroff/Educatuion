import {
  BottomSheet,
  Box,
  Dialog,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Image,
  Input,
  InputStatus,
  Label,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import { checkAnswers, getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { A05_0001_05 } from './store';
const P03 = () => {
  const [isShow, setIsShow] = useState(false);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A05_0001_05);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' value={2} />
        시각을 읽어 보세요.
      </>
    ),
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isAllCorrect),
  };
  const BASE_URL = '/A05/0001/05/';
  const data = [
    { margin: '', img: 'EC31502.png', alt: '짧은 바늘은 3과 4 사이, 긴 바늘은 7을 가리키고 있습니다.', width: '180px', height: '160px' },
    {
      margin: '24px',
      img: 'EC31502-1.png',
      alt: '짧은 바늘은 11, 긴 바늘은 5와 6 사이에 있는 4개의 눈금 중 2번째 눈금을 가리키고 있습니다.',
      width: '180px',
      height: '160px',
    },
    { margin: '24px', img: 'EC31502-2.png', alt: '08:05가 표시되어 있습니다.', width: '200px', height: '115px' },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 6,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setIsShow(!isShow);
      return;
    }
    const isCorrect1 = checkAnswers(cardData.p03.answer1, cardData.p03.solution1);
    const isCorrect2 = checkAnswers(cardData.p03.answer2, cardData.p03.solution2);
    const isCorrect = [...isCorrect1, ...isCorrect2];
    const isAllCorrect = isCorrect.every(answer => answer);
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect, isAllCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.answer1[0],
            isCorrect: isCorrect[0],
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p03.answer1[1],
            isCorrect: isCorrect[1],
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p03.answer1[2],
            isCorrect: isCorrect[2],
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p03.answer2[0],
            isCorrect: isCorrect[3],
          },
          {
            subKey: 5,
            type: 'TEXT',
            value: cardData.p03.answer2[1],
            isCorrect: isCorrect[4],
          },
          {
            subKey: 6,
            type: 'TEXT',
            value: cardData.p03.answer2[2],
            isCorrect: isCorrect[5],
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];

    submitDataWithResult('P03', userSubmission, isAllCorrect);
  };
  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer1:
              [userSubmissionList[0].inputData[0]?.value, userSubmissionList[0].inputData[1]?.value, userSubmissionList[0].inputData[2]?.value] ||
              cardData.p03.answer1,
            answer2:
              [userSubmissionList[0].inputData[3]?.value, userSubmissionList[0].inputData[4]?.value, userSubmissionList[0].inputData[5]?.value] ||
              cardData.p03.answer2,

            isCorrect:
              [
                userSubmissionList[0].inputData[0]?.isCorrect,
                userSubmissionList[0].inputData[1]?.isCorrect,
                userSubmissionList[0].inputData[2]?.isCorrect,
                userSubmissionList[0].inputData[3]?.isCorrect,
                userSubmissionList[0].inputData[4]?.isCorrect,
                userSubmissionList[0].inputData[5]?.isCorrect,
              ] || cardData.p03.isCorrect,
            isSubmitted,
            isAllCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }

      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (key: number, index: number, value: string) => {
    if (key === 1) {
      const inputAnswer = [...cardData.p03.answer1];
      inputAnswer[index] = value;
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: inputAnswer } }));
    } else if (key === 2) {
      const inputAnswer = [...cardData.p03.answer2];
      inputAnswer[index] = value;
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: inputAnswer } }));
    }

    const subKey = key === 1 ? key + index : key + index + 2;
    changeData('P03', 1, subKey, value);
  };

  const isInputAnswer = () => {
    const answerList1 = [...cardData.p03.answer1];
    const answerList2 = [...cardData.p03.answer2];
    const hasEmptyValue = answerList1.some(element => element === '') && answerList2.some(element => element === '');

    return !hasEmptyValue;
  };

  const handleInputStatus = (key: number, index: number): InputStatus => {
    const subKey = key === 1 ? key + index : key + index + 2;
    if (key === 1) {
      return !isNotEmptyString(cardData.p03.answer1[index])
        ? InputStatus.DEFAULT
        : cardData.p03.isSubmitted && !cardData.p03.isCorrect[subKey - 1]
        ? InputStatus.ERROR
        : InputStatus.ENABLE;
    }
    return !isNotEmptyString(cardData.p03.answer2[index])
      ? InputStatus.DEFAULT
      : cardData.p03.isSubmitted && !cardData.p03.isCorrect[subKey - 1]
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  useEffect(() => {
    return () => {
      saveData('P03');
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
      background={'var(--color-white)'}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!isInputAnswer()}
      submitBtnColor={isInputAnswer() ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      onSubmit={handleSubmit}
      useLinkLabel={cardData.p03.isSubmitted && !cardData.p03.isAllCorrect}
      linkLabel='맞춤 학습하기'
      onLink={() => setIsShowDialog(true)}
    >
      <Box display='flex'>
        {data.map((value, index) => {
          return (
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='end'
              type='dashed'
              marginLeft={value.margin}
              padding={'24px 17px'}
              borderRadius={16}
              height={324}
              key={`list-item-${index}`}
            >
              <Box display='flex' justifyContent='center'>
                <Image src={BASE_URL + value.img || ''} alt={value.alt} width={value.width} height={value.height} />
              </Box>
              <Box marginTop={40}>
                <Input
                  type='number'
                  value={cardData.p03.answer1[index]}
                  width='70px'
                  onChange={e => handleChange(1, index, e.target.value)}
                  readOnly={cardData.p03.isSubmitted}
                  status={handleInputStatus(1, index)}
                  ariaLabel='시를 입력해주세요.'
                />
                <Typography>시</Typography>
                <Input
                  type='number'
                  value={cardData.p03.answer2[index]}
                  width='70px'
                  onChange={e => handleChange(2, index, e.target.value)}
                  readOnly={cardData.p03.isSubmitted}
                  status={handleInputStatus(2, index)}
                  ariaLabel='분을 입력해주세요.'
                />
                <Typography>분</Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='-30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' marginBottom='22px'>
            <Typography>3, 35, 11, 27, 8, 5</Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='10px'>
            <Typography>시곗바늘이 가리키는 곳과 숫자를 확인하여 시각을 읽습니다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
      <Dialog
        isShow={isShowDialog}
        useHeader
        width={1000}
        height={572}
        onClose={() => {
          setIsShowDialog(false);
        }}
      >
        C-EM31-05-0001-1101
      </Dialog>
    </Container>
  );
};

export default P03;
