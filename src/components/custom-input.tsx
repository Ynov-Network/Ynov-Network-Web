import React, { useId } from "react"
import { type LucideIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import type { ControllerRenderProps, FieldValues } from "react-hook-form"

interface CustomInputProps extends ControllerRenderProps<FieldValues> {
  placeholder?: string
  type: string
  icon: LucideIcon
}

export const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(({ ...props}, ref) => {
  const id = useId()

  return (
    <div className="*:not-first:mt-2">
      <div className="relative">
        <Input id={id} className="peer ps-9" placeholder={props.placeholder} {...props} ref={ref}/>
        {props.icon &&
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <props.icon size={16} aria-hidden="true" />
          </div>
        }
      </div>
    </div>
  )
})
