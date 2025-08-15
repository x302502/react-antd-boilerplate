import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
  // Animation method
  easing: 'ease',
  // Speed of the incrementing progress bar
  speed: 500,
  // Whether to display the loading icon
  showSpinner: false,
  // Auto increment interval
  trickleSpeed: 200,
  // Minimum percentage at initialization
  minimum: 0.3,
});

export { NProgress };
