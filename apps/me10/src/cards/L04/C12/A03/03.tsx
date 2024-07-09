import {
  Image,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  ETagLine,
  BottomSheet,
  List,
  EStyleFontSizes,
  Tag,
  Label,
  Radio,
  IAudioPlayerProps,
  Typography,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState, useEffect } from 'react';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';

import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C12A03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';

const P03 = () => {
  const PAGE_KEY = 'p03';
  const PAGE_NUM = 'P03';
  const SOLUTION = '3';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C12A03);
  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listening',
  };

  const questionInfo = {
    text: '7. 잘 듣고, 물음에 답해 봅시다.',
    mark: getMarking(cardData[PAGE_KEY].isSubmitted, cardData[PAGE_KEY].isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C12/A03/ME1-L04-C12-A03-P03.mp3',
    captionSrc: '/L04/C12/A03/ME1-L04-C12-A03-P03.srt',
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
    const pageId = pageIds.find(page => page.page === PAGE_NUM)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [PAGE_KEY]: {
            ...prev[PAGE_KEY],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[PAGE_KEY].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUM, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(PAGE_NUM);
    };
  }, []);

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, [PAGE_KEY]: { ...prev[PAGE_KEY], answer: index.toString() } }));
    changeData(PAGE_NUM, 1, 1, index.toString());
  };

  const handleSubmit = () => {
    if (cardData[PAGE_KEY].isSubmitted) {
      setShow(prev => !prev);
      return;
    }

    const isCorrect = isAnswer(cardData[PAGE_KEY].answer, SOLUTION);

    setCardData(prev => ({ ...prev, [PAGE_KEY]: { ...prev[PAGE_KEY], isSubmitted: true, isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[PAGE_KEY].answer,
            isAnswer: true,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(PAGE_NUM, userSubmission, isCorrect);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitBtnColor={
        cardData[PAGE_KEY].isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : cardData[PAGE_KEY].answer === ''
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={handleSubmit}
      submitDisabled={cardData[PAGE_KEY].answer === ''}
      submitLabel={cardData[PAGE_KEY].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
    >
      <BoxWrap useFull>
        <Box width='580px' hAlign={'center'} useFull>
          <Image src={'/L04/C12/A03/ME1-L04-C12-A03-P03.jpg'} width='580px' />
          <Box type='hidden'>
            큰 교차로가 있고 직진을 나타내는 큰 화살표가 교차로 입구에 있음, 교차로 입구 왼쪽 건물에 1번 표시, 좀 더 직진하면 왼쪽에 있는 건물이 2번
            표시, 거기서 더 직진을 하면 B Street가 나오며 B street 왼쪽 상단에는 호수가 있고 오른쪽 상단에는 건물이 하나 있고 3번 표시
          </Box>
        </Box>
        <Box hAlign={'center'} useFull flexDirection='column'>
          <Box>
            <Typography>Where is the museum?</Typography>
          </Box>
          <Box marginTop={30} padding='0 20px' width='100%' justifyContent='space-between'>
            <List gap={30} data={['', '', '']} align='horizontal'>
              {({ value, index = 1 }) => (
                <Radio
                  readOnly={cardData[PAGE_KEY].isSubmitted}
                  isError={cardData[PAGE_KEY].isSubmitted && cardData[PAGE_KEY].answer !== SOLUTION}
                  onClick={() => handleChange(index)}
                  type={'square'}
                  name={'radio-question-A'}
                  value={Number(cardData[PAGE_KEY].answer) === index}
                  defaultValue={Number(cardData[PAGE_KEY].answer) === index}
                >
                  <Box whiteSpace='nowrap' height={44}>
                    <Label value={index} marginRight={3} />
                  </Box>
                </Radio>
              )}
            </List>
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box marginTop='10px'>
            <Typography useGap={false} size={EStyleFontSizes.MEDIUM} usePre>
              3
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
