import { Check, X } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
}
export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const checks = [
    { label: '1 number', pass: /\d/.test(password) },
    { label: '1 uppercase', pass: /[A-Z]/.test(password) },
    { label: '1 lowercase', pass: /[a-z]/.test(password) },
    { label: '1 special char', pass: /[^a-zA-Z0-9]/.test(password) },
  ];
  const strength = checks.filter((check) => check.pass).length;
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-500',
  ];
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full ${index < strength ? color : 'bg-gray-300'}`}
          />
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        {checks.map((check) => (
          <span
            key={check.label}
            className={`text-xs ${check.pass ? 'text-green-500' : 'text-gray-400'}`}
          >
            {check.pass ? <Check /> : <X />} {check.label}
          </span>
        ))}
      </div>
    </div>
  );
}
