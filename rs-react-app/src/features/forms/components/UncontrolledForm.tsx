import { useRef, useState } from 'react';
import { ValidationError } from 'yup';
import { useAppDispatch } from '../../../app/store/hooks';
import { formSchema } from '../schema/formSchema';
import { addSubmission } from '../store/formsSlice';
import { useTheme } from '../../../app/context/hooks/useTheme';

interface UncontrolledFormProps {
  onClose: () => void;
}

export default function UncontrolledForm({ onClose }: UncontrolledFormProps) {
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const hoverClass = isDark
    ? 'hover:bg-violet-400/20 hover:border-violet-400 active:bg-violet-400/20 active:border-violet-400'
    : 'hover:bg-orange-400/70 hover:border-orange-400 active:bg-orange-400/70 active:border-orange-400';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const values = {
      name: nameRef.current?.value ?? '',
      age: Number(ageRef.current?.value),
      email: emailRef.current?.value ?? '',
      gender: genderRef.current?.value ?? '',
      terms: termsRef.current?.checked ?? false,
    };
    try {
      await formSchema.validate(values, { abortEarly: false });
      setErrors({});
      dispatch(
        addSubmission({
          id: crypto.randomUUID(),
          formType: 'uncontrolled',
          values: {
            name: values.name,
            age: String(values.age),
            email: values.email,
            gender: values.gender,
          },
          createdAt: Date.now(),
        })
      );
      onClose();
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors: Record<string, string> = {};
        err.inner.forEach((e) => {
          errors[e.path ?? ''] = e.message;
        });
        setErrors(errors);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="uc-name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="uc-name"
          ref={nameRef}
          className="p-2 rounded-md border border-border bg-background"
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="uc-age" className="text-sm font-medium">
          Age
        </label>
        <input
          id="uc-age"
          type="number"
          ref={ageRef}
          className="p-2 rounded-md border border-border bg-background"
        />
        {errors.age && <p className="text-red-500 text-xs">{errors.age}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="uc-email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="uc-email"
          ref={emailRef}
          className="p-2 rounded-md border border-border bg-background"
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="uc-gender" className="text-sm font-medium">
          Gender
        </label>
        <select
          id="uc-gender"
          ref={genderRef}
          className="p-2 rounded-md border border-border bg-background"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-xs">{errors.gender}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input id="uc-terms" type="checkbox" ref={termsRef} />
        <label htmlFor="uc-terms" className="text-sm">
          I accept Terms and Conditions
        </label>
        {errors.terms && <p className="text-red-500 text-xs">{errors.terms}</p>}
      </div>
      <button
        type="submit"
        className={`p-2 rounded-md border border-border hover:bg-orange-400/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors ${hoverClass}`}
      >
        Submit
      </button>
    </form>
  );
}
