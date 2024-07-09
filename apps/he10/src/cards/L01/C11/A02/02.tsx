import { useEffect, useState } from 'react';
import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Label,
  Image,
  EImageType,
  BottomSheet,
  ETagLine,
  Tag,
  IAudioPlayerProps,
  IQuestionProps,
  EStyleButtonTypes,
  EStyleShadowedButtonTypes,
  Radio,
} from '@maidt-cntn/ui';
import { Container, ShadowedButton } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C11A02 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C11A02);
  const [isShow, setShow] = useState<boolean>(false);

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

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'A. Listening',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C11/A02/HE1-L01-C11-A02-P02.mp3',
    captionSrc: '/L01/C11/A02/HE1-L01-C11-A02-P02.srt',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '2. Listen again. Which is NOT mentioned in the dialogue?',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  interface IExample {
    label: number;
    imgPath: string;
    imgAlt: string;
  }

  const examples: IExample[] = [
    { label: 1, imgPath: '/L01/C11/A02/HE1-L01-C11-A02-P02-01.jpg', imgAlt: '1. 롤러코스터를 타고 있는 사람들' },
    { label: 2, imgPath: '/L01/C11/A02/HE1-L01-C11-A02-P02-02.jpg', imgAlt: '2. 벤치에 앉아 햄버거와 감자튀김을 먹고 있는 두 여자' },
    { label: 3, imgPath: '/L01/C11/A02/HE1-L01-C11-A02-P02-03.jpg', imgAlt: '3. 공원에서 안전모를 쓰고 자전거를 타고 있는 세 사람' },
    {
      label: 4,
      imgPath: '/L01/C11/A02/HE1-L01-C11-A02-P02-04.jpg',
      imgAlt: '4. 한 명이 손을 뻗어 핸드폰을 들고 있고 그 핸드폰을 바라보고 웃으며 사진을 찍고 있는 일곱명의 남녀들.',
    },
  ];

  const { userId } = useRecoilValue(studentAtom);

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p02.answer === cardData.p02.solution;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p02.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: index } }));
    changeData('P02', 1, 1, index);
  };

  useEffect(() => {
    return () => {
      saveData('P02');
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
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={
        cardData.p02.isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : cardData.p02.answer === 0
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={!cardData.p02.isSubmitted && cardData.p02.answer === 0}
      onSubmit={submitAnswer}
      audioInfo={audioInfo}
    >
      <BoxWrap width={920}>
        {examples.map((example, index) => (
          <Radio
            type='default'
            name={'radio-question-A'}
            key={index}
            value={example.label === cardData.p02.answer}
            onClick={() => handleChange(example.label)}
            readOnly={cardData.p02.isSubmitted}
            ariaLabel={index + '번 보기'}
            isError={cardData.p02.isSubmitted && cardData.p02.answer !== cardData.p02.solution}
          >
            <ShadowedButton
              key={index}
              type='img'
              state={
                example.label === cardData.p02.answer
                  ? cardData.p02.isSubmitted && !cardData.p02.isCorrect
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
          // <Box
          //   key={index}
          //   useFull
          //   onClick={() => {
          //     if (cardData.p02.isSubmitted) {
          //       return;
          //     }
          //     handleChange(example.label);
          //   }}
          //   tabIndex={0}
          //   margin={12}
          // >
          //   <Label value={example.label} background={cardData.p02.answer === example.label ? '#E6F8FF' : 'white'} />
          //   <Box marginTop='8px'>
          //     <Image size='100%' alt={example.imgAlt} src={example.imgPath} type={EImageType.IMG} />
          //   </Box>
          // </Box>
        ))}
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='container' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p02.solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
