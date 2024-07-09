import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import {
  IQuestionProps,
  EStyleButtonTypes,
  Box,
  Input,
  Typography,
  TMainHeaderInfoTypes,
  Image,
  InputStatus,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleFontSizes,
  SvgIcon,
} from '@maidt-cntn/ui';
import { useState, useEffect, ChangeEvent } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';
import { Container } from '@maidt-cntn/ui/math';
import { C03_0001_10 } from './store';
import headerIcon from '@/assets/icon/m_default_01.svg';

const P01 = () => {
  const PAGE_NUMBER = 'P01';
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const { changeData, saveData, initData, submitDataWithResult } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C03_0001_10);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathTween',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='48px' />
        옥수수 14개 중에서 6개를 먹었습니다. 남은 옥수수는 몇 개인가요?
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
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
        },
      ],
    },
  ];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: value } }));
    changeData(PAGE_NUMBER, 1, 1, value);
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsAnswerShow(prev => !prev);
    } else {
      const isCorrect = cardData.p01.answer ? isAnswer(cardData.p01.answer, cardData.p01.solution) : false;
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrect);
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isCorrect: isCorrect, isSubmitted: true } }));
    }
  };

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

  const getButtonColor = () => {
    const { answer, isSubmitted } = cardData.p01;

    if (!isSubmitted) {
      return answer !== '' ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY;
    } else {
      return isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW;
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={(cardData.p01.isSubmitted || cardData.p01.answer === '') && !cardData.p01.isSubmitted && !isAnswerShow}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmit}
      useRound
    >
      <Box useFull vAlign='center' flexDirection='column'>
        <Box type='line' padding='20px 40px' useRound>
          <Image src='/C03/0001/10/DEC313001.png' alt=' 옥수수 14개 중에서 6개에 사선이 그려진 그림입니다.' width='800px' height='137px' />
        </Box>
        <Box marginTop='24px'>
          <Typography>14-6=</Typography>
          <Input
            value={String(cardData.p01.answer || '')}
            status={
              cardData.p01.isSubmitted
                ? cardData.p01.isCorrect
                  ? InputStatus.ENABLE
                  : InputStatus.ERROR
                : cardData.p01.answer
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            title='답 입력란'
            type='number'
            readOnly={cardData.p01.isSubmitted}
            onChange={handleChange}
            width='130px'
          />
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow} marginTop={48}>
        <Box background='lightGray' borderRadius='12px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>8</Typography>
          </Box>

          <Box marginTop={'40px'}>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='22px'>
            <Typography size={EStyleFontSizes.MEDIUM}>남은 옥수수는 14-6=8(개)입니다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
