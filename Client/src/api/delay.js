import {activeEnv} from './def';

// Should be 0 in production!!
let delay = 0;
if (activeEnv == 'dummy' || activeEnv == 'local') {
    delay = 500;
}
export default delay;
