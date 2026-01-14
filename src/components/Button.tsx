import type { JSX } from "solid-js";

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
};

export default function Button(props: ButtonProps) {
  const variant = () => props.variant ?? "primary";

  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/15 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-white text-black hover:bg-zinc-100 shadow-lg shadow-white/5",
    secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700/50",
    ghost: "bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-800/50",
    outline: "border border-zinc-700 text-zinc-300 hover:border-zinc-500 bg-transparent",
    danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20",
  };

  const { variant: _variant, class: className, ...rest } = props;

  return (
    <button
      {...rest}
      class={`${base} ${variants[variant()]} ${className ?? ""}`.trim()}
    />
  );
}
