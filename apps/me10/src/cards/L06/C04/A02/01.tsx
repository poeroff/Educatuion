import {
  Box,
  BoxWrap,
  EStyleButtonTypes,
  IAudioPlayerProps,
  IQuestionProps,
  Image,
  Input,
  PinchZoom,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L06C04A02 } from './store';

const P01 = () => {
  const pageNumber = 'P01';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L06C04A02);
  const { userId } = useRecoilValue(studentAtom);

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
            userInput: userSubmissionList[0].inputData[0]?.value || cardData[pageNumber].userInput,
            isSubmitted: isSubmitted,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (!cardData[pageNumber].isSubmitted) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageNumber].userInput,
            },
          ],
        },
      ];
      submitData(pageNumber, userSubmission);
    }
  };

  const handleInputChange = (value: string) => {
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], userInput: value } }));
    changeData(pageNumber, 1, 1, value);
  };

  const isSubmittable = isNotEmptyString(cardData[pageNumber].userInput || '');

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'My Role Model: Step 1',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: <>자신의 롤 모델을 생각해 봅시다.</>,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: 'audioSrc',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel={'완료하기'}
      submitDisabled={!isSubmittable || cardData[pageNumber].isSubmitted}
      submitBtnColor={
        !cardData[pageNumber].isSubmitted ? (!isSubmittable ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
      onSubmit={handleSubmit}
    >
      <Scroll tabIndex={0}>
        <BoxWrap>
          <Box useFull hAlign='center'>
            <PinchZoom>
              <Image src={'/L06/C04/A02/ME1-L06-C04-A02-P01-01.jpg'} width='250px' alt='세종대왕' />
            </PinchZoom>
          </Box>
          <Box useFull hAlign='center'>
            <PinchZoom>
              <Image src={'/L06/C04/A02/ME1-L06-C04-A02-P01-02.jpg'} width='250px' alt='토마스 에디슨' />
            </PinchZoom>
          </Box>
          <Box useFull hAlign='center'>
            <PinchZoom>
              <Image src={'/L06/C04/A02/ME1-L06-C04-A02-P01-03.jpg'} width='250px' alt='제인 구달' />
            </PinchZoom>
          </Box>
        </BoxWrap>
        <Box vAlign='center' marginTop='24px'>
          <Typography>나의 롤 모델</Typography>
          <Input
            value={cardData[pageNumber]?.userInput}
            onChange={e => handleInputChange(e.target.value)}
            placeholder={'내용을 넣어 주세요.'}
            ariaLabel='답 입력란'
            width='730px'
            maxLength={999}
            readOnly={cardData[pageNumber].isSubmitted}
          />
        </Box>
      </Scroll>
    </Container>
  );
};

export default P01;

const ItemWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0px;
  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;
