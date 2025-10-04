export function ActionBoast(props: { onClick: () => void }) {
  return (
    <div className="row">
      <button onClick={props.onClick}>Boast</button>
    </div>
  );
}
