import { useEffect } from 'react';
import { useTheme } from '../../../app/context/hooks/useTheme';
import { useAppDispatch } from '../../../app/store/hooks';
import { clearNew, type FormSubmission } from '../store/formsSlice';

export default function SubmissionCard({
  submission,
}: {
  submission: FormSubmission;
}) {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!submission.isNew) return;

    const timer = setTimeout(() => {
      dispatch(clearNew(submission.id));
    }, 3000);

    return () => clearTimeout(timer);
  }, [submission.isNew, submission.id, dispatch]);

  const formattedDate = new Date(submission.createdAt).toLocaleString();

  return (
    <div
      className={`
      border rounded-xl p-4 flex flex-col gap-2 transition-all duration-500
      ${
        submission.isNew
          ? isDark
            ? 'border-indigo-500 bg-indigo-500/10'
            : 'border-orange-400 bg-orange-400/10'
          : 'border-gray-500'
      }
    `}
    >
      <div className="flex justify-between items-center">
        <span className="capitalize">{submission.formType}</span>
        <span>{formattedDate}</span>
      </div>
      <div>
        {Object.entries(submission.values).map(([key, value]) => (
          <p key={key} className="text-sm text-center">
            <span className="font-medium capitalize">{key}:</span> {value}
          </p>
        ))}
      </div>
    </div>
  );
}
