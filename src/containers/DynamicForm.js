import React, { Component } from 'react';
import { Form, Section, Cluster, Field, List } from '../components';
import Data from '../utils/data';

let data = Data;

class DynamicForm extends Component {
    render() {
        return (
            <Form title="" readonly={false} data={data}
                expressions={{
                    "expr1": {
                        "path": "",
                        "content": "data.state != 'closed'"
                    },
                    "expr2": {
                        "path": "equipments[]",
                        "content": "data.equipments[].equipmentType != 'implant'"
                    }
                }}>
                <Section title="Demographics" visible={true}>
                    <Cluster title="Names">
                        <Field caption="State" name="state" />
                        <Field caption="First Name" name="patient.firstName" />                            
                        <Field caption="Last Name" name="patient.lastName" visible="expr1" />
                    </Cluster>
                </Section>
                <Section title="Equipments" visible={true}>
                    <Cluster title="grid">
                        <List name="equipments[]">
                            <Section title="Eq1">
                                <Cluster title="Eq2">
                                    <Field caption="Type" name="equipments[].equipmentType" />
                                    <Field caption="Name" name="equipments[].equipmentName" visible="expr1" />                    
                                    <Field caption="Serial#" name="equipments[].serialNumber" visible="expr2" />
                                </Cluster>
                            </Section>
                        </List>
                    </Cluster>
                </Section>
            </Form>
        );
    }
}

export default DynamicForm;
