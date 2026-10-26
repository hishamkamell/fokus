import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { CTAButton } from './CTAButton.jsx';
import { isValidEgyptianPhone } from '../utils/validation.js';
import { submitLead } from '../utils/submitLead.js';

const shake = {
  initial: { x: 0 },
  animate: { x: [0, -6, 6, -4, 4, 0], transition: { duration: 0.4 } },
};

function Field({ id, label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-charcoal">
        {label}
      </label>
      {children}
      {error && (
        <motion.p initial="initial" animate="animate" variants={shake} className="text-xs text-terra-deep">
          {error.message}
        </motion.p>
      )}
    </div>
  );
}

/**
 * Preorder lead form. Submits { name, phone } to the Google Apps Script
 * endpoint defined in utils/submitLead.js. On success it calls
 * `onSuccess` so the parent can trigger the confirmation modal.
 */
export function LeadForm({ onSuccess }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });
  const [submitError, setSubmitError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async ({ name, phone }) => {
    setSubmitting(true);
    setSubmitError(false);
    try {
      await submitLead({ name: name.trim(), phone: phone.trim() });
      reset();
      onSuccess?.();
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <Field id="pfName" label="الاسم" error={errors.name}>
        <input
          id="pfName"
          type="text"
          placeholder="اكتب اسمك"
          autoComplete="name"
          aria-invalid={errors.name ? 'true' : 'false'}
          className={`rounded-sm border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-terra ${
            errors.name ? 'border-terra' : 'border-charcoal/15'
          }`}
          {...register('name', { required: 'من فضلك اكتب اسمك' })}
        />
      </Field>

      <Field id="pfPhone" label="رقم الموبايل" error={errors.phone}>
        <input
          id="pfPhone"
          type="tel"
          dir="ltr"
          placeholder="01xxxxxxxxx"
          autoComplete="tel"
          aria-invalid={errors.phone ? 'true' : 'false'}
          className={`rounded-sm border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-terra ${
            errors.phone ? 'border-terra' : 'border-charcoal/15'
          }`}
          {...register('phone', {
            required: 'رقم الموبايل غير صحيح',
            validate: (v) => isValidEgyptianPhone(v) || 'رقم الموبايل غير صحيح',
          })}
        />
      </Field>

      <CTAButton type="submit" variant="reserve" loading={submitting}>
        احجز مكاني
      </CTAButton>

      {submitError && (
        <motion.p
          initial="initial"
          animate="animate"
          variants={shake}
          className="text-center text-xs text-terra-deep"
        >
          حصل خطأ أثناء الحجز، حاول تاني.
        </motion.p>
      )}

      <p className="text-center text-xs text-ink-light">لن نرسل رسائل مزعجة.</p>
    </form>
  );
}
