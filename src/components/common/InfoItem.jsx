export default function InfoItem({ label, value }) {
  return (
    <div className="flex flex-wrap ">
      <span className="text-sm text-gray-900 dark:text-gray-300">{label}</span>
      <span className="text-gray-800 dark:text-gray-100  w-full break-words">{value}</span>
    </div>
  );
}
