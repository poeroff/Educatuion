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
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L02C12A03 } from './store';

export interface IImageList {
  src: string;
  alt: string;
  answer: boolean;
}

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setShow] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(L02C12A03);
  const pageIds = useRecoilValue(pageIdsAtom);

  const pageNum = 'P01';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listening',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C12/A03/ME1-L02-C12-A03-P01.mp3',
    captionSrc: '/L02/C12/A03/ME1-L02-C12-A03-P01.srt',
  };

  const questionInfo: IQuestionProps = {
    type: 'number',
    number: '6',
    text: '잘 듣고, 물음에 답해 봅시다.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const handleRadio = (index: number) => {
    setCardData(prev => {
      return { ...prev, p01: { ...prev.p01, answer: index } };
    });

    changeData(pageNum, 1, 1, index);
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
      return;
    }

    const isCorrect = imageList[cardData.p01.answer].answer;

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p01.answer,
            isCorrect: isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNum, userSubmission, isCorrect);
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: null,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNum)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNum, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNum);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const imageList: IImageList[] = [
    {
      src: '/L02/C12/A03/ME1-L02-C12-A03-P01-01.jpg',
      alt: '태양',
      answer: false,
    },
    {
      src: '/L02/C12/A03/ME1-L02-C12-A03-P01-02.jpg',
      alt: '눈송이',
      answer: true,
    },
    {
      src: '/L02/C12/A03/ME1-L02-C12-A03-P01-03.jpg',
      alt: '먹구름과 비',
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
      submitDisabled={!cardData.p01.isSubmitted && cardData.p01.answer === -1}
      submitBtnColor={
        cardData.p01.isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : cardData.p01.answer === -1
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={handleSubmit}
    >
      <BoxWrap>
        {imageList.map((item: IImageList, index: number) => (
          <Box key={'boxNumber' + index} width={100 / imageList.length + '%'}>
            <Radio
              name={'radio-question-A'}
              type='default'
              value={index === cardData.p01.answer}
              onClick={() => {
                if (!cardData.p01.isSubmitted) {
                  handleRadio(index);
                }
              }}
              disabled={cardData.p01.isSubmitted}
              ariaLabel={index + '번 보기'}
            >
              <ShadowedButton
                key={'button' + index}
                type='img'
                state={
                  index === cardData.p01.answer
                    ? cardData.p01.isSubmitted && !cardData.p01.isCorrect
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
