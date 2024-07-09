import { useState, useEffect, useRef } from 'react';
import {
  Box,
  IQuestionProps,
  EStyleButtonTypes,
  BottomSheet,
  Typography,
  Label,
  BoxWrap,
  Image,
  Tag,
  ETagLine,
  Drawing,
  ICanvasFunction,
  Scroll,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { B02_0010_10 } from './store';
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';

const P06 = () => {
  const pageNumber = 'P06';

  const { initData, submitData, changeData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B02_0010_10);
  const { userId } = useRecoilValue(studentAtom);
  const [isShowBottom, setIsShowBottom] = useState<boolean>(false);
  const canvasRef = useRef<ICanvasFunction>(null);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='5' type='icon' />
        다음과 같이 모양과 크기가 같은 정사각형 조각 9개로 만든 조각보에서 찾을 수 있는 크고 작은 정사각형은 모두 몇 개인지 구해 보세요.
      </>
    ),
  };

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
        setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], canvasDataURL: canvasDataURL } }));
        changeData(pageNumber, 1, 1, canvasDataURL);
      }
    }
  };

  const onSubmit = async () => {
    const canvasDataURL = canvasRef.current?.getValue();
    if (canvasDataURL) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], canvasDataURL: canvasDataURL, isSubmitted: true } }));
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
    submitData(pageNumber, userSubmission);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            canvasDataURL: userSubmissionList[0].inputData[0]?.value || cardData[pageNumber].canvasDataURL,
            isSubmitted,
          },
        }));

        if (userSubmissionList[0].inputData[0]?.value || cardData[pageNumber].canvasDataURL) {
          if (userSubmissionList[0].inputData[0]?.value)
            canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(userSubmissionList[0].inputData[0]?.value));
          else canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(cardData[pageNumber].canvasDataURL));
        }
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  return (
    <Container
      bodyId={'targetContainer'}
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      useRound
      submitLabel={cardData[pageNumber].isSubmitted ? (isShowBottom ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={isShowBottom ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={() => {
        if (cardData[pageNumber].isSubmitted) {
          setIsShowBottom(prev => !prev);
        } else {
          onSubmit();
        }
      }}
    >
      <Scroll>
        <BoxWrap flexDirection='column' alignItems='center' boxGap={0} marginBottom={10}>
          <Image src={'/B02/0010/10/B-EM31-02-0010-1002.png'} alt={'정사각형 9개'} height='150px' width='150px' />
        </BoxWrap>

        <Box vAlign='flex-start' marginTop='24px'>
          <Box useFull>
            <Label value='ㅁ' type='paint' background='var(--color-grey-600)' color='var(--color-white)' />
            &nbsp;어떻게 문제를 해결했는지 설명해 보세요.
          </Box>
        </Box>
        <Box useFull>
          <Drawing ref={canvasRef} tmpSave={tmpSaveCanvas} disabled={cardData[pageNumber].isSubmitted} />
        </Box>
      </Scroll>
      <BottomSheet
        bottomSheetTargetId={'targetContainer'}
        height='50%'
        show={isShowBottom}
        closeOption={{
          useYn: true,
          onClose: () => {
            setIsShowBottom(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>예) 정사각형 조각 1개짜리, 4개짜리, 9개짜리 정사각형 수를 세어 모두 더해서 구했습니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P06;
