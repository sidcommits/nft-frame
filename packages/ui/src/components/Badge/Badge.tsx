import styles from './Badge.module.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'live' | 'vacant' | 'default';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={[styles.badge, styles[variant]].join(' ')}>
      {children}
    </span>
  );
}
