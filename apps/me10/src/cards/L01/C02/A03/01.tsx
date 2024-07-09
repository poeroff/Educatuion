import { IImageList } from '@maidt-cntn/pages/HE-027-01';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EImageType,
  EStyleButtonTypes,
  EStyleShadowedButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  Image,
  IQuestionProps,
  Label,
  Radio,
  Tag,
  TMainHeaderInfoTypes,
} from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { L01C02A03 } from './store';
import { useEffect, useState } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container, ShadowedButton } from '@maidt-cntn/ui/en';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C02A03);
  const { userId } = useRecoilValue(studentAtom);
  const pageNumber = 'P01';
  const pageKey = 'p01';

  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meListenAndCheck',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C02/A03/ME1-L01-C02-A03-P01.mp3',
    captionSrc: '/L01/C02/A03/ME1-L01-C02-A03-P01.srt',
  };

  const imageList: IImageList[] = [
    {
      src: '/L01/C02/A03/ME1-L01-C02-A03-P01-1.jpg',
      alt: '학교 앞에서 남학생이 선생님에게 자신의 여동생을 소개하는 모습',
      answer: false,
    },
    {
      src: '/L01/C02/A03/ME1-L01-C02-A03-P01-2.jpg',
      alt: '공원에서 강아지를 산책시키는 여자와 아기를 안고 있는 남자가 인사하는 모습',
      answer: false,
    },
    {
      src: '/L01/C02/A03/ME1-L01-C02-A03-P01-3.jpg',
      alt: '공원에서 한 남학생이 여학생에게 다른 남학생을 소개하는 모습',
      answer: true,
    },
  ];

  const questionText = 'Who are the speakers?';

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
              type: 'NUMBER',
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
      <BoxWrap>
        {imageList.map((item, index) => (
          <Radio
            key={index + 1}
            type='default'
            name={'radio-question-A'}
            value={index + 1 === cardData[pageKey].answer}
            onClick={() => onChange(index + 1)}
            disabled={cardData[pageKey].isSubmitted}
          >
            <ShadowedButton
              key={index + 1}
              type='img'
              state={
                index + 1 === cardData[pageKey].answer
                  ? cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect
                    ? EStyleShadowedButtonTypes.WARNING
                    : EStyleShadowedButtonTypes.PRIMARY
                  : EStyleShadowedButtonTypes.DEFAULT
              }
            >
              <Label value={index + 1} />
              <Box marginTop='8px'>
                <Image size='100%' src={item.src} alt={item.alt} type={EImageType.IMG} />
              </Box>
            </ShadowedButton>
          </Radio>
        ))}
      </BoxWrap>
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
