import { Link } from "react-router-dom";
import "./Button.css";

/**
 * Bouton réutilisable.
 * - variant: "primary" | "secondary" | "outline" | "ghost"
 * - Si `to` est fourni, rend un <Link> React Router ; sinon un <button>/<a> classique.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  type = "button",
  onClick,
  className = "",
  ...rest
}) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

export default Button;
