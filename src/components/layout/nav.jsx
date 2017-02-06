import React, { PropTypes,Component } from 'react';
import { Affix } from 'antd';
import Foot from './foot';

const MainLayout = (props) => {
    return (
        <div>
            <div>
                {props.children}
            </div>
            <Foot location={props.location} history = {props.history}/>
        </div>
    )
}

export default MainLayout;

