export function Card(props: { children: any }) {
  return (
    <div class="p-6 mt-3 max-w-sm bg-white rounded-lg border-gray-200 shadow-xl dark:border-gray-700 bg-[#23252F]">
      {props.children}
    </div>
  );
}
