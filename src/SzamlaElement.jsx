export default function SzamlaElement({ id, title, onFileSelect }) {
  const inputId = `file-${id}`;

  function handleFileSelect(e) {
    const uploadedFile = URL.createObjectURL(e.target.files[0]);
    onFileSelect(uploadedFile, id);
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
