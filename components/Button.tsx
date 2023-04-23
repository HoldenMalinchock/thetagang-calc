import { JSX } from "preact";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={props.disabled}
      class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
    />
  );
}
