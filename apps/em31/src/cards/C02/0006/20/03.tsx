import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { Box, IQuestionProps, TMainHeaderInfoTypes, Typography, Image, BottomSheet, Tag, ETagLine, Label, EStyleButtonTypes } from '@maidt-cntn/ui';
import { DialogContainer } from '@maidt-cntn/ui/math';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C02_0006_20 } from './store';
import usePageData from '@/hooks/usePageData';

const P03 = () => {
  const pageNumber = 'P03';
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C02_0006_20);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const [isShow, setIsShow] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box hAlign='center'>
        <Label type='icon' size='middle' value='2' />
        <Typography>직각삼각형을 그리려고 할 때 이어야 할 점은 어느 것인가요?</Typography>
      </Box>
    ),
  };

  const udl = [
    '모눈종이 위에 한 개의 선분과 이을 수 있도록 선택할 수 있는 점이 5개 있고,',
    '점 ①, ②, ③, ⑤로 이었을 때는 한 각이 직각보다 큰 삼각형이고,',
    '점 ④로 이었을 때는 한 각이 직각인 삼각형이 되는 그림입니다.',
  ];

  const solution = '④';

  const commentary = '다음과 같이 직각삼각형을 그릴 수 있습니다.';

  const commentImageInfo = {
    src: '/C02/0006/20/DIC312008(sol).png',
    width: '260px',
    height: '181px',
  };

  return (
    <DialogContainer
      bodyId='targetContainer-2'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[pageNumber].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={cardData[pageNumber].isSubmitted ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      onSubmit={() => {
        setIsShow(true);
      }}
    >
      <Box>
        <Typography>템플릿 생성 후 개발 예정</Typography>
        <Box marginTop={'8px'}>
          <Image src={'/C02/0006/20/DIC312008.png'} alt='' width='509px' height='353px' ariaDescribedby='img_desc' />
          {udl && (
            <Box type='hidden' id='img_desc'>
              {udl.map((item, index) => (
                <p key={`img_desc_${index}`}>{item}</p>
              ))}
            </Box>
          )}
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer-2' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={'답안'} />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{solution}</Typography>
          </Box>
          {commentary && (
            <Box marginTop={'10px'}>
              <Box>
                <Tag type={ETagLine.GREEN} label={'풀이'} />
              </Box>
              <Box marginTop='12px'>
                <Typography usePre>{commentary}</Typography>
              </Box>
            </Box>
          )}
          <Box vAlign='flex-start' flexDirection='column'>
            <Image
              src={commentImageInfo.src}
              width={commentImageInfo.width}
              height={commentImageInfo.height}
              alt={'모눈종이 위에 한 개의 선분과 점 ④를 이어 한 각이 직각인 삼각형이 만들어진 그림입니다.'}
            />
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

export default P03;
