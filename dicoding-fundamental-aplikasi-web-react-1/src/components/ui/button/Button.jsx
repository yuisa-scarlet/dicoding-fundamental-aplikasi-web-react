import styles from "./Button.module.css";

import PropTypes from "prop-types";

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  ...props
}) {
  return (
    <button
      onClick={onClick}
      className={[styles.button, styles[variant], styles[size]].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
};
