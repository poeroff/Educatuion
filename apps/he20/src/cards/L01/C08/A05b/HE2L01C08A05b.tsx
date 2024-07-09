import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  Input,
  Typography,
  IQuestionProps,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  BoxWrap,
  SvgIcon,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import arrowRight from '@/assets/icon/arrow_right.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L01C08A05b } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

export interface IHE2L01C08A05b {
  subQuestion: string;
  text1: string;
  text2: string;
  pageKey: string;
}

const HE2L01C08A05b = ({ subQuestion, text1, text2, pageKey }: IHE2L01C08A05b) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C08A05b);
  const [isShow, setShow] = useState(false);
  const pageNum = pageKey.toUpperCase();

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 2 : Practice',
  };

  const questionInfo: IQuestionProps = {
    text: <Typography>Fill in the blanks with the most appropriate forms of the given words.</Typography>,
    mark: getMarking(cardData[pageKey].isSubmitted, cardData[pageKey].isCorrect),
  };

  const { userId } = useRecoilValue(studentAtom);
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

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
      return;
    }
    const isCorrect = isAnswer(cardData[pageKey].answer, cardData[pageKey].solution);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageKey].answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNum, userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNum)?.pageId;
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
      initData(pageNum, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputOnChange: ChangeEventHandler<HTMLInputElement> = event => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: event.target.value } }));
    changeData(pageNum, 1, 1, event.target.value);
  };

  useEffect(() => {
    return () => {
      saveData(pageNum);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const inputNode = (
    <Input
      width='220px'
      value={cardData[pageKey].answer}
      placeholder='내용을 넣어 주세요.'
      onChange={handleInputOnChange}
      inputSize='x-small'
      maxLength={cardData[pageKey].solution.length + 5}
      readOnly={cardData[pageKey].isSubmitted}
      status={!cardData[pageKey].answer ? 'default' : cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect ? 'error' : 'enable'}
      ariaLabel='답란'
    />
  );

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData[pageKey].isSubmitted && !isNotEmptyString(cardData[pageKey].answer)}
      submitBtnColor={
        isNotEmptyString(cardData[pageKey].answer) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
      onSubmit={handleSubmit}
    >
      <Box>
        <Box width='920px'>
          <TextView title='보기' hAlign='start'>
            <Box>
              <Typography align='start'>
                <Typography useGap={false} color='var(--color-blue-600)'>{`Celine 은 상사로부터 전화를 받기 직전에 프로젝트를 마쳤다.`}</Typography>
                <Box vAlign={'center'}>
                  <SvgIcon src={arrowRight} size='38px' />
                  <Typography useGap={false}>{`Celine`}</Typography>
                  <Typography textDecoration={'underline'} weight={'var(--font-weight-bold)'}>{`had finished`}</Typography>
                  <Typography useGap={false}>{`the project just before she received a call`}</Typography>
                </Box>
                <Typography useGap={false}>{`from her boss.`}</Typography>{' '}
                <Typography useGap={false} weight={'var(--font-weight-bold)'}>{`(finish)`}</Typography>
              </Typography>
            </Box>
          </TextView>
        </Box>
      </Box>

      <BoxWrap display='flex' flexDirection='column' justifyContent='center' marginTop='20px'>
        <Box display='flex'>
          <Typography>
            <Typography useGap={false} weight={'var(--font-weight-bold)'}>
              {subQuestion}
            </Typography>
            <Box paddingTop={'20px'}>
              <Box vAlign='center'>
                <SvgIcon src={arrowRight} size='38px' />
                <Typography useGap={false}>{text1}</Typography>
                <Box paddingLeft={'10px'}>{text1.length < 49 && inputNode}</Box>
              </Box>
              {text1.length >= 49 && inputNode} <Typography useGap={false}>{text2}</Typography>
            </Box>
          </Typography>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData[pageKey].solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE2L01C08A05b;
