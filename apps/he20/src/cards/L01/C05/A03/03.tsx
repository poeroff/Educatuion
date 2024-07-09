import {
  Image,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Textarea,
  PinchZoom,
  Typography,
  BottomSheet,
  IQuestionProps,
  EStyleButtonTypes,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L01C05A03 } from './store';
import { isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C05A03);
  const { userId } = useRecoilValue(studentAtom);
  const pageNumber = 'P03';
  const pageKey = 'p03';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Word Preview',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Look at the pictures and guess the meanings of the underlined words.',
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

  const onSubmitText = () => {
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
            },
          ],
        },
      ];
      submitData(pageNumber, userSubmission);
    }
  };

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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const truncateValue = truncateToMaxBytes(e.target.value);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: truncateValue } }));
    changeData(pageNumber, 1, 1, truncateValue);
  };

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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='start'
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={
        !isNotEmptyString(cardData[pageKey].answer) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={!isNotEmptyString(cardData[pageKey].answer)}
      onSubmit={onSubmitText}
    >
      <BoxWrap height={'340px'} paddingLeft={'16px'} paddingRight={'16px'}>
        <Box useFull width='40%' vAlign='center' hAlign='center'>
          <PinchZoom>
            <Image src={'/L01/C05/A03/HE2-L01-C05-A03-03.jpg'} width='100%' height='100%' alt='누군가 책상 위의 컬러링북을 색칠하고 있다 ' />
          </PinchZoom>
        </Box>
        <Box useFull width='60%'>
          <Typography>
            Coloring books can{' '}
            <Typography useGap={false} textDecoration={'underline'}>
              stimulate
            </Typography>{' '}
            mindfulness and reduce stress.
          </Typography>
          <Box marginTop='10px'>
            <Textarea
              height='240px'
              value={cardData[pageKey].answer}
              ariaLabel='답란'
              onChange={handleInputChange}
              placeholder='내용을 넣어 주세요.'
              readOnly={cardData[pageKey].isSubmitted}
            />{' '}
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
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

export default P03;
