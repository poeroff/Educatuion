import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  Input,
  Typography,
  Image,
  IQuestionProps,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  BoxWrap,
  SvgIcon,
  EStyleFontSizes,
  PinchZoom,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import arrow_right from '@/assets/icon/arrow_right.svg';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { L03C08A05a } from './store';
import { studentAtom } from '@/stores/student';

export interface IHE10L03C08A05a {
  pageKey: string;
}

const HE10L03C08A05a = ({ pageKey }: IHE10L03C08A05a) => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C08A05a);
  const [isAnswerOpen, setAnswerOpen] = useState<boolean>(false);

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

  const { userId } = useRecoilValue(studentAtom);
  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value,
            isSubmitted,
            isCorrect: userSubmissionList[0].isCorrect,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData[pageKey].isSubmitted) {
      setAnswerOpen(!isAnswerOpen);
      return;
    }

    const isCorrect = cardData[pageKey].answer === cardData[pageKey].solution;
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [{ subKey: 1, type: 'TEXT', value: cardData[pageKey].answer }],
        isCorrect,
      },
    ];
    submitData(pageKey, userSubmission);
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

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 2 : Practice',
  };

  const questionInfo: IQuestionProps = {
    text: 'Complete the sentences using the structure above and the given words.',
    size: 'medium',
  };

  const getButtonColor = () => {
    return isNotEmptyString(cardData[pageKey].answer)
      ? isAnswerOpen
        ? EStyleButtonTypes.GRAY
        : EStyleButtonTypes.PRIMARY
      : EStyleButtonTypes.SECONDARY;
  };

  const getSubmitLabel = () => (cardData[pageKey].isSubmitted ? (isAnswerOpen ? '답안 닫기' : '답안 보기') : '완료하기');

  const handleInputChangeEvent = (value: string) => {
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: value,
      },
    }));
    changeData(pageKey, 1, 1, value);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={getSubmitLabel()}
      onSubmit={() => submitAnswer()}
      submitDisabled={!cardData[pageKey].answer}
      submitBtnColor={getButtonColor()}
    >
      <Box>
        <Box width='920px' marginTop={'29px'}>
          <TextView title='보기' height='120px'>
            <PinchZoom pinchType={'image'}>
              <Image src={'/L03/C08/A05/HE2-L03-C08-A05-P01.jpg'} width='670px' alt='' ariaDescribedby='img_desc' />
              <Box type='hidden' id='img_desc'>
                <p> 이미지에는 두 개의 문장이 퍼즐 조각처럼 나뉘어져 있다:</p>
                <p> 첫 번째 문장:</p>
                <p> 첫 번째 조각: "She even studied abroad in Paris,"는 파란색으로 강조되어 있다.</p>
                <p>
                  두 번째 조각: "which was unusual for women at the time."는 "which"가 빨간색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.
                </p>
                <p> 두 번째 문장:</p>
                <p>
                  첫 번째 조각: "Lewis went to live with her aunt in Digby,"는 "Digby"가 파란색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.
                </p>
                <p> 두 번째 조각: "where she met her future husband."는 "where"가 빨간색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.</p>
              </Box>
            </PinchZoom>
          </TextView>
        </Box>
      </Box>

      <BoxWrap display='flex' flexDirection='column' justifyContent='center' marginTop='10px'>
        <Box width='920px'>
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            {cardData[pageKey].no}
          </Typography>
          &nbsp;{cardData[pageKey].text1}
        </Box>

        <Box hAlign='center' vAlign='flex-start'>
          <SvgIcon src={arrow_right} size='38px' style={{ marginTop: '8px' }} />
          <Box display='inline' useFull vAlign='center' hAlign='center' marginBottom={'5px'}>
            <Typography useGap={false}>{cardData[pageKey].text2}</Typography>
            &nbsp;
            <Input
              width='830px'
              value={cardData[pageKey].answer}
              onChange={e => handleInputChangeEvent(e.target.value)}
              placeholder='내용을 넣어 주세요.'
              inputSize='x-small'
              maxLength={cardData[pageKey]?.solution.length + 5}
              readOnly={cardData[pageKey].isSubmitted}
              ariaLabel='답란'
            />
            &nbsp;
            <Typography useGap={false}>{'.'}</Typography>
            &nbsp;
          </Box>
        </Box>
        <Box padding='4px 12px 10px' backgroundColor={'var(--color-blue-50)'}>
          <Typography color={'var(--color-blue-800)'} size={EStyleFontSizes['X-MEDIUM']}>
            제시어 : {cardData[pageKey].keyword}
          </Typography>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerOpen}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='12px'>{cardData[pageKey].solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE10L03C08A05a;
