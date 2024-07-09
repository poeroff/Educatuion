import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Image,
  Label,
  List,
  Radio,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C02A05 } from './store';

const page = 'P01';
const pageKey = 'p01';

const imgSrc = '/L04/C02/A05/ME1-L04-C02-A05-P01.jpg';
const imgAlt = (
  <>
    <p>마을 지도가 그려져 있다. 왼쪽에 3개, 오른쪽에 3개의 블록이 있다.</p>
    <p>
      왼쪽 상단: "공원"과 빨간색 지붕의 건물 "a"가 있다. 오른쪽 상단: 주황색 "학교" 건물이 있다. 왼쪽 중앙: 회색의 "도서관" 건물과 보라색 지붕의 피자
      가게가 있다. 오른쪽 중앙: 빨간색 대문이 있는 가게 밖에 꽃이 있는 ＂꽃집＂이 있다. 왼쪽 하단: 주황색 간판의 ＂주스 가게”와, 그 옆에 회색 건물
      "b"가 있다. 오른쪽 하단: 파란색 지붕과 빨간 문이 있는 노란색 건물 "c."가 있다. 왼쪽 하단과 오른쪽 하단과 사이 중앙에 화살표가 있다.
    </p>
  </>
);

const data = [
  {
    text: 'a.',
  },
  {
    text: 'b.',
  },
  {
    text: 'c.',
  },
];

const P01 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C02A05);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { answer, solution, isSubmitted, isCorrect } = cardData[pageKey];
  const [isShowAnswer, setShowAnswer] = useState(false);
  const isDisabled = answer === undefined;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Check',
    headerPattern: 'icon',
    iconType: 'listeningStrategy',
  };

  const questionInfo: IQuestionProps = {
    text: 'Where is the bakery?',
    mark: getMarking(isSubmitted, isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C02/A05/ME1-L04-C02-A05-P01.mp3',
    captionSrc: '/L04/C02/A05/ME1-L04-C02-A05-P01.srt',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(p => p.page === page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      setShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = answer === solution;
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(page, userSubmission, isCorrect);
    }
  };

  const handleRadioClick = (value: number) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: value } }));
    changeData(page, 1, 1, value);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(page);
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={isDisabled ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      submitDisabled={isDisabled}
      onSubmit={handleSubmit}
    >
      <BoxWrap useFull>
        <Box width='500px' hAlign={'center'} useFull display='flex' flexDirection='column'>
          <Image src={imgSrc} width='500px' />
          <Box type='hidden' id='img_desc'>
            {imgAlt}
          </Box>
        </Box>
        <Box hAlign={'center'} useFull>
          <List
            gap={24}
            data={data}
            row={({ value, index = 1 }) => (
              <Radio
                ariaLabel={index + '번 보기'}
                type='box'
                align='vertical'
                name={'radio-question'}
                label={value?.text}
                value={index === answer}
                readOnly={isSubmitted}
                isError={isSubmitted && !isCorrect}
                onClick={() => handleRadioClick(index)}
              >
                <Box padding={'6px 0'} whiteSpace='nowrap'>
                  <Label value={index} />
                  <Typography>{value?.text}</Typography>
                </Box>
              </Radio>
            )}
          />
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box marginTop='12px'>
            <Typography usePre>{solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
