import React, { Component } from 'react';
import {observer} from 'mobx-react';

import MetaDataSetContext from '../context/DataContext';
import { isNullOrUndefined } from 'util';

const Cluster = observer(class Cluster extends Component {
    static contextType = MetaDataSetContext;

    render() {
        const context = this.context;

        let visible = true;
        if (!isNullOrUndefined(this.props.visible) && typeof(this.props.visible) === 'string') {
            visible = context.GetExprValue(this.props.visible);
        }

        return visible? (
            <div>
                <div>{this.props.title}</div>
                <div>{this.props.children}</div>
            </div>
        ) : null;
    }
});

export default Cluster;


