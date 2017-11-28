import timeout from './timeout';

const syncTimeout = msecs => timeout(() => {}, msecs);
export default syncTimeout;
