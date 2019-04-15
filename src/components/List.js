import React, { Component } from 'react';
import {observer} from 'mobx-react';
import { get } from 'lodash';

import MetaDataSetContext from '../context/DataContext';
import { isNullOrUndefined } from 'util';
import FileContext from '../store/FileStore';

const List = observer(class List extends Component {
    static contextType = MetaDataSetContext;

    render() {
        const context = this.context;

        let visible = true;
        if (!isNullOrUndefined(this.props.visible) && typeof(this.props.visible) === 'string') {
            visible = get( context.data, this.props.visible );
        }

        if (!visible) return null;

        const items = context.GetValue(this.props.name);

        //Also need to hook up all the child expressions
        return visible? (
            <div>
                {items.map((item, idx) => {
                    const ctx = new FileContext(item, this.props.name, context);
                    return (
                        <MetaDataSetContext.Provider value={ctx}>
                            {this.props.children}
                        </MetaDataSetContext.Provider>);
                    }
                )}
            </div>
        ) : null;
    }
});

export default List;


