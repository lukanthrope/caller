import React from 'react'
import { Layout, Typography } from 'antd'

export class NotFound extends React.Component {
    public render(): JSX.Element {
        return (
            <Layout>
                <Typography>
                    <Typography.Title>404 - not found</Typography.Title>
                </Typography>
            </Layout>
        )
    }
}