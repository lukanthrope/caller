import React from 'react'
import { Form, Input, Button, Layout } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { IAuthStore } from '../../store/auth'
import { inject } from 'mobx-react'

interface IProps {
    authStore?: IAuthStore
}

@inject('authStore')
export class Auth extends React.Component<IProps> {
    private formRef

    constructor(props: IProps) {
        super(props)
        this.formRef = React.createRef<FormInstance>()
    }

    componentDidMount() {
        console.log(this.props.authStore)
    }

    private onFinish = (values: any) => {
        console.log(values)
    }

    public render(): JSX.Element {
        return (
            <Layout>
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                    <Form.Item name="email" label="email" rules={[{ required: true, type: 'email' }]}>
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item name="password" label="password" rules={[{ required: true }]}>
                        <Input type="password" />
                    </Form.Item>
                </Form>
            </Layout>
        )
    }
}