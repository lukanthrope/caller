import React, { LegacyRef } from "react";

interface IProps {
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

interface IRefProps {
  innerRef: any;
}

class Wrapped extends React.Component<IProps & IRefProps> {
  constructor(props: IProps & IRefProps) {
    super(props);
  }

  render(): JSX.Element {
    const { handleChange } = this.props;
    return (
      <input
        onChange={handleChange}
        type="file"
        style={{ display: "none" }}
        ref={this.props.innerRef}
      />
    );
  }
}

export const InvisibleFileInput = React.forwardRef(
  (props: IProps, innerRef: any) => <Wrapped {...props} innerRef={innerRef} />
);
