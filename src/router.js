import React from 'react';
import { applyRouterMiddleware,Router, Route ,IndexRoute, Redirect} from 'dva/router';
import { useScroll } from 'react-router-scroll';
import Info from './routes/News/routes/News';

export default function ({ history,app }) {
  return (
    <Router history={history} render={applyRouterMiddleware(useScroll())}>
        <Redirect from="/" to="theatreGroup"/>

        <Route path="theatreGroup" getComponent={(nextState, cb) => {
            require.ensure([], require => {
                app.model(require('./models/theatreGroup'));
                cb(null,require('./routes/theatreGroup')); 
            });
        }}/>

        <Route path="theatreGroupDetail/:theatreGroupDetailId" getComponent={(nextState, cb) => {
            require.ensure([], require => {
                app.model(require('./models/theatreGroupDetail'));
                cb(null, require('./routes/theatreGroupDetail'));
            }); 
        }}/>

        <Route path="performer" getComponent={(nextState, cb) => {
            require.ensure([], require => {
                app.model(require('./models/performer'));
                cb(null, require('./routes/performer')); 
            });
        }}/>

        <Route path="performerDetail" getComponent={(nextState, cb) => {
            require.ensure([], require => {
                app.model(require('./models/performerDetail'));
                cb(null, require('./routes/performerDetail')); 
            });
        }}/>
        
        <Route path="rankingList" getComponent={(nextState, cb) => {
            app.model(require('./models/rankinglist'));
            cb(null, require('./routes/rankinglist')); 
        }}/>

        <Route path="hotRole/hotRoleItem/:hotRoleItemId" getComponent={(nextState, cb) => {
            require.ensure([], require => {
                app.model(require('./models/rankingRoleDetail'));
                cb(null, require('./routes/rankingRoleDetail')); 
            });
        }}/>

        <Route path="roleList/contestPoll/:groundId" getComponent={(nextState, cb) => {
            require.ensure([], require => {
                app.model(require('./models/contestPoll'));
                cb(null, require('./routes/contestPoll')); 
            });
        }}/>

        {/* 角色演员信息&&他人评价 */}
        <Route path="rolePerformerInfo/:groundId&:roleId" getComponent={(nextState, cb) => {
            require.ensure([], require => {
                app.model(require('./models/actorInfo'));
                cb(null, require('./routes/actorInfo')); 
            });
        }}/>

        <Route path="rolePerformerInfo/signup/:roleId&:groupId" getComponent={(nextState, cb) => {
            require.ensure([], require => {
                cb(null, require('./routes/upPhotosVideo')); 
            });
        }}/>

        <Route path="signup" getComponent={(nextState, cb) => {
            require.ensure([], require => {
                app.model(require('./models/signup'));
                cb(null, require('./routes/signup')); 
            });
        }}/>

        {/* rank */} 
        <Route path="me" getComponent={(nextState, cb) => {
            cb(null, require('./routes/Me/me')); 
        }}/>

        <Route path="me/application" getComponent={(nextState, cb) => {
            require.ensure([], require => {
                app.model(require('./models/my/application'));
                cb(null,require('./routes/Me/application')); 
            });
        }}/>
        
        <Route path="me/application/edit/:editId" getComponent={(nextState, cb) => {
            // app.model(require('./models/search'));
                cb(null,require('./routes/Me/editApplication')); 
        }}/>


        <Route path="me/canvassing" getComponent={(nextState, cb) => {
            require.ensure([], require => {
                app.model(require('./models/my/canvassing'));
                cb(null,require('./routes/Me/Canvassing')); 
            });
        }}/>

        <Route path="me/release" getComponent={(nextState, cb) => {
            require.ensure([], require => {
                app.model(require('./models/my/release'));
                cb(null,require('./routes/Me/Release')); 
            });
        }}/>

        <Route path="me/collection" getComponent={(nextState, cb) => {
            require.ensure([], require => {
                app.model(require('./models/my/collection'));
                cb(null,require('./routes/Me/collection')); 
            });
        }}/>
        <Route path="me/message" getComponent={(nextState, cb) => {
            require.ensure([], require => {
                app.model(require('./models/my/message'));
                cb(null,require('./routes/Me/Message')); 
            });
        }}/>
        <Route path="me/contact" getComponent={(nextState, cb) => {
            cb(null,require('./routes/Me/ContactUs')); 
        }}/>

        <Route path="me/edit" getComponent={(nextState, cb) => {
            app.model(require('./models/my/edit'));
            cb(null,require('./routes/Me/edit')); 
        }}/>

        <Route path="me/addExperience/:addExperienceId" getComponent={(nextState, cb) => {
            app.model(require('./models/my/addExperience'));
            cb(null,require('./routes/Me/AddExperience')); 
        }}/>

        <Route path="me/creatTheatreGroup" getComponent={(nextState, cb) => {
                app.model(require('./models/my/creatTheatreGroup'));
                cb(null,require('./routes/Me/creatTheatreGroup')); 
        }}/>

        <Route path="search" getComponent={(nextState, cb) => {
            app.model(require('./models/search'));
            cb(null,require('./routes/search')); 
        }}/>
       

    </Router>
  );
}
