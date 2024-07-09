import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  Drawing,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  ICanvasFunction,
  IQuestionProps,
  Label,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A01_0008_04 } from './store';

const P02 = () => {
  const pageNo = 'P02';

  const { initData, submitData, saveData, changeData } = usePageData();
  const [cardData, setCardData] = useRecoilState(A01_0008_04);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const canvasRef = useRef<ICanvasFunction>(null);

  const isSubmittable = true;

  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const handleShowAnswer = () => {
    setIsShowAnswer(!isShowAnswer);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '덧셈의 어림셈으로 문제를 해결하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄴ' color='var(--color-white)' background='#969590' />
        3학년 학생은 단체 할인을 받을 수 있다고 생각하나요? 왜 그렇게 생각하는지 이야기해 보세요.
      </>
    ),
  };

  const contents: string[] = [
    `우리 학교 3학년 학생은 남학생 195명, 여학생 217명이야.`,
    `진로 체험관은 400명이 넘으면 입장료 단체 할인을 받을 수 있대.`,
    `3학년 학생은 단체 할인을 받을 수 있을까?`,
  ];

  const answer = `단체 할인을 받을 수 있습니다. 어림셈을 했을 때 3학년 학생이 400명보다 많기 때문입니다.`;

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'CANVAS',
          value: '',
        },
      ],
    },
  ];

  const tmpSaveCanvas = async () => {
    if (!canvasRef.current?.isCanvasBlank()) {
      const canvasDataURL = canvasRef.current?.getValue();
      if (canvasDataURL) {
        setCardData(prev => ({ ...prev, p02: { ...prev.p02, canvasDataURL: canvasDataURL } }));
        changeData(pageNo, 1, 1, canvasDataURL);
      }
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
            canvasDataURL: userSubmissionList[0].inputData[0].value || cardData.p02.canvasDataURL,
            isSubmitted,
          },
        }));

        if (userSubmissionList[0].inputData[0]?.value || cardData.p02.canvasDataURL) {
          if (userSubmissionList[0].inputData[0]?.value)
            canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(userSubmissionList[0].inputData[0]?.value));
          else canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(cardData.p02.canvasDataURL));
        }
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleSubmit = async () => {
    if (cardData.p02.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const canvasDataURL = canvasRef.current?.getValue();
      if (canvasDataURL) {
        setCardData(prev => ({ ...prev, p02: { ...prev.p02, canvasDataURL: canvasDataURL, isSubmitted: true } }));
      }
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'CANVAS',
              value: canvasDataURL,
            },
          ],
        },
      ];
      submitData(pageNo, userSubmission);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={!cardData.p02.isSubmitted ? '완료하기' : !isShowAnswer ? '답안 보기' : '답안 닫기'}
      submitDisabled={!isSubmittable}
      submitBtnColor={
        !isSubmittable
          ? EStyleButtonTypes.SECONDARY
          : !cardData.p02.isSubmitted
          ? EStyleButtonTypes.YELLOW
          : !isShowAnswer
          ? EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.GRAY
      }
      onSubmit={() => {
        !cardData.p02.isSubmitted ? handleSubmit() : handleShowAnswer();
      }}
      useRound
    >
      <Box useFull>
        <Box display='flex' flexDirection='column'>
          <Typography size={EStyleFontSizes.MEDIUM}>
            {contents.map((content, idx) => (
              <Typography key={`Typo` + idx}>{content}</Typography>
            ))}
          </Typography>
        </Box>
        <Box marginTop={'24px'}>
          <Drawing height='250px' width='910px' ref={canvasRef} tmpSave={tmpSaveCanvas} disabled={cardData.p02.isSubmitted} />
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='100px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{answer}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
