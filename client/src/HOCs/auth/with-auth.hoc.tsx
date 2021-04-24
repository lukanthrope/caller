import { inject, observer } from 'mobx-react'
import React from 'react'

export const withAuth = (
    WrappedComponent: React.ComponentType
  ): React.ComponentClass => {
    @inject('authStore')
    @observer
    class Wrapper<T> extends React.Component {
        constructor(props: T) {
            super(props)
        }

        public componentDidUpdate() {

        }

        public render(): JSX.Element {
            return <WrappedComponent {...this.props} />
        }
    }
  
    return Wrapper
  }