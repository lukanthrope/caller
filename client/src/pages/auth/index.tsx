import React from "react";
import { Form, Input, Button, Layout, Typography } from "antd";
import { FormInstance } from "antd/lib/form";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { IAuthStore } from "../../store/auth";
import { withAuth } from "../../HOCs/auth";
import Grid from "antd/lib/card/Grid";

interface IProps {
  authStore?: IAuthStore;
}

@(withAuth({ needAuth: false }) as any)
@observer
export class Auth extends React.Component<IProps> {
  private formRef;

  @observable
  private isLogin = true;

  constructor(props: IProps) {
    super(props);
    this.formRef = React.createRef<FormInstance>();
  }

  private onFinish = (values: any) => {
    const { isLogin } = this;
    if (isLogin) {
      this.props.authStore?.signIn({
        email: values.email,
        password: values.password,
      });
      return;
    }
    this.props.authStore?.signUp({ ...values });
  };

  private toggleLogin = () => {
    this.isLogin = !this.isLogin;
  };

  public render(): JSX.Element {
    const { isLogin } = this;
    const { authStore } = this.props;
    return (
      <Layout>
        <Form
          ref={this.formRef}
          name="control-ref"
          onFinish={(v) => this.onFinish(v)}
        >
          {!isLogin && (
            <>
              <Form.Item name="_id" label="id" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="about"
                label="about"
              >
                <Input />
              </Form.Item>
            </>
          )}
          <Form.Item
            name="email"
            label="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

        <Button type="link" onClick={() => this.toggleLogin()}>
          {isLogin
            ? "Have no account? Sign up"
            : "Already have an account? Sign in"}
        </Button>

        <Typography.Text type="danger">{authStore?.error}</Typography.Text>
      </Layout>
    );
  }
}
