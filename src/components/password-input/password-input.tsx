import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import React, { useId, useState } from "react";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";

export interface PasswordInputProps extends ControllerRenderProps<FieldValues> {
    className?: string;
    placeholder?: string;
    icon?: LucideIcon;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, placeholder, ...props }, ref) => {
        const [isVisible, setIsVisible] = useState<boolean>(false);
        const id = useId()

        const toggleVisibility = () => setIsVisible((prevState) => !prevState);

        return (
            <div>
                <div className="relative">
                    <Input
                        id={id}
                        className={cn("pe-9 peer ps-9", className)}
                        placeholder={placeholder ? placeholder : "Password"}
                        type={isVisible ? "text" : "password"}
                        aria-describedby="password"
                        {...props}
                        ref={ref}
                    />
                    {props.icon &&
                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                            <props.icon size={16} aria-hidden="true" />
                        </div>
                    }
                    <button
                        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label={
                            isVisible ? "Hide password" : "Show password"
                        }
                        aria-pressed={isVisible}
                        aria-controls="password"
                    >
                        {isVisible ? (
                            <EyeOff
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                        ) : (
                            <Eye size={16} strokeWidth={2} aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>
        );
    }
);
