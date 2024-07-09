import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
  Image,
  OverlayTooltip,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A04_0005_04 } from './store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { isNotEmptyString, isAnswer, removeSpaces } from '@maidt-cntn/util/CommonUtil';
import styled from '@emotion/styled';

const P02 = () => {
  const [isShow, setShow] = useState(false);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(A04_0005_04);
  const explanation1 = '- 17을 20으로 생각하여 어림할 수 있습니다.';
  const explanation2 = '- 17을 20으로 생각하면 20×4=80이므로 80쯤 될 것 같습니다';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '줄을 선 사람 수 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄴ'} type='paint' color='var(--color-white)' background='var(--color-grey-600)' />
        줄을 선 사람 수는 얼마쯤일지 어림해 보세요.
      </>
    ),
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
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P02: {
            ...prev.P02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.P02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const isCorrectAnswer = (answer: string, solution: string[]) => {
    return solution.some(element => isAnswer(removeSpaces(answer), removeSpaces(element)));
  };

  const handleSubmit = () => {
    if (cardData.P02.isSubmitted) {
      setShow(show => !show);
    } else {
      const isCorrect = isCorrectAnswer(cardData.P02.answer, cardData.P02.solution);
      setCardData(prev => ({ ...prev, P02: { ...prev.P02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.P02.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, P02: { ...prev.P02, answer: value } }));
    changeData('P02', 1, 1, value);
  };

  useEffect(() => {
    return () => {
      saveData('P02');
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
      background='var(--color-white)'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.P02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={handleSubmit}
      submitDisabled={!cardData.P02.answer.trim()}
      submitBtnColor={cardData.P02.answer.trim() ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      vAlign='flex-start'
      useRound
      useExtend
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' padding={'20px 44px'} useRound>
          <Input
            value={cardData.P02.answer}
            onChange={e => handleChange(e.target.value)}
            maxLength={50}
            readOnly={cardData.P02.isSubmitted}
            status={!isNotEmptyString(cardData.P02.answer) ? InputStatus.DEFAULT : InputStatus.ENABLE}
            width='300px'
            ariaLabel='식 입력란'
          />
        </Box>
      </Box>

      <Box position='absolute' top='0px' left='750px'>
        <OverlayTooltip type='cloud' place='top'>
          17을 20으로
          <br />
          생각해 볼까요?
        </OverlayTooltip>
        <Image src={'/A04/0005/04/A-EM31-040005-0402.png'} alt='일의 자리 수 2와 4를 곱해요.' width='110px' height='auto' />
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>
          <Box marginTop='12px'>{explanation1}</Box>
          <Box marginTop='12px'>{explanation2}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;

export const BackgroundImage = styled.div`
  position: absolute;
  right: -16px;
  bottom: 0px;
`;
