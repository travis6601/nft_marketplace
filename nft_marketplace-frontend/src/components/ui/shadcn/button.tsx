import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { cn } from "~/lib/utils";
import { Loader } from "~/components/ui/Loader";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-background shadow hover:opacity-80",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-primary text-primary bg-transparent shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        white:
          "bg-white text-background hover:opacity-80 focus:bg-gray-100 active:bg-gray-200",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-8 rounded-2xl px-3 text-sm",
        md: "h-12 rounded-4xl px-3 py-4 text-base",
        lg: "h-14 rounded-3xl px-8 py-8 text-xl",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const buttonLoaderVariants = cva("", {
  variants: {
    size: {
      default: "h-5 w-5",
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      icon: "h-6 w-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  disable?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      children,
      fullWidth,
      disabled,
      disable,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            className: twMerge(className, fullWidth ? "flex-1 w-full" : ""),
          }),
          isLoading && "cursor-not-allowed"
        )}
        ref={ref}
        disabled={isLoading || disabled || disable}
        {...props}
      >
        {isLoading ? (
          <Loader className={buttonLoaderVariants({ size })} />
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
