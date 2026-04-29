export default function HeaderSection({ title, desc, action, className }) {
  return (
    <div
      className={`flex items-center px-8 mt-6 gap-2 ${
        action && "justify-between"
      }`}
    >
      <div className={`flex flex-col gap-2 ${className}`}>
        <h1 className="text-4xl font-semibold">{title}</h1>
        <p>{desc}</p>
      </div>
      {action && action}
    </div>
  );
}
