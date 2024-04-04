export default function SzamlaManager({ szamlak, onCreate, onRemove }) {
  function onPlus() {
    onCreate();
  }

  function onMinus() {
    onRemove();
  }

  return (
    <section className="flottaSzamlaSzamlalo">
      <button onClick={onPlus}> + </button>
      <button onClick={onMinus}> - </button>
    </section>
  );
}
