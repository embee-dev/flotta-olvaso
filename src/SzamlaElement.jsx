export default function SzamlaElement({ id, title, onFileSelect }) {
  const inputId = `file-${id}`;

  function handleFileSelect(e) {
    const uploadedFile = URL.createObjectURL(e.target.files[0]);
    onFileSelect(uploadedFile, id);
  }

  return (
    <section className="flottaSzamlaBlock">
      <header className="flottaSzamlaHeader">Flotta Számla: {title}</header>
      <section className="flottaSzamlaContent">
        <label htmlFor={inputId}>PDF fájl:</label>
        <input
          id={inputId}
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
        />
      </section>
    </section>
  );
}
