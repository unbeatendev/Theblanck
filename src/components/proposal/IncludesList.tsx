export function IncludesList({ items }: { items: string[] }) {
  return (
    <ul className="includes-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
