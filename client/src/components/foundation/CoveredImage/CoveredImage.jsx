import classNames from 'classnames';
import sizeOf from 'image-size';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { useFetch } from '../../../hooks/use_fetch';
import { fetchBinary } from '../../../utils/fetchers';

/**
 * @typedef {object} Props
 * @property {string} alt
 * @property {string} src
 */
// TODOアスペクト比さえちゃんとすれば良さそう
/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように画像を拡大縮小します
 * @type {React.VFC<Props>}
 */
const CoveredImage = ({ alt, src }) => {
  const { data, isLoading } = useFetch(src, fetchBinary);

  const imageSize = React.useMemo(() => {
    return data !== null ? sizeOf(Buffer.from(data)) : null;
  }, [data]);


  const [containerSize, setContainerSize] = React.useState({ height: 0, width: 0 });
  /** @type {React.RefCallback<HTMLDivElement>} */
  const callbackRef = React.useCallback((el) => {
    setContainerSize({
      height: el?.clientHeight ?? 0,
      width: el?.clientWidth ?? 0,
    });
  }, []);

  if (isLoading || data === null ) {
    return null;
  }

  const containerRatio = containerSize.height / containerSize.width;
  const imageRatio = imageSize?.height / imageSize?.width;

  return (
    <div ref={callbackRef} className="relative w-full h-full overflow-hidden">
      <LazyLoadImage
        alt={alt}
        className={classNames('absolute left-1/2 top-1/2 max-w-none transform -translate-x-1/2 -translate-y-1/2', {
          'w-auto h-full': containerRatio > imageRatio,
          'w-full h-auto': containerRatio <= imageRatio,
        })}
        src={src}
      />
    </div>
  );
};

export { CoveredImage };
