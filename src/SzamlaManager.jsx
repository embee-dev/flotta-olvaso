export default function SzamlaManager({ szamlak, onCreate }) {
  function onPlus() {
    onCreate();
  }

  return (
    <section className="flottaSzamlaManager">
      {szamlak.length < 5 ? <button onClick={onPlus}> + </button> : ''}
    </section>
  );
}
