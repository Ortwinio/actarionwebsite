import Link from 'next/link';
import { forwardRef } from 'react';

/**
 * Button variants matching the Actarion brand
 * - primary: Blue filled button (main CTAs)
 * - secondary: Outlined button with blue border
 * - ghost: Transparent with blue text
 */
type ButtonVariant = 'primary' | 'secondary' | 'ghost';

/**
 * Button sizes
 * - default: Standard size
 * - lg: Large size for prominent CTAs
 * - sm: Compact size
 */
type ButtonSize = 'default' | 'lg' | 'sm';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButtonProps extends ButtonBaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  href?: never;
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  href: string;
  target?: string;
  rel?: string;
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const baseClasses = 
  'inline-flex items-center justify-center gap-2 font-semibold leading-tight transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-actarion-blue';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 
    'bg-actarion-blue text-white shadow-[0_15px_30px_rgba(26,128,194,0.35)] hover:bg-actarion-blue-strong hover:-translate-y-0.5',
  secondary: 
    'bg-transparent text-actarion-blue border border-actarion-blue hover:bg-actarion-blue hover:text-white',
  ghost: 
    'bg-transparent text-actarion-blue hover:bg-actarion-blue/10',
};

const sizeClasses: Record<ButtonSize, string> = {
  default: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
  sm: 'px-4 py-2 text-xs',
};

function getButtonClasses({
  variant = 'primary',
  size = 'default',
  pill = false,
  className = '',
}: Pick<ButtonBaseProps, 'variant' | 'size' | 'pill' | 'className'>) {
  const radiusClass = pill ? 'rounded-full' : 'rounded-xl';
  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${radiusClass} ${className}`.trim();
}

/**
 * Reusable Button component for the Actarion website.
 * 
 * When `href` is provided, renders as a Next.js Link.
 * Otherwise, renders as a native button element.
 * 
 * @example
 * // Primary button (default)
 * <Button href="/contact">Contact Us</Button>
 * 
 * @example
 * // Secondary pill button
 * <Button variant="secondary" pill>Learn More</Button>
 * 
 * @example
 * // Large primary button
 * <Button size="lg" onClick={handleClick}>Get Started</Button>
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const { variant = 'primary', size = 'default', pill = false, className, children, ...rest } = props;
    const classes = getButtonClasses({ variant, size, pill, className });

    if ('href' in props && props.href) {
      const { href, target, rel, ...linkRest } = rest as Omit<ButtonAsLinkProps, 'variant' | 'size' | 'pill' | 'className' | 'children'>;
      return (
        <Link
          href={href}
          className={classes}
          target={target}
          rel={rel}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...linkRest}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);

export default Button;

