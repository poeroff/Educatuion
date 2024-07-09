import { useEffect, useState } from 'react';
import {
  BoxWrap,
  Box,
  Label,
  Image,
  EImageType,
  IQuestionProps,
  IAudioPlayerProps,
  Radio,
  List,
  BottomSheet,
  EStyleButtonTypes,
  ETagLine,
  Tag,
  EStyleShadowedButtonTypes,
} from '@maidt-cntn/ui';
import { Container, ShadowedButton } from '@maidt-cntn/ui/en';
import { IProps } from '.';
import { L02C02A03b } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

interface IRadioProps {
  imageSrc: string;
  alt: string;
  value: number;
}

const P01 = ({ headerInfo }: IProps) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C02A03b);

  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Whick book is the girl going to borrow?',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C02/A03/HE1-L02-C02-A03-01.mp3',
    captionSrc: '/L02/C02/A03/HE1-L02-C02-A03-01.srt',
  };

  const data: IRadioProps[] = [
    {
      imageSrc: '/L02/C02/A03/HE1-L02-C02-A03-01-1.jpg',
      alt: '분홍빛 하늘, 어두운 건물들, UFO 그림들과 Space Invasion 이라는 제목이 표시된 책의 표지',
      value: 1,
    },
    {
      imageSrc: '/L02/C02/A03/HE1-L02-C02-A03-01-2.jpg',
      alt: '빨간색 배경에 빨간색과 파란색 건물들과 Lost Cites라는 제목이 표시된 책의 표지',
      value: 2,
    },
    {
      imageSrc: '/L02/C02/A03/HE1-L02-C02-A03-01-3.jpg',
      alt: '황량한 배경에 우주복을 입은 사람의 뒷모습과 The Martian’s Return 이라는 제목이 표시된 책의 표지',
      value: 3,
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
          isCorrect: true,
        },
      ],
    },
  ];

  const onGrade = () => {
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
              isCorrect: isCorrect,
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

  const handleChange = (subKey: number, value: number) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: value } }));
    }
    changeData('P01', 1, subKey, value);
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
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData.p01.answer === 0}
      onSubmit={onGrade}
      submitBtnColor={cardData.p01.answer === 0 ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <BoxWrap>
        <List<IRadioProps>
          data={data}
          align='horizontal'
          row={({ value, index = 1 }) => (
            <Box width={'297px'}>
              <Radio
                type={'square'}
                name={'radio-question'}
                label={value?.value.toString()}
                ariaLabel={index + '번 보기'}
                onClick={() => handleChange(1, index)}
                readOnly={cardData.p01.isSubmitted}
              >
                <ShadowedButton
                  key={'button' + index}
                  type='img'
                  state={
                    index !== cardData.p01.answer
                      ? EStyleShadowedButtonTypes.DEFAULT
                      : !cardData.p01.isSubmitted
                      ? EStyleShadowedButtonTypes.PRIMARY
                      : cardData.p01.isCorrect
                      ? EStyleShadowedButtonTypes.PRIMARY
                      : EStyleShadowedButtonTypes.WARNING
                  }
                >
                  <Label value={index} />
                  <Box marginTop='8px'>{value && <Image width='100%' src={value.imageSrc} alt={value.alt} type={EImageType.IMG} />}</Box>
                </ShadowedButton>
              </Radio>
            </Box>
          )}
        />
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
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
