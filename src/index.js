import './index.html';
import './index.less';
import dva from 'dva';
import createLoading from 'dva-loading';
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// 1. Initialize
const app = dva({
	history:useRouterHistory(createHashHistory)({ queryKey: false }),
});

app.use(createLoading());

// 2. Model

// 3. Router
app.router(require('./router'));

// 4. Start
app.start('#root');
