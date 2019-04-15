import {observable, action, decorate} from 'mobx';
import { get, set } from 'lodash';
import {extendObservable, computed} from 'mobx';
import { isNullOrUndefined } from 'util';

function hookParent(obj, parent) {
    if(obj["_parent"] === undefined) {
        obj["_parent"] = parent;
        for(const prop in obj) {
            const nodeType = typeof(prop);
            if ( nodeType === "object" ) {
                hookParent(prop, obj);
            }
            else if ( nodeType === "array" ) {
                for(let i = 0; i < prop.length; i++) {
                    if(typeof(prop[i]) === "object") {
                        hookParent(prop[i], obj);
                    }
                }
            }
        }
    }
    return obj;
}

class FileContext {

    anchor = "";
    parentContext = null;
    data = {};

    constructor(originalData, anchorString, ownerContext) {
        this.data = hookParent(originalData);
        this.anchor = anchorString;
        this.parentContext = ownerContext;
        this.InitializeExpressions();
    }

    InitializeExpressions() {
        let rootContext = this.parentContext;
        if(rootContext) { // This is just a child context
            while(!isNullOrUndefined(rootContext.parentContext))
            {
                rootContext = rootContext.parentContext;
            }
            for(const exprName in rootContext.savedExprs ) {
                const exprContent = rootContext.savedExprs[exprName];
                if (exprContent.path === this.anchor) {
                    this.AddExpression( exprName, exprContent);
                }
            }
        }
    }

    UpdateField(path, value) {
        if( this.anchor && path.indexOf(this.anchor) >= 0) {
            path = path.substring(this.anchor.length + 1);
        }
        if(path.endsWith('[]')) {
            path = path.substring(0, path.length - 2);
        }
        set(this.data, path, value);
    }

    GetValue(path) {
        if( this.anchor && path.indexOf(this.anchor) >= 0) {
            path = path.substring(this.anchor.length + 1);
        }
        if(path.endsWith('[]')) {
            path = path.substring(0, path.length - 2);
        }
        return get (this.data, path);
    }

    GetExprValue(exprName) {
        if(this.knwonExprs[exprName]) {
            return get(this.data, exprName);
        }
        else if (this.parentContext ) {
            return this.parentContext.GetExprValue(exprName);
        }
        else {
            return null;
        }
    }

    knwonExprs = {};
    AddExpression(exprName, exprContent) {
        if(isNullOrUndefined(this.knwonExprs[exprName])) {
            let temp = {};

            let content = exprContent.content;
            if(this.anchor) {
                content = content.replace( this.anchor + '.', '');
            }

            Object.defineProperty(temp, exprName, {
                enumerable: true,
                get: function() {
                    // eslint-disable-next-line
                    const func = new Function('data', 'return '+ content+';');
                    return func(this);
                }
            });
            let tempDeco = {};
            tempDeco[exprName] = computed;
            extendObservable(this.data, temp, tempDeco );
            this.knwonExprs[exprName] = true;
        }
        return exprName;
    }

    savedExprs = {};
    SaveExpression(exprName, exprContent) {
        this.savedExprs[exprName] = exprContent;
    }



}

decorate( FileContext, {
    theFile: observable,
    UpdateField: action
});

export default FileContext;