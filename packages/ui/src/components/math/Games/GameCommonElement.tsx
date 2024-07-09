import styled from '@emotion/styled';

export const importScript = (src: string, module: boolean, initFunctionS?: string, initFunctionParams?: Array<String>, onloadF?: Function) => {
  let script: HTMLScriptElement | null = document.querySelector(`script[src="${src}"]`);

  const execFunctionOnModule = async (initFunctionS: string, initFunctionParams?: Array<String>) => {
    const module = await import(/* @vite-ignore */ src);
    if (typeof module[initFunctionS] === 'function') {
      if (initFunctionParams?.length !== undefined && initFunctionParams?.length > 0) {
        module[initFunctionS](...initFunctionParams); // Call the function dynamically from the module
      } else {
        module[initFunctionS]();
      }
    }
  };

  const execFunctionOnWindow = (initFunctionS: string, initFunctionParams?: Array<String>) => {
    const initFunction = eval(initFunctionS);
    if (typeof initFunction === 'function') {
      if (initFunctionParams?.length !== undefined && initFunctionParams?.length > 0) {
        initFunction(...initFunctionParams); // Call the function dynamically from window object
      } else {
        initFunction();
      }
    }
  };

  if (script) {
    document.body.removeChild(script);
  }
  script = document.createElement('script');
  script.id = src.split('/').reverse()[0];
  script.src = src;
  script.async = false;
  module ? (script.type = 'module') : '';
  script.onload = () => {
    if (onloadF) onloadF();
    if (initFunctionS !== null && initFunctionS !== undefined) {
      if (module) execFunctionOnModule(initFunctionS, initFunctionParams);
      else execFunctionOnWindow(initFunctionS, initFunctionParams);
    }
  };
  document.body.appendChild(script);
};

export const useGameCommonScript = () => {
  //import must be sequentially
  importScript('../../../../public/js/jquery.min.js', false);
  importScript('../../../../public/js/jquery-ui.min.js', false);
  importScript('../../../../public/js/bootstrap.min.js', false);
  importScript('../../../../public/js/jquery.ui.touch-punch.min.js', false);
};

export interface IGameProps {
  width?: number;
  height?: number;
}

export const GameContainer = styled.div<{ width: number; height: number }>`
  transform: scale($ ${({ width, height }) => (1280 * (height / 720) > width ? width / 1280 : height / 720)});
  left: ${({ width, height }) => (width - 1280 * (1280 * (height / 720) > width ? width / 1280 : height / 720)) / 2}px;
  border: 'none';
`;
