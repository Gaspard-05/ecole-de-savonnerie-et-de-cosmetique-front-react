import Button from "../ButtonComponent";
import "./PageHeader.css";

function PageHeader({ title, subtitle, actionLabel, actionIcon: ActionIcon, to, onAction }) {
  return (
    <div className="admin-page-header">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      {actionLabel && (
        <Button variant="primary" to={to} onClick={onAction}>
          {ActionIcon && <ActionIcon size={18} />}
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export default PageHeader;
