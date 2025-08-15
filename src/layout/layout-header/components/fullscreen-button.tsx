import type { FullscreenButtonProps } from '~/components';

import { FullscreenButton as FullscreenButtonComponent } from '~/components';
import { FullscreenExitIcon, FullscreenIcon } from '~/assets/icons';

export function FullscreenButton({ target, ...restProps }: FullscreenButtonProps) {
  return (
    <FullscreenButtonComponent
      {...restProps}
      target={target}
      fullscreenExitIcon={<FullscreenExitIcon />}
      fullscreenIcon={<FullscreenIcon />}
    />
  );
}
