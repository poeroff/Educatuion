import { Box, IQuestionProps, Input, InputStatus, BoxWrap, SvgIcon, Image, TextView, ETextViewColor } from '@maidt-cntn/ui';
import EM05001 from '@maidt-cntn/math/pages/EM-050-01';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { C02_0002_41 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { ChangeEvent, useEffect } from 'react';
import headerIcon from '@/assets/icon/m_default_01.svg';
const P01 = () => {
  const pageNumber = 'P01';
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(C02_0002_41);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            answer: { value1: userSubmissionList[0].inputData[0]?.value } || cardData[pageNumber].answer,
            isSubmitted,
            isCorrect: isSubmitted ? { value1: userSubmissionList[0].inputData[0]?.isCorrect } : { value1: false },
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const submitAnswer = (isCorrectAnswers: boolean[]) => {
    const isCorrect = isCorrectAnswers.every(value => value);
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: { value1: isCorrect } } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageNumber].answer.value1,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNumber, userSubmission, isCorrect);
  };

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value.trim();

    const userInputs = {
      ...cardData[pageNumber].answer,
      [name]: value,
    };
    setCardData(prev => ({
      ...prev,
      [pageNumber]: {
        ...prev[pageNumber],
        answer: userInputs,
      },
    }));
    changeData(pageNumber, 1, Number(name.replace('value', '')), value);
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

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        선호와 민지가 그린 그림입니다. 곧은 선으로만 그린 친구의 이름을 써 보세요.
      </>
    ),
    mark: cardData[pageNumber].isSubmitted
      ? Object.keys(cardData[pageNumber].isCorrect).every((key: string) => cardData[pageNumber].isCorrect[key])
        ? 'correct'
        : 'incorrect'
      : 'none',
  };

  const imageInfo1 = {
    altText: '선호는 나비를 구부러진 선으로만 그린 그림입니다.',
    imageSrc: '/C02/0002/41/DEC312006_01.png',
    imageHeight: '280px',
  };
  const imageInfo2 = {
    altText: '민지는 나비를 반듯한 선으로만 그린 그림입니다.',
    imageSrc: '/C02/0002/41/DEC312006_02.png',
    imageHeight: '280px',
  };

  const questionNode = (
    <BoxWrap justifyContent='center' alignItems='center'>
      <TextView title={'선호'} type={ETextViewColor.YELLOW} height='280px'>
        <Image src={imageInfo1.imageSrc} height={imageInfo1?.imageHeight} alt={imageInfo1.altText} />
      </TextView>
      <TextView title={'민지'} type={ETextViewColor.YELLOW} height='280px'>
        <Image src={imageInfo2.imageSrc} height={imageInfo2?.imageHeight} alt={imageInfo2.altText} />
      </TextView>
    </BoxWrap>
  );

  const inputNode: React.ReactNode = (
    <BoxWrap justifyContent={'flex-end'} marginRight={'50px'}>
      <Box style={{ display: 'flex', width: '1000px' }} hAlign={'flex-end'} vAlign='center'>
        <Input
          title='답 입력란'
          ariaLabel={'답란'}
          marginLeft={8}
          maxLength={3}
          width='100px'
          name={'value1'}
          value={cardData[pageNumber].answer.value1}
          onChange={handleInputChangeEvent}
          status={
            cardData[pageNumber].isSubmitted && !cardData[pageNumber].isCorrect.value1
              ? InputStatus.ERROR
              : isNotEmptyString(cardData[pageNumber].answer.value1)
              ? InputStatus.ENABLE
              : InputStatus.DEFAULT
          }
          readOnly={cardData[pageNumber].isSubmitted}
        />
      </Box>
    </BoxWrap>
  );
  const commentary = '선호가 그린 그림은 굽은 선으로, 민지가 그린 그림은 곧은 선으로 이루어져 있습니다.';

  return (
    <EM05001
      questionInfo={questionInfo}
      questionNode={questionNode}
      answer={cardData[pageNumber].answer}
      solution={cardData[pageNumber].solution}
      answerNode={inputNode}
      commentary={commentary}
      isSubmitted={cardData[pageNumber].isSubmitted}
      onSubmit={submitAnswer}
    />
  );
};

export default P01;
