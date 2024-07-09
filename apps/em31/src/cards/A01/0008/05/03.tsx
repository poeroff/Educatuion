import { useEffect, useState, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  Box,
  Drawing,
  EStyleFontSizes,
  ETagLine,
  IQuestionProps,
  Label,
  EStyleButtonTypes,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
  BottomSheet,
  ICanvasFunction,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { A01_0008_05 } from './store';

const P03 = () => {
  const { initData, submitData, saveData, changeData } = usePageData();
  const currentPage = 'P03';
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0008_05);
  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setShow] = useState<boolean>(false);
  const canvasRef = useRef<ICanvasFunction>(null);

  const handleShow = () => {
    setShow(!isShow);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '뺄셈의 어림셈으로 문제를 해결하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄷ' color='var(--color-white)' background='#969590' />
        3학년 학생 모두 영상 체험관에 들어갈 수 있다고 생각하나요? 왜 그렇게 생각하는지 이야기해 보세요.
      </>
    ),
  };

  const contents = (
    <>
      <Typography>3학년 학생이 모두 영상 체험관에서 영상을 보기로 했어. </Typography>
      <Typography>영상 체험관의 자리는 700개이고 지금까지 입장한 사람은 198명이야.</Typography>
      <Typography>3학년 학생 모두 영상 체험관에 들어갈 수 있을까?</Typography>
    </>
  );

  const commentary = '모두 들어갈 수 있습니다. 어림셈을 하면 남은 자리가 500개쯤 인데 3학년 학생은 모두 412명이기 때문입니다.';

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
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, canvasDataURL: canvasDataURL } }));
        changeData(currentPage, 1, 1, canvasDataURL);
      }
    }
  };

  const onSubmit = async () => {
    if (!cardData.p03.isSubmitted) {
      const canvasDataURL = canvasRef.current?.getValue();
      if (canvasDataURL) {
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, canvasDataURL: canvasDataURL, isSubmitted: true } }));
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
      submitData(currentPage, userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            canvasDataURL: userSubmissionList[0].inputData[0]?.value || cardData.p03.canvasDataURL,
            isSubmitted,
          },
        }));

        if (userSubmissionList[0].inputData[0]?.value || cardData.p03.canvasDataURL) {
          if (userSubmissionList[0].inputData[0]?.value)
            canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(userSubmissionList[0].inputData[0]?.value));
          else canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(cardData.p03.canvasDataURL));
        }
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId={'targetContainer'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={!cardData.p03.isSubmitted ? '완료하기' : !isShow ? '답안 보기' : '답안 닫기'}
      submitBtnColor={EStyleButtonTypes.YELLOW}
      onSubmit={() => {
        !cardData.p03.isSubmitted ? onSubmit() : handleShow();
      }}
      useRound
    >
      <Box useFull>
        <Box display='flex' flexDirection='column'>
          <Typography size={EStyleFontSizes.MEDIUM}>{contents}</Typography>
        </Box>

        <Box marginTop='24px'>
          <Drawing height='175px' width='888px' ref={canvasRef} tmpSave={tmpSaveCanvas} disabled={cardData.p03.isSubmitted} />
        </Box>
      </Box>

      <BottomSheet height={'50%'} show={isShow} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography> {commentary}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
