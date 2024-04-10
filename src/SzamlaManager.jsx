export default function SzamlaManager({ szamlak, onCreate, onRemove }) {
  function onPlus() {
    onCreate();
  }

  function onMinus() {
    onRemove();
  }

  return (
    <section className="flottaSzamlaManager">
      {szamlak.length < 5 ? <button onClick={onPlus}> + </button> : ''}
      {szamlak.length >= 2 ? <button onClick={onMinus}> - </button> : ''}
    </section>
  );
}
