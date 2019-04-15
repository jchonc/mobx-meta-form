import React, { Component } from 'react';

import { Form, Section, Cluster, Field, List } from '../components';

class FormLoader extends Component {

    ParseChildren(contentDef) {
        let results = contentDef.map((itemDef,idx) => {
            const t = itemDef.type;
            let result = null;
            switch(t) {
                case "Section":
                    result = (<Section title={itemDef.title} visible={itemDef.visible}>
                        {this.ParseChildren(itemDef.contents)}
                    </Section>);
                    break;
                case "Cluster":
                    result = (<Cluster title={itemDef.title} visible={itemDef.visible}>
                        {this.ParseChildren(itemDef.contents)}  p
                    </Cluster>);
                    break;
                case "List":
                    result = (<List title={itemDef.title} visible={itemDef.visible} name={itemDef.name}>
                        {this.ParseChildren(itemDef.contents)}
                    </List>);
                    break;
                case "Field":
                    result = (<Field caption={itemDef.caption} name={itemDef.name} visible={itemDef.visible} />);
                    break;
                default: 
                    break;
            }
            return result;
        });
        return results;
    }

    render() {
        const def = this.props.def;
        return (<Form title={def.title} readonly={def.readonly} expressions={def.expressions} data={this.props.data}>
            {this.ParseChildren(def.contents)}
        </Form>);
    }
}

export default FormLoader;