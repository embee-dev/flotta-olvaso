export default function SzamlaManager({ szamlak, onCreate, onRemove }) {
  function onPlus() {
    onCreate();
  }

  function onMinus() {
    onRemove();
  }

  return (
    <section className="flottaSzamlaManager">
      <button onClick={onPlus}> + </button>
      <button onClick={onMinus}> - </button>
    </section>
  );
}
