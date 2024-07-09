import { useEffect, useState } from 'react';
import {
  Image,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Textarea,
  PinchZoom,
  Typography,
  BottomSheet,
  EStyleFontSizes,
  EStyleButtonTypes,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L02C05A03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P03 = () => {
  const answer = '재, 잿더미';
  const [isShow, setShow] = useState(false);

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C05A03);
  const { userId } = useRecoilValue(studentAtom);
  const PAGE_ID = 'P03';
  const PAGE_KEY = 'p03';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Word Preview',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Look at the pictures and guess the meanings of the underlined words.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: 0,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (!cardData[PAGE_KEY].isSubmitted) {
      setCardData(prev => ({ ...prev, [PAGE_KEY]: { ...prev[PAGE_KEY], isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[PAGE_KEY].answer,
            },
          ],
        },
      ];
      submitData(PAGE_ID, userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_ID)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [PAGE_KEY]: {
            ...prev[PAGE_KEY],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[PAGE_KEY].answer,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_ID, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_ID);
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
      submitLabel={cardData[PAGE_KEY].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={() => {
        if (cardData[PAGE_KEY].isSubmitted) {
          setShow(!isShow);
        } else {
          submitAnswer();
        }
      }}
      submitDisabled={!isNotEmptyString(cardData[PAGE_KEY].answer)}
      submitBtnColor={
        isNotEmptyString(cardData[PAGE_KEY].answer) ? (isShow ? EStyleButtonTypes.DEFAULT : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
    >
      <BoxWrap height={'340px'} paddingLeft={'16px'} paddingRight={'16px'}>
        <Box useFull width='40%' vAlign='center' hAlign='center'>
          <PinchZoom>
            <Image
              src={'/L02/C05/A03/HE1-L02-C05-A03-03.jpg'}
              width='100%'
              height='100%'
              alt='커다란 잿더미 위에서 소방관이 세찬 물이 나오는 호스를 들고 잔불을 끄고 있다.'
            />
          </PinchZoom>
        </Box>
        <Box useFull width='60%'>
          <Typography useGap={false}>
            After a week of fires, everything in the area had turned into &nbsp;
            <Typography textDecoration={'underline'} useGap={false}>
              ash
            </Typography>
            .
          </Typography>

          <Box marginTop='10px'>
            <Textarea
              height='240px'
              value={cardData[PAGE_KEY].answer}
              onChange={event => {
                const truncateValue = truncateToMaxBytes(event.target.value);
                setCardData(prev => ({
                  ...prev,
                  [PAGE_KEY]: {
                    ...prev[PAGE_KEY],
                    answer: truncateValue,
                  },
                }));
                changeData(PAGE_ID, 1, 1, truncateValue);
              }}
              readOnly={cardData[PAGE_KEY].isSubmitted}
              placeholder='내용을 넣어 주세요.'
              ariaLabel='답란'
            />
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height={'40%'} show={isShow} closeOption={{ useYn: true, onClose: () => setShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Tag type={ETagLine.GREEN} label='모범답안' />
          <Box marginTop='12px'>
            <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
              {answer}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
