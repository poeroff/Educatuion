import { IImageList } from '@maidt-cntn/pages/HE-027-01';
import {
  BottomSheet,
  Box,
  EImageType,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  Image,
  IQuestionProps,
  Radio,
  Tag,
  TMainHeaderInfoTypes,
} from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { L03C02A03 } from './store';
import { useEffect, useState } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C02A03);
  const { userId } = useRecoilValue(studentAtom);
  const pageNumber = 'P01';
  const pageKey = 'p01';

  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meListenAndCheck',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C02/A03/ME1-L03-C02-A03-P01.mp3',
    captionSrc: '/L03/C02/A03/ME1-L03-C02-A03-P01.srt',
  };

  const imageList: IImageList[] = [
    {
      src: '/L03/C02/A03/ME1-L03-C02-A03-P01-01.jpg',
      alt: '엘리베이터 안에서 이야기를 나누고 있는 할머니와 남학생',
      answer: false,
    },
    {
      src: '/L03/C02/A03/ME1-L03-C02-A03-P01-02.png',
      alt: '음료 자판기 앞에서 이야기를 나누고 있는 할머니와 남학생',
      answer: true,
    },
    {
      src: '/L03/C02/A03/ME1-L03-C02-A03-P01-03.jpg',
      alt: '지하철역사 개찰구 앞에서 이야기를 나누고 있는 할머니와 남학생',
      answer: false,
    },
  ];

  const questionText = 'Where are the speakers?';

  const questionInfo: IQuestionProps = {
    text: questionText,
    mark: getMarking(cardData[pageKey].isSubmitted, cardData[pageKey].isCorrect),
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

  const onSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData[pageKey].answer === cardData[pageKey].solution;
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
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
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
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const onChange = (index: number) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: index } }));
    changeData(pageNumber, 1, 1, index);
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
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={
        cardData[pageKey].isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : cardData[pageKey].answer === 0
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={!cardData[pageKey].isSubmitted && cardData[pageKey].answer === 0}
      onSubmit={onSubmit}
      audioInfo={audioInfo}
    >
      <Box vAlign='center' useFull>
        {imageList.map((item, index) => (
          <Radio
            key={index + 1}
            type={'circle-top-left'}
            name={'radio-question-A'}
            value={index + 1 === cardData[pageKey].answer}
            defaultValue={index + 1 === cardData[pageKey].answer}
            onClick={() => onChange(index + 1)}
            align='vertical'
            readOnly={cardData[pageKey].isSubmitted}
            isError={cardData[pageKey].isSubmitted && cardData[pageKey].answer !== cardData[pageKey].solution}
          >
            <Box marginTop='8px'>
              <Image size='100%' src={item.src} alt={item.alt} type={EImageType.IMG} />
            </Box>
          </Radio>
        ))}
      </Box>
      <BottomSheet bottomSheetTargetId='container' height='40%' show={isShow}>
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

export default P01;
