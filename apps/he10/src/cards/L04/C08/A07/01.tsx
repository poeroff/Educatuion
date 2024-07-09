import { Box, BoxWrap, EImageType, EStyleButtonTypes, Image, Input, PinchZoom, Question, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect } from 'react';

import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { contentInfo } from './contentInfo';
import { L04C08A07 } from './store';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Fun with Grammer',
  };

  const questionInfo = {
    text: 'Introduce your best friend to the class using the structures below.',
  };

  const pageKey = 'p01';
  const pageNumber = 'P01';

  const { initData, changeData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C08A07);
  const { userId } = useRecoilValue(studentAtom);

  const isSubmittable = cardData.p01.userInputs.every(value => isNotEmptyString(value));

  /* default 제출 값 */
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const handleInputChangeEvent = (value: string, index: number) => {
    setCardData(prev => {
      const newUserInputs = [...prev[pageKey].userInputs].map((v, i) => {
        if (i === index) {
          return value;
        }
        return v;
      });

      return {
        ...prev,
        [pageKey]: {
          ...prev[pageKey],
          userInputs: newUserInputs,
        },
      };
    });
    changeData(pageNumber, 1, index + 1, value);
  };

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      return;
    } else {
      setCardData(prev => ({
        ...prev,
        [pageKey]: {
          ...prev[pageKey],
          isSubmitted: true,
        },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: cardData[pageKey].userInputs.map((value, index) => ({
            subKey: index + 1,
            type: 'TEXT',
            value,
          })),
        },
      ];
      submitData(pageNumber, userSubmission);
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
            userInputs: userSubmissionList[0].inputData.map((v: any, i: number) => v.value || cardData[pageKey].userInputs[i]),
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      useExtend
      submitLabel='완료하기'
      submitDisabled={!isSubmittable || cardData.p01.isSubmitted}
      submitBtnColor={!isSubmittable || cardData.p01.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      onSubmit={handleSubmit}
    >
      <BoxWrap height='calc(100% - 107px)'>
        <Box hAlign='center' useFull width={'25%'}>
          <PinchZoom pinchType={'image'}>
            <Image type={EImageType.IMG} src={contentInfo.P01.image[0].src} alt={contentInfo.P01.image[0].alt} width='100%' />
          </PinchZoom>
        </Box>
        <Box useFull width={'75%'} marginLeft={'10px'}>
          <Box>
            <Box>
              <Typography>My best friend, Anna,</Typography>
            </Box>
            <Box>
              <Question type={'dot'} size='small'>
                <Box>
                  <Typography>{contentInfo.P01.text[0]}</Typography>
                  <Typography useGap={false} color='var(--color-blue-900)'>
                    {contentInfo.P01.text[1]}
                  </Typography>
                  <Input
                    max-width='190px'
                    maxLength={100}
                    width='190px'
                    inputSize='x-small'
                    marginLeft={10}
                    value={cardData.p01.userInputs[0]}
                    readOnly={cardData.p01.isSubmitted}
                    onChange={e => {
                      handleInputChangeEvent(e.target.value, 0);
                    }}
                    placeholder='e.g. kind'
                    ariaLabel='1번 답란'
                  />
                  <Typography color='var(--color-blue-900)'>{contentInfo.P01.text[2]}</Typography>
                  <Input
                    max-width='190px'
                    maxLength={100}
                    width='190px'
                    inputSize='x-small'
                    marginLeft={10}
                    value={cardData.p01.userInputs[1]}
                    readOnly={cardData.p01.isSubmitted}
                    onChange={e => {
                      handleInputChangeEvent(e.target.value, 1);
                    }}
                    placeholder='e.g. helpful'
                    ariaLabel='2번 답란'
                  />
                </Box>
              </Question>
              <Question type={'dot'} size='small'>
                <Box>
                  <Typography>{contentInfo.P01.text[3]}</Typography>
                  <Typography useGap={false} color='var(--color-blue-900)'>
                    {contentInfo.P01.text[4]}
                  </Typography>
                  <Input
                    max-width='220px'
                    maxLength={100}
                    width='220px'
                    inputSize='x-small'
                    marginLeft={10}
                    value={cardData.p01.userInputs[2]}
                    readOnly={cardData.p01.isSubmitted}
                    onChange={e => {
                      handleInputChangeEvent(e.target.value, 2);
                    }}
                    placeholder='e.g. taking a walk'
                    ariaLabel='3번 답란'
                  />
                  <Typography color='var(--color-blue-900)'>{contentInfo.P01.text[5]}</Typography>
                  <Input
                    max-width='230px'
                    maxLength={100}
                    width='230px'
                    inputSize='x-small'
                    marginLeft={10}
                    value={cardData.p01.userInputs[3]}
                    readOnly={cardData.p01.isSubmitted}
                    onChange={e => {
                      handleInputChangeEvent(e.target.value, 3);
                    }}
                    placeholder='e.g. reading books'
                    ariaLabel='4번 답란'
                  />
                  <Typography>{contentInfo.P01.text[6]}</Typography>
                </Box>
              </Question>
              <Question type={'dot'} size='small'>
                <Box>
                  <Typography>{contentInfo.P01.text[7]}</Typography>
                  <Input
                    max-width='620px'
                    maxLength={100}
                    width='620px'
                    inputSize='x-small'
                    marginLeft={10}
                    value={cardData.p01.userInputs[4]}
                    readOnly={cardData.p01.isSubmitted}
                    onChange={e => {
                      handleInputChangeEvent(e.target.value, 4);
                    }}
                    placeholder='e.g. helps those in need with a heart filled with kindness'
                    ariaLabel='5번 답란'
                  />
                </Box>
              </Question>
            </Box>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
