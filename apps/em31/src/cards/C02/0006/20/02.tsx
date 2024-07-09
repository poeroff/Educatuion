import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import {
  Box,
  IQuestionProps,
  TMainHeaderInfoTypes,
  Typography,
  Image,
  BottomSheet,
  Tag,
  ETagLine,
  Label,
  EStyleButtonTypes,
  Symbol,
} from '@maidt-cntn/ui';
import { DialogContainer } from '@maidt-cntn/ui/math';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C02_0006_20 } from './store';
import usePageData from '@/hooks/usePageData';

const P02 = () => {
  const pageNumber = 'P02';
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C02_0006_20);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const [isShow, setIsShow] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const RightAngle = <Image src={'/C02/0006/20/EC31220.png'} alt='직각 표시' width='62px' height='62px' />;

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box hAlign='center'>
        <Label type='icon' size='middle' value='1' />
        직각을 모두 찾아&nbsp;
        {RightAngle}
        표시를 하고, 직각삼각형에&nbsp;
        <Symbol type='correct' />표 하세요.
      </Box>
    ),
  };

  const udl = [
    '왼쪽에서부터 첫 번째는 직각이 있는 삼각형, 두 번째는 직각보다 큰 각이 있는 삼각형,',
    '세 번째는 세 각이 모두 직각보다 작은 삼각형, 네 번째는 직각이 있는 삼각형입니다.',
  ];

  const solutionImageInfo = {
    src: '/C02/0006/20/EC31226(sol).png',
    width: '260px',
    height: '181px',
  };

  const commentUdl = [
    '모눈종이 위에 두 개의 선분이 직각으로 그려져 있으며 이을 수 있도록 선택할 수 있는 점이 5개가 있습니다.',
    '그중 직사각형을 그릴 수 있는 점 4로 이은 정답 표시가 그려진 그림입니다.',
  ];

  const commentary = (
    <Box hAlign='center'>
      직각을 찾아&nbsp;
      {RightAngle}
      표시를 하고, 직각이 있는 삼각형에&nbsp;
      <Symbol type='correct' />표 합니다.
    </Box>
  );

  const commentImageInfo = {
    src: '/C02/0006/20/EC31226(sol).png',
    udl: commentUdl,
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
          <Image src={'/C02/0006/20/EC31226.png'} alt='' width='642px' height='143px' ariaDescribedby='img_desc' />
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
            <Box vAlign='flex-start' flexDirection='column'>
              <Image
                src={solutionImageInfo.src}
                width={solutionImageInfo.width}
                height={solutionImageInfo.height}
                alt={'4개 모두 삼각형인데 왼쪽에서부터 첫 번째, 네 번째에 직각 표시가 그려진 그림'}
                ariaDescribedby={'img_desc'}
              />
              {commentImageInfo.udl && (
                <Box type='hidden' id='img_desc'>
                  {commentImageInfo.udl.map((item, index) => (
                    <p key={`img_desc_${index}`}>{item}</p>
                  ))}
                </Box>
              )}
            </Box>
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
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

export default P02;
