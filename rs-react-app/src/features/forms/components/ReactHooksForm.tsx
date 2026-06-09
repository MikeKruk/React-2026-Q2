import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import { useTheme } from '../../../app/context/hooks/useTheme';
import { useAppDispatch } from '../../../app/store/hooks';
import { toBase64 } from '../../../shared/utils/toBase64';
import { formSchema, type FormValues } from '../schema/formSchema';
import { addSubmission } from '../store/formsSlice';
import CountryAutocomplete from './CountryAutocomplete';
import PasswordStrength from './PasswordStrength';

interface ReactHooksFormProps {
  onClose: () => void;
}
export default function ReactHooksForm({ onClose }: ReactHooksFormProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const hoverClass = isDark
    ? 'hover:bg-violet-400/20 hover:border-violet-400 active:bg-violet-400/20 active:border-violet-400'
    : 'hover:bg-orange-400/70 hover:border-orange-400 active:bg-orange-400/70 active:border-orange-400';
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });

  const password = useWatch({ control, name: 'password' });
  const country = useWatch({ control, name: 'country' }) ?? '';

  const onSubmit = async (data: FormValues) => {
    const base64 = await toBase64(data.image);
    dispatch(
      addSubmission({
        id: crypto.randomUUID(),
        formType: 'react-hook-form',
        values: {
          name: data.name,
          age: String(data.age),
          email: data.email,
          gender: data.gender,
          country: data.country,
          image: base64,
        },
        createdAt: Date.now(),
      })
    );
    onClose();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
      <div className="flex flex-col gap-1">
        <label htmlFor="rhf-name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="rhf-name"
          {...register('name')}
          className="p-2 rounded-md border border-border bg-background"
        />
        {errors.name && (
          <p className="text-red-500 text-xs">{errors.name.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="rhf-age" className="text-sm font-medium">
          Age
        </label>
        <input
          id="rhf-age"
          type="number"
          {...register('age')}
          className="p-2 rounded-md border border-border bg-background"
        />
        {errors.age && (
          <p className="text-red-500 text-xs">{errors.age.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="rhf-email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="rhf-email"
          {...register('email')}
          className="p-2 rounded-md border border-border bg-background"
        />
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="rhf-password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="rhf-password"
          type="password"
          {...register('password')}
          className="p-2 rounded-md border border-border bg-background"
        />
        {password && <PasswordStrength password={password} />}
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="rhf-confirm" className="text-sm font-medium">
          Confirm Password
        </label>
        <input
          id="rhf-confirm"
          type="password"
          {...register('confirmPassword')}
          className="p-2 rounded-md border border-border bg-background"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="rhf-gender" className="text-sm font-medium">
          Gender
        </label>
        <select
          id="rhf-gender"
          {...register('gender')}
          className="p-2 rounded-md border border-border bg-background"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-xs">{errors.gender.message}</p>
        )}
      </div>
      <CountryAutocomplete
        value={country}
        onChange={(val) => setValue('country', val, { shouldValidate: true })}
        error={errors.country?.message}
      />
      <div className="flex flex-col gap-1">
        <label htmlFor="rhf-image" className="text-sm font-medium">
          Profile Image
        </label>
        <input
          id="rhf-image"
          type="file"
          accept="image/png,image/jpeg"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) setValue('image', file, { shouldValidate: true });
          }}
          className="p-2 rounded-md border border-border bg-background"
        />
        {errors.image && (
          <p className="text-red-500 text-xs">{errors.image.message}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input id="rhf-terms" type="checkbox" {...register('terms')} />
        <label htmlFor="rhf-terms" className="text-sm">
          I accept Terms and Conditions
        </label>
        {errors.terms && (
          <p className="text-red-500 text-xs">{errors.terms.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={!isValid}
        className={`p-2 rounded-md border border-border hover:bg-orange-400/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors ${hoverClass}`}
      >
        {' '}
        Submit{' '}
      </button>
    </form>
  );
}
