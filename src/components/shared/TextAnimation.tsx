import { cn } from "@/lib/utils";

const TextAnimation = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-4xl font-medium text-transparent animate-gradient gradient-text",
        className
      )}
    >
      {text}
    </p>
  );
};

export default TextAnimation;
