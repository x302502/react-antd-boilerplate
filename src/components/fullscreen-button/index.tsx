import type { ButtonProps } from 'antd';
import type { RefObject } from 'react';
import { BasicButton } from '~/components';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';

import { useFullscreen } from 'ahooks';

export interface FullscreenButtonProps extends Omit<ButtonProps, 'target'> {
  target: HTMLElement | (() => Element) | RefObject<Element>;
  fullscreenIcon?: React.ReactNode;
  fullscreenExitIcon?: React.ReactNode;
}

/**
 * Fullscreen button component
 *
 * @param target Target element for fullscreen
 * @param fullscreenIcon Icon for fullscreen mode
 * @param fullscreenExitIcon Icon for exiting fullscreen mode
 * @param restProps Other properties
 * @returns Returns the fullscreen button component
 */
export const FullscreenButton: React.FC<FullscreenButtonProps> = ({
  target,
  fullscreenIcon,
  fullscreenExitIcon,
  ...restProps
}) => {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(target);

  return (
    <BasicButton
      type="text"
      {...restProps}
      icon={
        !isFullscreen ? (fullscreenIcon ?? <FullscreenOutlined />) : (fullscreenExitIcon ?? <FullscreenExitOutlined />)
      }
      onClick={toggleFullscreen}
    />
  );
};
