import React, { Component } from 'react';
import {observer} from 'mobx-react';
import FileContext from '../store/FileStore';
import { observable } from 'mobx';
import MetaDataSetContext from '../context/DataContext';

const Form = observer(class Form extends Component {

    constructor(props) {
        super(props);    
        const exprs = this.props.expressions;
        const context = new FileContext(observable(this.props.data));
        this.state = {
            rootContext: context
        };
        for(const exprName in exprs) {
            const expr = exprs[exprName];
            if(!expr.path) {
                context.AddExpression(exprName, exprs[exprName]);
            }
            else {
                context.SaveExpression(exprName, exprs[exprName]);
            }
        }
    }
    
    render() {
        return (
            <MetaDataSetContext.Provider value={this.state.rootContext}>
                <div>
                    {this.props.children}
                </div>
            </MetaDataSetContext.Provider>
        );
    }
});

export default Form;