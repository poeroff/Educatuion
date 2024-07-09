import {
  BottomSheet,
  Box,
  BoxWrap,
  EImageType,
  EStyleButtonTypes,
  EStyleShadowedButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Image,
  Label,
  Radio,
  TMainHeaderInfoTypes,
  Tag,
} from '@maidt-cntn/ui';

import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container, ShadowedButton } from '@maidt-cntn/ui/en';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C02A05 } from './store';

interface IExample {
  label: number;
  imgPath: string;
  imgAlt: string;
}

const P01 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C02A05);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'listenAndChoose',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C02/A05/ME1-L01-C02-A05-P01.mp3',
    captionSrc: '/L01/C02/A05/ME1-L01-C02-A05-P01.srt',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'What does the boy like?',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const examples: IExample[] = [
    {
      label: 1,
      imgPath: '/L01/C02/A05/ME1-L01-C02-A05-P01-1.jpg',
      imgAlt: '과학 실험 도구인 현미경, 삼각 플라스크, 실린더',
    },
    {
      label: 2,
      imgPath: '/L01/C02/A05/ME1-L01-C02-A05-P01-2.jpg',
      imgAlt: '음악과 관련된 기타, 피아노, 헤드폰, 스피커',
    },
    {
      label: 3,
      imgPath: '/L01/C02/A05/ME1-L01-C02-A05-P01-3.jpg',
      imgAlt: '야구할 때 쓰는 글러브, 야구공, 야구 배트, 야구 헬멧',
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p01.answer === cardData.p01.solution;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p01.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: index } }));
    changeData('P01', 1, 1, index);
  };

  useEffect(() => {
    return () => {
      saveData('P01');
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
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={
        cardData.p01.isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : cardData.p01.answer === 0
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={!cardData.p01.isSubmitted && cardData.p01.answer === 0}
      onSubmit={submitAnswer}
      audioInfo={audioInfo}
    >
      <BoxWrap>
        {examples.map((example, index) => (
          <Radio
            key={index}
            type='default'
            name={'radio-question-A'}
            value={example.label === cardData.p01.answer}
            onClick={() => handleChange(example.label)}
            disabled={cardData.p01.isSubmitted}
          >
            <ShadowedButton
              key={index}
              type='img'
              state={
                example.label === cardData.p01.answer
                  ? cardData.p01.isSubmitted && !cardData.p01.isCorrect
                    ? EStyleShadowedButtonTypes.WARNING
                    : EStyleShadowedButtonTypes.PRIMARY
                  : EStyleShadowedButtonTypes.DEFAULT
              }
            >
              <Label value={index + 1} />
              <Box marginTop='8px'>
                <Image size='100%' src={example.imgPath} alt={example.imgAlt} type={EImageType.IMG} />
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
          <Box marginTop='12px'>{cardData.p01.solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
