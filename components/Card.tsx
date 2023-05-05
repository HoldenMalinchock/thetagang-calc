// I did find a pretty good way to do this with raw css, but I'm not sure if it's worth it
// I kinda like this for cards
export function Card(props: { children: any }) {
  return (
    <div class="p-6 mt-3 bg-white rounded-lg border-gray-200 shadow-xl dark:border-gray-700 bg-[#23252F]">
      {props.children}
    </div>
  );
}
