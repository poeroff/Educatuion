import { useEffect, useRef } from 'react';

import { BoxWrap, Textarea, Box, ICanvasFunction, Drawing, EImageType, Image, Typography } from '@maidt-cntn/ui';
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';

type TDialogContent = {
  answer?: string[];
  canvasDataURL?: string;
};
const DialogContent = ({ answer, canvasDataURL }: TDialogContent) => {
  const canvasRef = useRef<ICanvasFunction>(null);
  const backgroundImg = `/L07/C04/A02/ME1-L07-C04-A02-P02.jpg`;

  useEffect(() => {
    canvasDataURL && canvasRef?.current?.settingCanvasImageWithBlobs(dataURLToBlob(canvasDataURL));
  }, []);

  return (
    <>
      <BoxWrap marginTop='14px'>
        <BoxWrap width='calc(50% - 22px)' flexDirection='column' justifyContent='center' marginRight='0'>
          <Box marginTop='0' marginRight='0'>
            <Textarea
              width='414px'
              height='94px'
              placeholder='e.g. big easters'
              ariaLabel='조사한 동물의 흥미로운 사실 예시를 적어주세요. for example. big easters'
              readOnly
              value={answer?.[0]}
            />
          </Box>

          <Box marginTop='16px' marginRight='0'>
            <Textarea
              width='414px'
              height='94px'
              placeholder='e.g. Baby pandas are pink.'
              ariaLabel='조사한 동물의 흥미로운 사실 예시를 적어주세요. for example. Baby pandas are pink.'
              readOnly
              value={answer?.[1]}
            />
          </Box>

          <Box marginTop='16px' marginRight='0'>
            <Textarea
              width='414px'
              height='94px'
              placeholder='e.g. Pandas can swim.'
              ariaLabel='조사한 동물의 흥미로운 사실 예시를 적어주세요. for example. Pandas can swim.'
              readOnly
              value={answer?.[2]}
            />
          </Box>
        </BoxWrap>

        <Box width={'50%'} position='relative'>
          <Image width='482px' height='378px' type={EImageType.IMG_BG} src={backgroundImg}></Image>
          <Box position='absolute' top='48px' useRound width='482px' height='250px' textAlign='center'>
            <Typography fontSize='24px'>Draw animals</Typography>
          </Box>
          <Box position='absolute' top='60px' left='45px'>
            <Drawing height='250px' width='402px' ref={canvasRef} disabled />
          </Box>
        </Box>
      </BoxWrap>
    </>
  );
};

export default DialogContent;
