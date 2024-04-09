export default function SzamlaCopyButton({ tooltip, onClick }) {
    return (
        <button title={tooltip + ` vágólapra másolása`} onClick={onClick}>
            M
        </button>
    );
  }
  