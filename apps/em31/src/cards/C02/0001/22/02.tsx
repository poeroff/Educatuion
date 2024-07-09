import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  Image,
  Input,
  InputStatus,
  IQuestionProps,
  Label,
  SvgIcon,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import headerIcon from '@/assets/icon/m_default_01.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { C02000122_store } from '@/cards/C02/0001/22/store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(C02000122_store);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const [isShow, setIsShow] = useState<boolean>(false);

  const pageKey = 'p02';
  const pageNo = 'P02';

  const headerInfo: TMainHeaderInfoTypes = {};

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <SvgIcon src={headerIcon} size={'36px'} />
        <Typography>삼각형입니다. 꼭짓점은 몇 개인가요?</Typography>
      </Box>
    ),
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const unit = '개';

  const explanation = '삼각형은 변이 3개, 꼭짓점이 3개인 도형입니다.';

  const info = {
    altText: '삼각형이 그려진 그림입니다.',
    imageSrc: '/C02/0001/22/DEC312I05.png',
    imageWidth: '234px',
    imageHeight: '176px',
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
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const onSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setIsShow(!isShow);
      return;
    }
    const isCorrect = isAnswer(cardData[pageKey].answer, cardData[pageKey].solution);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageKey].answer,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNo, userSubmission, isCorrect);
  };

  const handleInputChange = (value: string) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: value } }));
    changeData(pageNo, 1, 1, value);
  };

  useEffect(() => {
    return () => {
      saveData(pageNo);
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
      vAlign='flex-start'
      background={'var(--color-white)'}
      onSubmit={onSubmit}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData[pageKey].answer === ''}
      submitBtnColor={
        cardData[pageKey].isSubmitted || cardData[pageKey].answer !== ''
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.SECONDARY
      }
      useRound
    >
      <Box useRound tabIndex={101}>
        <Box vAlign='center' flexDirection='column' marginTop={'50px'}>
          <Image src={info.imageSrc} width={info?.imageWidth || '100%'} height={info?.imageHeight || '100%'} alt={info.altText} />
        </Box>
        <Box hAlign='center' marginTop='20px' flexDirection='column' marginBottom='20px'>
          <Box vAlign='center' marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              type={'number'}
              ariaLabel='답란'
              marginLeft={8}
              maxLength={3}
              width='100px'
              value={cardData[pageKey].answer}
              onChange={e => handleInputChange(e.target.value)}
              status={
                !isNotEmptyString(cardData[pageKey].answer)
                  ? InputStatus.DEFAULT
                  : cardData[pageKey].isSubmitted && !isAnswer(cardData[pageKey].answer, cardData[pageKey].solution)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={cardData[pageKey].isSubmitted}
            />
            <Typography>{unit}</Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow} marginTop={40}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{cardData[pageKey].solution}</Typography>
          </Box>
          <Box marginTop={'40px'}>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{explanation}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};
export default P02;
