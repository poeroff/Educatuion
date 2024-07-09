import { useEffect, useState } from 'react';
import {
  Image,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Textarea,
  PinchZoom,
  IQuestionProps,
  Tag,
  ETagLine, BottomSheet, EStyleButtonTypes, Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C09A03 } from '@/cards/L04/C09/A03/store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { studentAtom } from '@/stores/student';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C09A03);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Plan and Write',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Write a persuasive paragraph based on Page 1 and revise it.',
  };

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

  const onSubmitText = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer,
            },
          ],
        },
      ];
      submitData('P02', userSubmission);
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
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: e.target.value } }));
    changeData('P02', 1, 1, e.target.value);
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
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={
        !isNotEmptyString(cardData.p02.answer) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!isNotEmptyString(cardData.p02.answer)}
      onSubmit={onSubmitText}
    >
      <BoxWrap useFull>
        <Box hAlign={'center'} useFull>
          <PinchZoom>
            <Image
              src={'/L04/C09/A03/HE2-L04-C09-A03-P02.jpg'}
              width='500px'
              height='390px'
              ariaDescribedby='img-desc'
            />
            <Box type='hidden' id='img-desc'>
              <p>이 이미지는 설득하는 글을 작성하는 템플릿 입니다.</p>
              <p>빈칸</p>
              <p>In the 21st century, the development of digital literacy is essential for all of us.</p>
              <p>I consider it particularly important 빈칸.</p>
              <p>To help you achieve this, let me make a few suggestions. First, you should 빈칸.</p>
              <p>You should also 빈칸.</p>
              <p>To be good digital citizens, always remember the fact that 빈칸.</p>
            </Box>
          </PinchZoom>
        </Box>
        <Box useFull marginTop='50px'>
          <Textarea
            value={cardData.p02.answer}
            onChange={handleInputChange}
            readOnly={cardData.p02.isSubmitted}
            width='400px'
            height='300px'
            placeholder='내용을 넣어 주세요.'
            ariaLabel='답을 입력하세요' />
        </Box>
      </BoxWrap>
        <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow && cardData.p02.isSubmitted} closeOption={{ useYn: true, onClose: () => setShow(false) }}>
          <Box background='lightGray' borderRadius='12px' marginTop='35px'>
            <Box>
              <Tag type={ETagLine.GREEN} label='예시답안' />
            </Box>
            <Box marginTop='12px'>
              <Typography useGap={false} >
              Online Manners: Using Information in the Right Way
              In the 21st century, the development of digital
              literacy is essential for all of us. I consider it
              particularly important to learn how to use digital
              information properly. To help you achieve this, let
              me make a few suggestions. First, you should
              respect copyright. Avoid sharing others’ content
              online without their permission. You should also
              check the reliability of online information. Make
              sure to search for information from multiple sources.
              To be good digital citizens, always remember the
              fact that the ethical use of accurate information
              contributes to a healthy online environment.
              </Typography>
            </Box>
          </Box>
        </BottomSheet>
    </Container>
  );
};

export default P02;
