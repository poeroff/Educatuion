import { Container } from '@maidt-cntn/ui/math';
import {
  IQuestionProps,
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  Image,
  Input,
  InputStatus,
  Label,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { B01000330_Atom } from './store';

const P01 = () => {
  const CURRENT_PAGE = 'P01';
  const headerInfo = null;
  const { initData, submitDataWithResult, saveData, changeData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(B01000330_Atom);
  const [isShowBottom, setIsShowBottom] = useState<boolean>(false);
  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
    text: (
      <>
        <Label value='1' type='icon' />
        이준이가 설명하는 수보다 119 만큼 더 큰 수를 구해보세요.
      </>
    ),
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(CURRENT_PAGE);
    };
  }, []);

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
    const pageId = pageIds.find(page => page.page === CURRENT_PAGE)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0].value || cardData.p01.answer,
            isSubmitted,
            isCorrect: userSubmissionList[0].inputData[0].value ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(CURRENT_PAGE, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (!cardData.p01.isSubmitted) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
      submitAnswer();
    } else {
      setIsShowBottom(prev => !prev);
    }
  };

  const submitAnswer = () => {
    const correct = cardData.p01.answer === cardData.p01.solution;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: correct } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer,
            isAnswer: cardData.p01.answer === cardData.p01.solution,
            isCorrect: correct,
          },
        ],
        isCorrect: correct,
      },
    ];
    submitDataWithResult(CURRENT_PAGE, userSubmission, correct);
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: value } }));
    changeData('P01', 1, 1, value);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      bodyId='targetContainer'
      background={'var(--color-white)'}
      submitBtnColor={
        isNotEmptyString(cardData.p01.answer) ? (isShowBottom ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY
      }
      submitDisabled={!isNotEmptyString(cardData.p01.answer)}
      submitLabel={cardData.p01.isSubmitted ? (isShowBottom ? '답안닫기' : '답안보기') : '채점하기'}
      onSubmit={handleSubmit}
    >
      <Box>
        <BoxWrap flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
          <Box marginBottom={'24px'}>
            <Image
              src={'/C01/0003/10/EA31103.png'}
              alt={'학생이 앉아서 퍼즐들을 가리키며 100이 6개, 10이 3개,1이 7개인 수예요. 라고 설명하고 있다.'}
              tabIndex={102}
              width='650px'
            />
          </Box>
          <Input
            readOnly={cardData.p01.isSubmitted}
            minWidth='400px'
            value={cardData.p01.answer}
            status={cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? InputStatus.ENABLE : InputStatus.ERROR) : InputStatus.ENABLE}
            onChange={event => handleChange(event.target.value)}
            maxLength={100}
            ariaLabel='답란'
            tabIndex={103}
          />
        </BoxWrap>
      </Box>
      <BottomSheet
        bottomSheetTargetId={'targetContainer'}
        height='50%'
        show={isShowBottom}
        closeOption={{
          useYn: true,
          onClose: () => {
            setIsShowBottom(false);
          },
        }}
      >
        <Box tabIndex={199} background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>756</Typography>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='22px'>
            <Typography>100이 6개, 10이 3개, 1이 7개인 수는 637입니다.</Typography>
            <br />
            <Typography>637 + 119 + 756</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
