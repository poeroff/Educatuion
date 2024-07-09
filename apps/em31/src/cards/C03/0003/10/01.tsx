import { useState, useEffect } from 'react';
import {
  Image,
  Box,
  Label,
  Typography,
  Input,
  IQuestionProps,
  EStyleButtonTypes,
  InputStatus,
  BottomSheet,
  ETagLine,
  Tag,
  TMainHeaderInfoTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C03_0003_10 } from './store';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

interface pageType {
  _page?: string;
}

const P01 = ({ _page = 'P01' }: pageType) => {
  const [isShow, setShow] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(C03_0003_10);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='1' type='icon' />
        지우개 14개를 7개씩 묶으면 몇 묶음이 되는지 구해 보세요.
      </>
    ),
    size: 'medium',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isCorrect: false,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isCorrect: false,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isCorrect: false,
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
          isCorrect: false,
        },
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
          isCorrect: false,
        },
        {
          subKey: 6,
          type: 'TEXT',
          value: '',
          isCorrect: false,
        },
        {
          subKey: 7,
          type: 'TEXT',
          value: '',
          isCorrect: false,
        },
      ],
    },
  ];

  const onGrade = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p01.answer1 === cardData.p01.solution1;
      const isCorrect2 = cardData.p01.answer2 === cardData.p01.solution2;
      const isCorrect3 = cardData.p01.answer3 === cardData.p01.solution3;
      const isCorrect4 = cardData.p01.answer4 === cardData.p01.solution4;
      const isCorrect5 = cardData.p01.answer5 === cardData.p01.solution5;
      const isCorrect6 = cardData.p01.answer6 === cardData.p01.solution6;
      const isCorrect7 = cardData.p01.answer7 === cardData.p01.solution7;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4 && isCorrect5 && isCorrect6 && isCorrect7;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p01.answer3,
              isCorrect: isCorrect3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p01.answer4,
              isCorrect: isCorrect4,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p01.answer5,
              isCorrect: isCorrect4,
            },
            {
              subKey: 6,
              type: 'TEXT',
              value: cardData.p01.answer6,
              isCorrect: isCorrect4,
            },
            {
              subKey: 7,
              type: 'TEXT',
              value: cardData.p01.answer7,
              isCorrect: isCorrect4,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(_page, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p01.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p01.answer4,
            answer5: userSubmissionList[0].inputData[4]?.value || cardData.p01.answer5,
            answer6: userSubmissionList[0].inputData[5]?.value || cardData.p01.answer6,
            answer7: userSubmissionList[0].inputData[6]?.value || cardData.p01.answer7,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer4: value } }));
    } else if (subKey === 5) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer5: value } }));
    } else if (subKey === 6) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer6: value } }));
    } else if (subKey === 7) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer7: value } }));
    }
    changeData(_page, 1, subKey, value);
  };

  const isAllFilled = () => {
    if (
      cardData.p01.answer1 &&
      cardData.p01.answer2 &&
      cardData.p01.answer3 &&
      cardData.p01.answer4 &&
      cardData.p01.answer5 &&
      cardData.p01.answer6 &&
      cardData.p01.answer7
    ) {
      return true;
    } else return false;
  };

  const handleInputStatus = (userAnswer: string, correctAnswer: string): InputStatus => {
    return !isNotEmptyString(userAnswer)
      ? InputStatus.DEFAULT
      : cardData.p01.isSubmitted && !isAnswer(userAnswer, correctAnswer)
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  useEffect(() => {
    return () => {
      saveData(_page);
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
      useRound
      vAlign='start'
      onSubmit={onGrade}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!isAllFilled()}
      submitBtnColor={!isAllFilled() ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
    >
      <Box display='flex' alignItems='center' flexDirection='column' height={'100%'}>
        <Box padding='32px 20px' useRound>
          <Image src={'/C03/0003/10/EC31308.png'} alt='지우개 14개가 그려진 그림입니다.' width='638px' height='65px' />
        </Box>
        <Box marginTop='24px'>
          <Box vAlign='center'>
            <Label
              value='뺄셈식을 이용하기'
              color='var(--color-yellow-800)'
              background='var(--color-yellow-100)'
              lineColor='var(--color-yellow-700)'
              cssStyle={{ padding: '4px 18px', marginRight: '8px' }}
            />
            <Typography useGap={false}>14</Typography>
            <Typography useGap={false}>-</Typography>
            <Input
              type='number'
              width='70px'
              marginLeft={8}
              value={cardData.p01.answer1}
              onChange={e => handleChange(1, e.target.value)}
              readOnly={cardData.p01.isSubmitted}
              status={handleInputStatus(cardData.p01.answer1, cardData.p01.solution1)}
              ariaLabel='1번째 빈칸의 값'
            />
            <Typography useGap={false}>-</Typography>
            <Input
              type='number'
              width='70px'
              marginLeft={8}
              value={cardData.p01.answer2}
              onChange={e => handleChange(2, e.target.value)}
              readOnly={cardData.p01.isSubmitted}
              status={handleInputStatus(cardData.p01.answer2, cardData.p01.solution2)}
              ariaLabel='2번째 빈칸의 값'
            />
            <Typography useGap={false}>=</Typography>
            <Input
              type='number'
              width='70px'
              marginLeft={8}
              value={cardData.p01.answer3}
              onChange={e => handleChange(3, e.target.value)}
              readOnly={cardData.p01.isSubmitted}
              status={handleInputStatus(cardData.p01.answer3, cardData.p01.solution3)}
              ariaLabel='3번째 빈칸의 값'
            />
            <Typography useGap={false}>이므로</Typography>
            <Input
              type='number'
              width='70px'
              marginLeft={8}
              value={cardData.p01.answer4}
              onChange={e => handleChange(4, e.target.value)}
              readOnly={cardData.p01.isSubmitted}
              status={handleInputStatus(cardData.p01.answer4, cardData.p01.solution4)}
              ariaLabel='4번째 빈칸의 값'
            />
            <Typography useGap={false}>묶음이 됩니다.</Typography>
          </Box>
          <Box vAlign='center' marginTop='8px'>
            <Label
              value='나눗셈식을 이용하기'
              color='var(--color-yellow-800)'
              background='var(--color-yellow-100)'
              lineColor='var(--color-yellow-700)'
              cssStyle={{ padding: '4px 18px', marginRight: '8px' }}
            />
            <Typography>14</Typography>
            <Typography useGap={false}>÷</Typography>
            <Input
              type='number'
              width='70px'
              marginLeft={8}
              value={cardData.p01.answer5}
              onChange={e => handleChange(5, e.target.value)}
              readOnly={cardData.p01.isSubmitted}
              status={handleInputStatus(cardData.p01.answer5, cardData.p01.solution5)}
              ariaLabel='5번째 빈칸의 값'
            />
            <Typography useGap={false}>=</Typography>
            <Input
              type='number'
              width='70px'
              marginLeft={8}
              value={cardData.p01.answer6}
              onChange={e => handleChange(6, e.target.value)}
              readOnly={cardData.p01.isSubmitted}
              status={handleInputStatus(cardData.p01.answer6, cardData.p01.solution6)}
              ariaLabel='6번째 빈칸의 값'
            />
            <Typography useGap={false}>이므로</Typography>
            <Input
              type='number'
              width='70px'
              marginLeft={8}
              value={cardData.p01.answer7}
              onChange={e => handleChange(7, e.target.value)}
              readOnly={cardData.p01.isSubmitted}
              status={handleInputStatus(cardData.p01.answer7, cardData.p01.solution7)}
              ariaLabel='7번째 빈칸의 값'
            />
            <Typography useGap={false}>묶음이 됩니다.</Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='-30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' marginBottom='22px'>
            <Typography>
              {cardData.p01.solution1}, {cardData.p01.solution2}, {cardData.p01.solution3}, {cardData.p01.solution4} / {cardData.p01.solution5},{' '}
              {cardData.p01.solution6}, {cardData.p01.solution7}
            </Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='10px'>
            <Typography>
              <p>뺄셈식과 나눗셈식을 이용하여 구하면 지우개는 2묶음이 됩니다. </p>
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
