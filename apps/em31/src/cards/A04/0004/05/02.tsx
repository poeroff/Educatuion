import { useEffect, useState, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  Box,
  Drawing,
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
import { A04_0004_05 } from './store';

const P02 = () => {
  const { initData, submitData, saveData, changeData } = usePageData();
  const currentPage = 'P02';
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A04_0004_05);
  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setShow] = useState<boolean>(false);
  const canvasRef = useRef<ICanvasFunction>(null);

  const handleShow = () => {
    setShow(!isShow);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '41×3 계산하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄴ' color='var(--color-white)' background='#969590' />
        계산하는 방법을 설명해 보세요.
      </>
    ),
  };

  const answers = [
    '일의 자리 수와 십의 자리 수에 3을 각각 곱하여 자리에 맞추어 씁니다.',
    '일의 자리 수 1과 3을 곱하여 3을 일의 자리에 쓰고, 십의 자리 수 4와 3을 곱하여 12를 백의 자리와 십의 자리에 씁니다. ',
    '일의 자리 계산과 십의 자리 계산 결과를 자리에 맞추어 씁니다.',
  ];

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
        changeData(currentPage, 1, 1, canvasDataURL);
      }
    }
  };

  const onSubmit = async () => {
    if (!cardData.p02.isSubmitted) {
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
          p02: {
            ...prev.p02,
            canvasDataURL: userSubmissionList[0].inputData[0]?.value || cardData.p02.canvasDataURL,
            isSubmitted,
          },
        }));

        if (userSubmissionList[0].inputData[0]?.value || cardData.p02.canvasDataURL) {
          if (userSubmissionList[0].inputData[0]?.value)
            canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(userSubmissionList[0].inputData[0]?.value));
          else canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(cardData.p02.canvasDataURL));
        }
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  return (
    <Container
      bodyId={'targetContainer'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={!cardData.p02.isSubmitted ? '완료하기' : !isShow ? '답안 보기' : '답안 닫기'}
      submitBtnColor={EStyleButtonTypes.YELLOW}
      onSubmit={() => {
        !cardData.p02.isSubmitted ? onSubmit() : handleShow();
      }}
      useRound
    >
      <Drawing ref={canvasRef} tmpSave={tmpSaveCanvas} disabled={cardData.p02.isSubmitted} />

      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          {answers && (
            <Box>
              <Tag type={ETagLine.GREEN} label='예시답안' />
              <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'10px'}>
                {answers.map((answer, index) => (
                  <Typography key={`answer-${index}`} lineHeight='normal'>
                    {answers.length === 1 ? '' : '- '}
                    {answer}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
