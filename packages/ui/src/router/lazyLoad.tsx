import { ComponentType, lazy, Suspense } from 'react';

export const lazyLoad = (
  currentComponent: () => Promise<{
    default: ComponentType<any>;
  }>,
) => {
  try {
    const LazyComponent = lazy(currentComponent);
    return (
      // To-do: Add Loading
      <Suspense fallback={<></>}>
        <LazyComponent />
      </Suspense>
    );
  } catch (error) {
    window.location.reload();
    console.log(`lazy load error!`);
  }
};

export default lazyLoad;
