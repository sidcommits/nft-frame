import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'ghost';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  children,
  onClick,
  disabled,
  type = 'button',
  fullWidth,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[styles.btn, styles[variant], fullWidth ? styles.full : ''].filter(Boolean).join(' ')}
    >
      {children}
    </button>
  );
}
