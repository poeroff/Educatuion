import { useState, useEffect } from 'react';
import { L02C09A03 } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  Image,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Textarea,
  PinchZoom,
  IQuestionProps,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

interface SampleType {
  sampleAnswer: string;
}

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C09A03);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Plan and Write',
  };

  const questionInfo: IQuestionProps = {
    text: 'Write a book review based on Page 1 and revise it.',
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
              value: cardData.p02.answer1,
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: e.target.value } }));
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

  const sampleAnswer: SampleType = {
    sampleAnswer: `
      A Long Walk to Water is a novel written by Linda Sue Park, a Korean American author. This book is
      about a boy and a girl, Salva and Nya, who struggle to survive during the wars in Sudan. The most
      moving part is when Nya walks with bare feet every day for eight hours to bring water to her family.
      Reading that scene, I felt her pain and sorrow as if I experienced her hardship myself. I recommend
      this book because it shows us not only how terribly war can change people’s lives but also how strong people can be while going through such difficulties.
    `,
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={
        !isNotEmptyString(cardData.p02.answer1) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!isNotEmptyString(cardData.p02.answer1)}
      onSubmit={onSubmitText}
    >
      <BoxWrap useFull>
        <Box hAlign={'center'} useFull>
          <PinchZoom>
            <Image src={'/L02/C09/A03/HE1-L02-C09-A03-P02.jpg'} width='450px' height='280px' />
            <Box type='hidden' id='img_desc'>
              <p>
                이 이미지는 독서 감상문을 작성하는 템플릿입니다. 왼쪽에는 "My Favorites"와 "History"라는 탭이 있는 모바일 앱 인터페이스가 있으며, 책
                커버를 표시하는 공간과 책 제목, 저자, 별점 평가를 입력할 수 있는 부분이 있습니다. 오른쪽에는 다음과 같은 문장을 채울 수 있는 빈칸이
                있습니다: "빈칸 is 빈칸 written by 빈칸. This book is about 빈칸. The most moving part is 빈칸. Reading that scene, I 빈칸. I
                recommend this book because 빈칸." 각 문장은 책에 대한 생각을 표현할 수 있도록 구성되어 있습니다.
              </p>
            </Box>
          </PinchZoom>
        </Box>
        <Box useFull>
          <Textarea
            value={cardData.p02.answer1}
            onChange={handleInputChange}
            placeholder='내용을 넣어 주세요.'
            readOnly={cardData.p02.isSubmitted}
            ariaLabel='답을 입력하세요.'
          />
        </Box>
      </BoxWrap>
      <BottomSheet
        bottomSheetTargetId='targetContainer'
        height='30%'
        show={isShow && cardData.p02.isSubmitted}
        closeOption={{ useYn: true, onClose: () => setShow(false) }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{sampleAnswer.sampleAnswer}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
