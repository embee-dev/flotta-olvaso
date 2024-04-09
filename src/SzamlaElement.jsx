export default function SzamlaElement({ id, title, onFileSelect }) {
  const inputId = `file-${id}`;

  function handleFileSelect(e) {
    if (!e.target.files.length) {
      alert(`No file selected, please try again!`);
      return;
    }
    const uploadedFile = URL.createObjectURL(e.target?.files[0]);
    const originalFileName = e.target?.files[0]?.name;
    onFileSelect(uploadedFile, originalFileName, id);
  }

  return (
    <article className="flottaSzamlaElement">
      <header className="flottaSzamlaElement-header">Flotta Számla: {title}</header>
      <section className="flottaSzamlaElement-content">
        <label htmlFor={inputId}>PDF fájl:</label>
        <input
          id={inputId}
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
        />
      </section>
    </article>
  );
}
