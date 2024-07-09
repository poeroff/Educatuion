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
  ESvgType,
  SvgIcon,
  PinchZoom,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState, useEffect, ChangeEventHandler } from 'react';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import styled from '@emotion/styled';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L02C08A05a } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';

interface IHE2L02C08A05Props {
  question: string;
  answer: string;
  givenWord: string;
  questionText: string[];
  pageKey: 'p01' | 'p02' | 'p03' | 'p04' | 'p05';
  pageNumber: 'P01' | 'P02' | 'P03' | 'P04' | 'P05';
}

const HE2L02C08A05a = ({ question, answer, givenWord, questionText, pageKey, pageNumber }: IHE2L02C08A05Props) => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C08A05a);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

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
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 2 : Practice',
  };

  const questionInfo: IQuestionProps = {
    text: 'Complete the sentences using structures above. If necessary, change the forms of the given words.',
  };

  const handleOnSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageKey].answer,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData(pageNumber, userSubmission);
    }
  };

  const handleInputOnChange: ChangeEventHandler<HTMLInputElement> = event => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: event.target.value } }));
    changeData(pageNumber, 1, 1, event.target.value);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={handleOnSubmit}
      submitDisabled={!isNotEmptyString(cardData[pageKey].answer)}
      submitBtnColor={
        isNotEmptyString(cardData[pageKey].answer) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
    >
      <Box>
        <Box width='920px' marginTop={'30px'}>
          <TextView title='보기' height='120px'>
            <PinchZoom>
              <Image src={'/L02/C08/A05/HE2-L02-C08-A05-P01.jpg'} width='900px' alt='' ariaDescribedby='img_desc' />
              <Box type='hidden' id='img_desc'>
                <p>이미지에는 문장이 퍼즐 조각처럼 나뉘어져 있다:</p>
                <p>첫 번째 조각: "Critics suggest"는 "suggest"가 빨간색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.</p>
                <p>두 번째 조각: "that"는 검은색으로 표시되어 있다.</p>
                <p>
                  세 번째 조각: "a marketing strategy create value for both companies and customers."는 "create"가 파란색으로 강조되어 있으며 나머지는
                  검은색으로 표시되어 있다.
                </p>
                <p>위쪽에는 "(should)"라는 단어가 회색으로 추가되어 있다.</p>
              </Box>
            </PinchZoom>
          </TextView>
        </Box>
      </Box>
      <BoxWrap display='flex' flexDirection='column' justifyContent='center' marginTop='30px'>
        <Box width='960px'>{question}</Box>
        <Box width='960px' marginTop={10}>
          <StyledIcon src={RightArrowIcon} type={ESvgType.IMG} />
          <Typography useGap={false}>{questionText[0]}</Typography>
          <Input
            width='480px'
            value={cardData[pageKey].answer}
            onChange={handleInputOnChange}
            inputSize='x-small'
            maxLength={answer.length + 10}
            readOnly={cardData[pageKey].isSubmitted}
            ariaLabel={'답란'}
            placeholder='내용을 넣어 주세요.'
            marginLeft={10}
          />
          <Typography>{questionText[1]}</Typography>
        </Box>
        <Box marginTop='20px' backgroundColor='var(--color-blue-50)' width='920px' height='48px' vAlign='start' useRound>
          <Typography color='var(--color-blue-800)'>제시어 : {givenWord}</Typography>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='12px'>{answer}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE2L02C08A05a;

const StyledIcon = styled(SvgIcon)`
  vertical-align: middle;
  padding-right: 12px;
`;
