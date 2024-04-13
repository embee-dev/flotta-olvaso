export default function SzamlaCopyButton({ className = '', htmlFor = '', text, icon, tooltip, onClick }) {
    return (
        <label className={`flottaButton ${className ? ' ' + className : ''}`} htmlFor={htmlFor} title={tooltip} onClick={onClick}>
            {icon && <img className="flottaIcon" src={icon} alt="tooltip" />}
            {text}
        </label>
    );
  }
  