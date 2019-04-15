import React, { Component } from 'react';
import FormLoader from '../components/FormLoader';
import Data from '../utils/data';

let data = Data;

let formDef = {
    title: "",
    readonly: false,
    expressions: {
        "expr1": {
            "path": "",
            "content": "data.state != 'closed'"
        },
        "expr2": {
            "path": "equipments[]",
            "content": "data.equipments[].equipmentType != 'implant'"
        }
    },
    contents: [{
      type: 'Section',
      title: "Demographics",
      visible: true,
      contents: [{
        type: 'Cluster',
        title: "Names",
        contents: [{
            type: 'Field',
            caption: 'State',
            name: 'state'
        },{
            type: 'Field',
            caption: "First Name",
            name:"patient.firstName"
        },{
            type: 'Field',
            caption: 'Last Name',
            name: "patient.lastName",
            visible: "expr1" 
        }]
      }]
    },{
        type: 'Section',
        title: "Equipments",
        visible: true,
        contents: [{
            type: 'Cluster',
            title: "grid",
            contents: [{
                type: 'List',
                name: "equipments[]",
                contents: [{
                    type: 'Section',
                    title: "Eq1",
                    contents: [{
                        type: 'Cluster',
                        title: "Eq2",
                        contents: [{
                            type: 'Field',
                            caption: "Type",
                            name: "equipments[].equipmentType"
                        },{
                            type: 'Field',
                            caption: "Name",
                            name: "equipments[].equipmentName",
                            visible: "expr1"
                        },{
                            type: 'Field',
                            caption: "Serial#",
                            name: "equipments[].serialNumber",
                            visible: "expr2"
                        }]
                    }]
                }]
            }]
        }]
    }]
};

class DataForm extends Component {
    render() {
        return (
            <FormLoader data={data} def={formDef} />
        );
    }
}

export default DataForm;