type ElementProps = {
  [key: string]: any;
};

export const contextComponents = {
  h1: (props: ElementProps) => <p style={{ color: "blue" }} {...props} />,
};
