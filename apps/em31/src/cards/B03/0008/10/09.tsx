import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Label,
  Typography,
  IQuestionProps,
  Table,
  EStyleTableTypes,
  TBody,
  TR,
  TH,
  TD,
  THead,
  BottomSheet,
  Tag,
  ETagLine,
  Drawing,
  ICanvasFunction,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { B03000810Atom } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';

const P09 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(B03000810Atom);
  const [isShow, setIsShow] = useState<boolean>(false);
  const canvasRef = useRef<ICanvasFunction>(null);
  const containerId = `A01000104P09`;

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={8} />
        에서 알게 된 점을 살펴보세요.
      </>
    ),
  };

  const th_arr = ['해열제', '하루(시간)', '먹는 시간 간격(시간)', '나눗셈', '먹을 수 있는 횟수(회)'];
  const td_arr = [
    ['다나', 24, 4, '24÷4', 6],
    ['시원', 24, 6, '24÷6', 4],
    ['튼튼', 24, 8, '24÷8', 3],
  ];

  const solutionDetails = {
    solution: '예) 표를 만들어 나누어지는 수가 같을 때 나누는 수와 몫의 관계를 알게 되었습니다.',
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
        setCardData(prev => ({ ...prev, p09: { ...prev.p09, canvasDataURL: canvasDataURL } }));
        changeData('P09', 1, 1, canvasDataURL);
      }
    }
  };

  const onSubmit = async () => {
    if (cardData.p09.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const canvasDataURL = canvasRef.current?.getValue();
      if (canvasDataURL) {
        setCardData(prev => ({ ...prev, p09: { ...prev.p09, canvasDataURL: canvasDataURL, isSubmitted: true } }));
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
      submitData('P09', userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P09')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p09: {
            ...prev.p09,
            canvasDataURL: userSubmissionList[0].inputData[0]?.value || cardData.p09.canvasDataURL,
            isSubmitted,
          },
        }));

        if (userSubmissionList[0].inputData[0]?.value || cardData.p09.canvasDataURL) {
          if (userSubmissionList[0].inputData[0]?.value)
            canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(userSubmissionList[0].inputData[0]?.value));
          else canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(cardData.p09.canvasDataURL));
        }
      }
      initData('P09', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P09');
    };
  }, [userId]);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId={containerId}
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p09.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={false}
      submitBtnColor={!cardData.p09.canvasDataURL ? EStyleButtonTypes.YELLOW : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={onSubmit}
      useRound
      vAlign='start'
    >
      <Box>
        <Table color={EStyleTableTypes.TERTIARY} sizes={['110px', '149px', 'auto', '142px', 'auto']}>
          <THead>
            <TR>
              {th_arr.map((item, idx) => {
                return (
                  <TH key={idx} scope='col' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                    {item}
                  </TH>
                );
              })}
            </TR>
          </THead>
          <TBody>
            {td_arr.map((item, index) => (
              <TR key={index}>
                {item.map((value, index) => {
                  return (
                    <TD key={index} hAlign='center' color={EStyleTableTypes.TERTIARY}>
                      {value}
                    </TD>
                  );
                })}
              </TR>
            ))}
          </TBody>
        </Table>
      </Box>
      <Box>
        <Box marginTop='10px' vAlign='flex-start'>
          <Box height={'60px'} display='flex' alignItems='center'>
            <Label value='ㄹ' lineColor='none' background='#969590' color='var(--color-white)' />
          </Box>
          <Box marginLeft='8px'>
            <Typography fontSize='var(--font-size-36)' lineHeight='56px'>
              어떻게 문제를 해결했는지 설명해 보세요.
            </Typography>
          </Box>
        </Box>
        <Box useFull height='300px' marginTop='-30px'>
          <Drawing ref={canvasRef} tmpSave={tmpSaveCanvas} disabled={cardData.p09.isSubmitted} />
        </Box>
      </Box>
      <BottomSheet height={'50%'} show={cardData.p09.isSubmitted && isShow} bottomSheetTargetId={containerId}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{solutionDetails.solution}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P09;
