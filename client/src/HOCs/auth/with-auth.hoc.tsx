import { Space, Spin } from "antd";
import { when } from "mobx";
import { inject, observer } from "mobx-react";
import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { ERoutes } from "../../enums";
import { IAuthStore } from "../../store/auth";

interface IWithAuthProps extends RouteComponentProps {
  authStore?: IAuthStore;
}

const defaultParams = { needAuth: true };

export const withAuth = (params: { needAuth: boolean } = defaultParams) => <
  P extends object
>(
  WrappedComponent: React.ComponentType
) => {
  @(withRouter as any)
  @inject("authStore")
  @observer
  class Wrapper extends React.Component<P & IWithAuthProps> {
    constructor(props: P & IWithAuthProps) {
      super(props);
    }

    public componentDidMount() {
      this.checkAuth();
    }

    public componentDidUpdate(_: unknown, prevProps: P & IWithAuthProps) {
      this.checkAuth();
      console.log(this.props.authStore);
    }

    private checkAuth() {
      const { authStore, history } = this.props;
      if (!authStore?.isLoading && !authStore?.user && params.needAuth) {
        history.push(ERoutes.Login);
      }

      if (!authStore?.isLoading && authStore?.user && !params.needAuth) {
        history.push(ERoutes.Main);
      }
    }

    private renderSpinner() {
      if (this.props.authStore?.isLoading)
        return (
          <Space
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
            size="large"
          >
            <Spin size="large" />
          </Space>
        );
    }

    public render(): JSX.Element {
      return (
        <>
          {this.renderSpinner()}
          <WrappedComponent {...this.props} />
        </>
      );
    }
  }

  return Wrapper;
};
