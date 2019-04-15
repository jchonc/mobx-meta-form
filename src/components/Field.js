import React, { Component } from 'react';
import {observer} from 'mobx-react';

import MetaDataSetContext from '../context/DataContext';
import { isNullOrUndefined } from 'util';

const Field = observer(class Field extends Component {
    
    static contextType = MetaDataSetContext;

    constructor(props) {
        super(props);    
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        this.context.UpdateField(event.target.name, event.target.value)
    }

    render() {
        const context = this.context;
        const value = context.GetValue(this.props.name);

        let visible = true;
        if (!isNullOrUndefined(this.props.visible) && typeof(this.props.visible) === 'string') {
            visible = context.GetExprValue(this.props.visible);
        }

        return visible? (
            <div>
                <label>{this.props.caption}:</label><input type="text" name={this.props.name} value={value} onChange={this.handleChange} />
            </div>
        ): null;
    }

});

export default Field;