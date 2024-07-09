import { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  Typography,
  PinchZoom,
  List,
  EImageType,
  Image,
  BottomSheet,
  Tag,
  ETagLine,
  Input,
  InputStatus,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L03C09A03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const PAGE_NUMBER = 'P01';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C09A03);
  const { userId } = useRecoilValue(studentAtom);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Plan and Write',
  };

  const questionInfo = {
    text: 'Complete the project board with the given words.',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: cardData.p01.answer,
          isAnswer: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    const { answer, isSubmitted, solution } = cardData.p01;
    if (!isSubmitted) {
      const isCorrect = isAnswer(answer, solution);
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrect);
    } else {
      setIsAnswerShow(isAnswerShow => !isAnswerShow);
    }
  };

  const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: event.target.value } }));
    changeData(PAGE_NUMBER, 1, 1, event.target.value);
  };

  const getButtonColor = () => {
    const { isSubmitted, answer } = cardData.p01;

    if (!isSubmitted) {
      return answer ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p01.isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={(cardData.p01.isSubmitted || !cardData.p01.answer) && !cardData.p01.isSubmitted && !isAnswerShow}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmit}
    >
      <Box display='flex' gap={'8px'}>
        <Box hAlign='center'>
          <PinchZoom pinchType={'image'}>
            <Image type={EImageType.IMG} src={'/L03/C09/A03/HE1-L03-C09-A03-P01.jpg'} width='460px' height='242px' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              <p>이 이미지는 "Instant Tower of Ice" 실험을 설명하는 안내서입니다. 각 섹션에 빈칸을 채워야 하는 부분이 포함되어 있습니다.</p>

              <p>Purpose</p>
              <p>To see if water can be turned into 빈칸 instantly.</p>

              <p>Materials</p>
              <p>a bottle of water</p>
              <p>a freezer</p>
              <p>a glass</p>
              <p>an ice cube</p>

              <p>Procedure</p>
              <p>Put a water bottle in the 빈칸 for about two hours, but take it out before it is completely frozen.</p>
              <p>Turn a glass 빈칸 and place an ice cube on top.</p>
              <p>Slowly 빈칸 the water over the ice cube.</p>

              <p>Caution</p>
              <p>Don’t shake the bottle.</p>

              <p>Expected Results</p>
              <p>The ice tower will 빈칸 instantly.</p>

              <p>Reasoning</p>
              <p>When very 빈칸 water meets ice, the ice can speed up the freezing process.</p>

              <p>
                이미지에는 실험에 필요한 물병, 냉동고, 유리잔, 얼음 조각의 사진이 포함되어 있으며, 오른쪽에는 물을 얼음 위에 부어서 순간적으로 얼음
                탑을 만드는 과정을 보여주는 사진이 있습니다.
              </p>
            </Box>
          </PinchZoom>
        </Box>

        <Box width='100%' flexDirection='column' vAlign='center'>
          <Box backgroundColor='var(--color-pink-500)' width='fit-content' margin={'30px 0'}>
            <Typography weight={'var(--font-weight-bold)'} color='var(--color-white)'>
              Purpose
            </Typography>
          </Box>

          <Box>
            <Typography lineHeight='1.3em'>
              To see if water can be turned into 1)
              <Input
                value={cardData.p01.answer}
                onChange={handleAnswerChange}
                maxLength={100}
                ariaLabel='서술 답안 입력란 1'
                status={cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? InputStatus.DEFAULT : InputStatus.ERROR) : InputStatus.ENABLE}
                readOnly={cardData.p01.isSubmitted}
                width='180px'
              />{' '}
              instantly.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box marginTop='20px'>
        <TextView title='보기'>
          <List align='horizontal' data={cardData.examples} row={({ value }) => <Typography>{value}</Typography>} />
        </TextView>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false} usePre>
              1) {cardData.p01.solution}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
