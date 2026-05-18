import styles from './Input.module.css';

interface InputProps {
  label: string;
  value: string | number;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: 'text' | 'number';
}

export function Input({ label, value, onChange, placeholder, type = 'text' }: InputProps) {
  return (
    <div className={styles.wrap}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
