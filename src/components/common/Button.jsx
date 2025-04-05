import React from 'react';
import styles from './Button.module.css';

/**
 * Button component for common UI interactions
 * @param {Object} props
 * @param {string} props.variant - 'primary' | 'secondary' | 'outline'
 * @param {string} props.size - 'sm' | 'md' | 'lg'
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.className] - Additional CSS classes
 * @param {function} [props.onClick] - Click handler
 * @param {string} [props.type] - Button type (button, submit, reset)
 * @param {boolean} [props.disabled] - Disabled state
 * @param {boolean} [props.withIcon] - Whether button has an icon
 * @param {React.ReactNode} [props.icon] - Icon element
 * @param {string} [props.iconPosition] - 'left' | 'right'
 * @param {boolean} [props.arrow] - Whether to show an arrow icon
 * @param {boolean} [props.fullWidth] - Whether the button should take full width
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  withIcon = false,
  icon,
  iconPosition = 'right',
  arrow = false,
  fullWidth = false,
  ...props
}) => {
  // Combine class names
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    withIcon ? styles.withIcon : '',
    iconPosition === 'left' ? styles.iconLeft : '',
    arrow ? styles.withArrow : '',
    fullWidth ? styles.fullWidth : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {withIcon && iconPosition === 'left' && <span className={styles.icon}>{icon}</span>}
      <span className={styles.content}>{children}</span>
      {withIcon && iconPosition === 'right' && <span className={styles.icon}>{icon}</span>}
      {arrow && <span className={styles.arrow}>→</span>}
    </button>
  );
};

export default Button;