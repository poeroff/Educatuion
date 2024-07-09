import { useEffect, useState } from 'react';
import { Container, ShadowedButton } from '@maidt-cntn/ui/en';
import {
  Box,
  TMainHeaderInfoTypes,
  IQuestionProps,
  Image,
  IAudioPlayerProps,
  BoxWrap,
  Radio,
  Label,
  EStyleShadowedButtonTypes,
  EImageType,
  BottomSheet,
  Typography,
  Tag,
  ETagLine,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { IImageList } from '@maidt-cntn/pages/HE-027-01';
import { L01C04A02 } from './store';

const P01 = () => {
  const { changeData, initData, submitData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C04A02);
  const [isShow, setShow] = useState<boolean>(false);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: false,
          isCorrect: false,
        },
      ],
    },
  ];

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
            isSubmitted: userSubmissionList[0].inputData[0]?.isAnswer || cardData.p01.isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: index } }));
    changeData('P01', 1, 1, index);
  };

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
              isCorrect: cardData.p01.isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'My Video Channel: Step 1',
  };

  const questionInfo: IQuestionProps = {
    type: 'number',
    number: 'Step 1',
    text: '잘 듣고, Emma의 동영상 채널이 무엇에 관한 것인지 골라 봅시다.',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C04/A02/ME1-L01-C04-A02.mp3',
    captionSrc: '/L01/C04/A02/ME1-L01-C04-A02.srt',
  };

  const imageList: IImageList[] = [
    {
      src: '/L01/C04/A02/ME1-L01-C04-A02-P01-01.jpg',
      alt: 'Emma가 책을 보고 노트에 무언가 적고 있다.',
      answer: false,
    },
    {
      src: '/L01/C04/A02/ME1-L01-C04-A02-P01-02.jpg',
      alt: 'Emma가 강아지와 공놀이를 하고 있다.',
      answer: true,
    },
    {
      src: '/L01/C04/A02/ME1-L01-C04-A02-P01-03.jpg',
      alt: 'Emma가 노래를 부르고 있다.',
      answer: false,
    },
  ];

  return (
    <Container
      bodyId='targetContainer'
      questionInfo={questionInfo}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      headerInfo={headerInfo}
      audioInfo={audioInfo}
      submitDisabled={cardData.p01.answer === 0}
      submitBtnColor={cardData.p01.answer !== 0 ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      onSubmit={submitAnswer}
    >
      <BoxWrap>
        {imageList.map((item: IImageList, index: number) => (
          <Box key={'boxNumber' + index} width={100 / imageList.length + '%'}>
            <Radio
              name={'radio-question-A'}
              value={index === cardData.p01.answer}
              readOnly={cardData.p01.isSubmitted}
              onClick={() => {
                if (!cardData.p01.isSubmitted) {
                  handleChange(index + 1);
                }
              }}
            >
              <ShadowedButton
                key={'button' + index}
                type='img'
                state={
                  index + 1 !== cardData.p01.answer
                    ? EStyleShadowedButtonTypes.DEFAULT
                    : !cardData.p01.isSubmitted
                    ? EStyleShadowedButtonTypes.PRIMARY
                    : cardData.p01.isCorrect
                    ? EStyleShadowedButtonTypes.PRIMARY
                    : EStyleShadowedButtonTypes.WARNING
                }
              >
                <Label value={index + 1} />
                <Box marginTop='8px'>
                  <Image size='100%' src={item.src} alt={item.alt} type={EImageType.IMG} />
                </Box>
              </ShadowedButton>
            </Radio>
          </Box>
        ))}
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Typography>
              <Tag type={ETagLine.GREEN} label='답안' />
            </Typography>
          </Box>
          <Box>
            <Typography>{cardData.p01.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
